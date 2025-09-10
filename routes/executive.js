// ===================================================================
// Executive Routes - สำหรับผู้บริหารมหาวิทยาลัยและคณะ (READ ONLY)
// ===================================================================
// ไฟล์นี้จัดการ APIs สำหรับผู้บริหาร (ดูข้อมูล report เท่านั้น):
// - University Executive: ดูข้อมูลทุกคณะ (แต่แก้ไขไม่ได้)
// - Faculty Executive: ดูข้อมูลเฉพาะคณะตัวเอง (แต่แก้ไขไม่ได้)
// 
// NOTE: เฉพาะ ADMIN เท่านั้นที่เห็นข้อมูลส่วนตัวของ Executive ได้
//       Executive ไม่สามารถจัดการ user อื่นได้
// ===================================================================

import { Elysia } from 'elysia'
import { Prisma } from '../generated/prisma/index.js'
import prisma from '../lib/prisma.js'
import { authMiddleware, isExecutive, isUniversityExecutive, isFacultyExecutive } from '../middleware/index.js'

export const executiveRoutes = new Elysia({ prefix: '/protected/executive' })

  // ===== Executive Dashboard =====
  .get('/dashboard', async ({ request, set }) => {
    const user = await authMiddleware(request, set)
    if (user.success === false) return user

    if (!isExecutive(user)) {
      set.status = 403
      return {
        success: false,
        message: 'การเข้าถึงจำกัดเฉพาะผู้บริหารเท่านั้น'
      }
    }

    try {
      let stats = {}

      if (isUniversityExecutive(user)) {
        // University Executive - ดูได้ทุกคณะ
        console.log('📊 University Executive: Dashboard')

        stats = {
          total_users: await prisma.users.count(),
          total_officers: await prisma.officer.count(),
          total_rooms: await prisma.meeting_room.count(),
          total_reservations: await prisma.reservation.count(),
          departments_summary: await prisma.meeting_room.groupBy({
            by: ['department'],
            _count: { room_id: true }
          })
        }

      } else if (isFacultyExecutive(user)) {
        // Faculty Executive - ดูได้เฉพาะคณะตัวเอง
        console.log('📊 Faculty Executive: Dashboard for', user.department)

        stats = {
          my_department: user.department,
          department_rooms: await prisma.meeting_room.count({
            where: { department: user.department }
          }),
          department_reservations: await prisma.reservation.count({
            where: {
              meeting_room: {
                department: user.department
              }
            }
          }),
          recent_reservations: await prisma.reservation.findMany({
            where: {
              meeting_room: {
                department: user.department
              }
            },
            include: {
              meeting_room: {
                select: { room_name: true }
              },
              users: {
                select: { first_name: true, last_name: true }
              }
            },
            orderBy: { created_at: 'desc' },
            take: 10
          })
        }
      }

      return {
        success: true,
        message: 'ข้อมูล Dashboard ผู้บริหาร',
        executive_type: user.position,
        department: user.department,
        stats
      }

    } catch (error) {
      console.error('❌ Executive Dashboard Error:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงข้อมูล Dashboard'
      }
    }
  })

  // ===== Executive Reports =====
  .get('/reports', async ({ request, query, set }) => {
    const user = await authMiddleware(request, set)
    if (user.success === false) return user

    if (!isExecutive(user)) {
      set.status = 403
      return {
        success: false,
        message: 'การเข้าถึงจำกัดเฉพาะผู้บริหารเท่านั้น'
      }
    }

    try {
      const { department, month, year } = query
      let whereCondition = {}

      // University Executive ดูได้ทุกคณะ, Faculty Executive ดูได้เฉพาะคณะตัวเอง
      if (isFacultyExecutive(user)) {
        whereCondition.meeting_room = { department: user.department }
      } else if (department && isUniversityExecutive(user)) {
        whereCondition.meeting_room = { department }
      }

      // Filter by month/year if provided
      if (month && year) {
        const startDate = new Date(parseInt(year), parseInt(month) - 1, 1)
        const endDate = new Date(parseInt(year), parseInt(month), 0)
        whereCondition.created_at = {
          gte: startDate,
          lte: endDate
        }
      }

      const reports = {
        reservation_summary: await prisma.reservation.groupBy({
          by: ['status_r'],
          where: whereCondition,
          _count: { reservation_id: true }
        }),

        room_utilization: await prisma.reservation.groupBy({
          by: ['room_id'],
          where: whereCondition,
          _count: { reservation_id: true }
        }),

        monthly_trends: await prisma.$queryRaw`
          SELECT 
            DATE_TRUNC('month', r.created_at) as month,
            COUNT(*) as reservation_count,
            mr.department
          FROM reservation r
          JOIN meeting_room mr ON r.room_id = mr.room_id
          ${isFacultyExecutive(user) ?
            Prisma.sql`WHERE mr.department = ${user.department}` :
            (department ? Prisma.sql`WHERE mr.department = ${department}` : Prisma.sql``)
          }
          GROUP BY DATE_TRUNC('month', r.created_at), mr.department
          ORDER BY month DESC
          LIMIT 12
        `
      }

      // Add room details to utilization data
      if (reports.room_utilization.length > 0) {
        const roomIds = reports.room_utilization.map(r => r.room_id)
        const rooms = await prisma.meeting_room.findMany({
          where: { room_id: { in: roomIds } },
          select: { room_id: true, room_name: true, department: true }
        })

        reports.room_utilization = reports.room_utilization.map(util => ({
          ...util,
          meeting_room: rooms.find(room => room.room_id === util.room_id)
        }))
      }

      return {
        success: true,
        message: 'รายงานสำหรับผู้บริหาร',
        executive_type: user.position,
        department: isFacultyExecutive(user) ? user.department : 'ทุกคณะ',
        reports
      }

    } catch (error) {
      console.error('❌ Executive Reports Error:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการสร้างรายงาน'
      }
    }
  })

  // ===== Executive Room Overview =====
  .get('/rooms', async ({ request, query, set }) => {
    const user = await authMiddleware(request, set)
    if (user.success === false) return user

    if (!isExecutive(user)) {
      set.status = 403
      return {
        success: false,
        message: 'การเข้าถึงจำกัดเฉพาะผู้บริหารเท่านั้น'
      }
    }

    try {
      let whereCondition = {}

      // Faculty Executive ดูได้เฉพาะคณะตัวเอง
      if (isFacultyExecutive(user)) {
        whereCondition.department = user.department
      }

      const rooms = await prisma.meeting_room.findMany({
        where: whereCondition,
        select: {
          room_id: true,
          room_name: true,
          capacity: true,
          location_m: true,
          department: true,
          status_m: true,
          created_at: true
        },
        orderBy: { department: 'asc' }
      })

      return {
        success: true,
        message: 'รายการห้องประชุมสำหรับผู้บริหาร',
        executive_type: user.position,
        accessible_departments: isFacultyExecutive(user) ? [user.department] : 'ทุกคณะ',
        rooms
      }

    } catch (error) {
      console.error('❌ Executive Rooms Error:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงข้อมูลห้องประชุม'
      }
    }
  })

export default executiveRoutes
