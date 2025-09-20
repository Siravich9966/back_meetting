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
        // Faculty Executive - ดูได้เฉพาะคณะตัวเอง (ใช้ original department)
        // ⚠️ SECURITY FIX: ใช้ original executive department
        const executiveData = await prisma.executive.findUnique({
          where: { executive_id: user.executive_id },
          select: { department: true }
        })
        
        const originalDepartment = executiveData?.department || user.department
        
        console.log('📊 Faculty Executive: Dashboard', {
          currentUserDepartment: user.department,
          originalExecutiveDepartment: originalDepartment,
          usingDepartment: originalDepartment
        })

        stats = {
          my_department: originalDepartment,
          department_rooms: await prisma.meeting_room.count({
            where: { department: originalDepartment }
          }),
          department_reservations: await prisma.reservation.count({
            where: {
              meeting_room: {
                department: originalDepartment
              }
            }
          }),
          recent_reservations: await prisma.reservation.findMany({
            where: {
              meeting_room: {
                department: originalDepartment
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
      console.log('📊 Executive Reports - User:', user.email, 'Position:', user.position, 'Department:', user.department)
      console.log('🎯 Is University Executive:', isUniversityExecutive(user))
      console.log('🎯 Is Faculty Executive:', isFacultyExecutive(user))
      
      const { department, month, year } = query
      let whereCondition = {}

      // University Executive ดูได้ทุกคณะ, Faculty Executive ดูได้เฉพาะคณะตัวเอง
      if (isFacultyExecutive(user)) {
        // ⚠️ SECURITY FIX: ใช้ original executive department
        const executiveData = await prisma.executive.findUnique({
          where: { executive_id: user.executive_id },
          select: { department: true }
        })
        
        const originalDepartment = executiveData?.department || user.department
        whereCondition.meeting_room = { department: originalDepartment }
        
        console.log('🏫 Faculty Executive - Reports filter:', {
          currentUserDepartment: user.department,
          originalExecutiveDepartment: originalDepartment,
          filterByDepartment: originalDepartment
        })
      } else if (department && isUniversityExecutive(user)) {
        whereCondition.meeting_room = { department }
        console.log('🏛️ University Executive - Filter by department:', department)
      } else {
        console.log('🌐 University Executive - All departments')
      }

      // Filter by month/year if provided
      if (month && year) {
        const startDate = new Date(parseInt(year), parseInt(month) - 1, 1)
        const endDate = new Date(parseInt(year), parseInt(month), 0)
        whereCondition.created_at = {
          gte: startDate,
          lte: endDate
        }
        console.log('📅 Date filter:', { startDate, endDate })
      }

      console.log('🔍 Where condition:', JSON.stringify(whereCondition, null, 2))

      // ดึงข้อมูลแยกส่วน เพื่อ debug ได้ง่าย
      console.log('📊 Querying reservation_summary...')
      const reservation_summary = await prisma.reservation.groupBy({
        by: ['status_r'],
        where: whereCondition,
        _count: { reservation_id: true }
      })
      console.log('✅ reservation_summary:', reservation_summary)

      console.log('📊 Querying room_utilization...')
      const room_utilization = await prisma.reservation.groupBy({
        by: ['room_id'],
        where: whereCondition,
        _count: { reservation_id: true }
      })
      console.log('✅ room_utilization:', room_utilization)

      console.log('📊 Querying monthly_trends...')
      const monthly_trends = []

      // ดึงข้อมูล department_stats สำหรับทั้ง University และ Faculty Executive
      console.log('📊 Querying department_stats...')
      let department_stats = []
      
      if (isUniversityExecutive(user)) {
        // University Executive: ดูได้ทุกคณะ
        try {
          const departmentReservations = await prisma.$queryRaw`
            SELECT 
              mr.department,
              COUNT(r.reservation_id) as reservation_count
            FROM reservation r
            JOIN meeting_room mr ON r.room_id = mr.room_id
            ${whereCondition.created_at ? 
              Prisma.sql`WHERE r.created_at >= ${whereCondition.created_at.gte} AND r.created_at <= ${whereCondition.created_at.lte}` :
              Prisma.sql`WHERE 1=1`
            }
            GROUP BY mr.department
            ORDER BY reservation_count DESC
          `

          department_stats = departmentReservations.map(dept => ({
            department: dept.department,
            reservations: Number(dept.reservation_count),
            utilization: Math.min(Math.round((Number(dept.reservation_count) / 30) * 100), 100)
          }))
        } catch (error) {
          console.error('❌ Error querying department_stats for University Executive:', error)
          department_stats = []
        }
        
      } else if (isFacultyExecutive(user)) {
        // Faculty Executive: ดูได้เฉพาะคณะตัวเอง
        try {
          console.log('📊 Faculty Executive querying department_stats for:', user.department)
          
          const facultyReservations = await prisma.$queryRaw`
            SELECT 
              mr.department,
              COUNT(r.reservation_id) as reservation_count
            FROM reservation r
            JOIN meeting_room mr ON r.room_id = mr.room_id
            WHERE mr.department = ${user.department}
            ${whereCondition.created_at ? 
              Prisma.sql`AND r.created_at >= ${whereCondition.created_at.gte} AND r.created_at <= ${whereCondition.created_at.lte}` :
              Prisma.sql``
            }
            GROUP BY mr.department
          `

          department_stats = facultyReservations.map(dept => ({
            department: dept.department,
            reservations: Number(dept.reservation_count),
            utilization: Math.min(Math.round((Number(dept.reservation_count) / 30) * 100), 100)
          }))
          
          console.log('✅ Faculty department_stats result:', department_stats)
        } catch (error) {
          console.error('❌ Error querying department_stats for Faculty Executive:', error)
          department_stats = []
        }
      }
      console.log('✅ department_stats:', department_stats)

      const reports = {
        reservation_summary,
        room_utilization,
        monthly_trends,
        department_stats
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
