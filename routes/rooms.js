// ===================================================================
// Meeting Room APIs - ระบบจัดการห้องประชุม
// ===================================================================
// ไฟล์นี้จัดการ:
// - GET /api/rooms - ดูรายการห้องประชุมทั้งหมด (ไม่ต้อง auth)
// - GET /api/rooms/:id - ดูรายละเอียดห้องประชุม (ไม่ต้อง auth)
// 
// ⚠️ ADMIN ไม่มีสิทธิ์จัดการห้องประชุม - จัดการแค่สมาชิกเท่านั้น
// ✅ OFFICER เท่านั้นที่จัดการห้องประชุมในคณะ/ตึกตัวเองได้
// ===================================================================

import { Elysia } from 'elysia'
import prisma from '../lib/prisma.js'
import { authMiddleware, isOfficer, canManageRoom } from '../middleware/index.js'

// Public Room APIs (ไม่ต้อง authentication)
export const roomRoutes = new Elysia({ prefix: '/rooms' })
  // ดูรายการห้องประชุมทั้งหมด
  .get('/', async ({ query, set }) => {
    try {
      const { status, capacity, search, department } = query
      
      // สร้าง filter conditions
      const where = {}
      
      if (status) {
        where.status_m = status
      }
      
      if (capacity) {
        where.capacity = { gte: parseInt(capacity) }
      }

      if (department) {
        where.department = department
      }
      
      if (search) {
        where.OR = [
          { room_name: { contains: search, mode: 'insensitive' } },
          { location_m: { contains: search, mode: 'insensitive' } },
          { details_m: { contains: search, mode: 'insensitive' } },
          { department: { contains: search, mode: 'insensitive' } }
        ]
      }

      const rooms = await prisma.meeting_room.findMany({
        where,
        select: {
          room_id: true,
          room_name: true,
          capacity: true,
          location_m: true,
          department: true,  // เพิ่ม department
          status_m: true,
          image: true,
          details_m: true,
          created_at: true,
          updated_at: true,
          equipment: {
            select: {
              equipment_id: true,
              equipment_n: true,
              quantity: true
            }
          },
          _count: {
            select: {
              reservation: true,
              review: true
            }
          }
        },
        orderBy: { room_name: 'asc' }
      })

      return {
        success: true,
        message: 'รายการห้องประชุม',
        rooms: rooms,
        total: rooms.length
      }

    } catch (error) {
      console.error('❌ Error fetching rooms:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงข้อมูลห้องประชุม'
      }
    }
  })

  // ดูรายละเอียดห้องประชุมตาม ID
  .get('/:id', async ({ params, set }) => {
    try {
      const roomId = parseInt(params.id)
      
      if (isNaN(roomId)) {
        set.status = 400
        return {
          success: false,
          message: 'ID ห้องประชุมไม่ถูกต้อง'
        }
      }

      const room = await prisma.meeting_room.findUnique({
        where: { room_id: roomId },
        select: {
          room_id: true,
          room_name: true,
          capacity: true,
          location_m: true,
          department: true,  // เพิ่ม department
          status_m: true,
          image: true,
          details_m: true,
          created_at: true,
          updated_at: true,
          equipment: {
            select: {
              equipment_id: true,
              equipment_n: true,
              quantity: true
            }
          },
          review: {
            select: {
              review_id: true,
              comment: true,
              rating: true,
              created_at: true,
              users: {
                select: {
                  first_name: true,
                  last_name: true
                }
              }
            },
            orderBy: { created_at: 'desc' },
            take: 10 // แสดงรีวิวล่าสุด 10 รายการ
          },
          _count: {
            select: {
              reservation: true,
              review: true
            }
          }
        }
      })

      if (!room) {
        set.status = 404
        return {
          success: false,
          message: 'ไม่พบห้องประชุมที่ระบุ'
        }
      }

      // คำนวณคะแนนรีวิวเฉลี่ย
      const reviews = await prisma.review.findMany({
        where: { room_id: roomId },
        select: { rating: true }
      })

      const averageRating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length
        : 0

      return {
        success: true,
        message: 'รายละเอียดห้องประชุม',
        room: {
          ...room,
          average_rating: parseFloat(averageRating.toFixed(1)),
          total_reviews: reviews.length
        }
      }

    } catch (error) {
      console.error('❌ Error fetching room details:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงข้อมูลห้องประชุม'
      }
    }
  })

// Protected Room Management APIs (เฉพาะ Officer เท่านั้น - จัดการห้องใน department ตัวเอง)
// ⚠️ Admin ไม่มีสิทธิ์จัดการห้องประชุม - จัดการแค่สมาชิกเท่านั้น
export const officerRoomRoutes = new Elysia({ prefix: '/protected/officer' })
  .group('/rooms', app =>
    app
      // สร้างห้องประชุมใหม่ (ใน department ตัวเอง)
      .post('/', async ({ request, body, set }) => {
        // ตรวจสอบสิทธิ์ officer
        const user = await authMiddleware(request, set)
        if (user.success === false) return user
        
        if (!isOfficer(user)) {
          set.status = 403
          return {
            success: false,
            message: 'การเข้าถึงจำกัดเฉพาะเจ้าหน้าที่เท่านั้น'
          }
        }

        try {
          // ตรวจสอบข้อมูลที่จำเป็น
          const { room_name, capacity, location_m, status_m, image, details_m, equipment } = body

          if (!room_name || !capacity || !location_m) {
            set.status = 400
            return {
              success: false,
              message: 'กรุณากรอกข้อมูลที่จำเป็น: ชื่อห้อง, ความจุ, สถานที่'
            }
          }

          // สร้างห้องประชุมใหม่ (department ตาม user ที่ login)
          const newRoom = await prisma.meeting_room.create({
            data: {
              room_name,
              capacity: parseInt(capacity),
              location_m,
              department: user.department, // ใช้ department ของ officer
              status_m: status_m || 'available',
              image: image || null,
              details_m: details_m || null
            }
          })

          // เพิ่มอุปกรณ์ถ้ามี
          if (equipment && Array.isArray(equipment) && equipment.length > 0) {
            await prisma.equipment.createMany({
              data: equipment.map(item => ({
                room_id: newRoom.room_id,
                equipment_n: item.equipment_n,
                quantity: parseInt(item.quantity)
              }))
            })
          }

          return {
            success: true,
            message: 'สร้างห้องประชุมใหม่สำเร็จ',
            room: newRoom
          }

        } catch (error) {
          console.error('❌ Error creating room:', error)
          set.status = 500
          return {
            success: false,
            message: 'เกิดข้อผิดพลาดในการสร้างห้องประชุม'
          }
        }
      })

      // แก้ไขห้องประชุม (เฉพาะห้องใน department ตัวเอง)
      .put('/:id', async ({ request, params, body, set }) => {
        // ตรวจสอบสิทธิ์ officer
        const user = await authMiddleware(request, set)
        if (user.success === false) return user
        
        if (!isOfficer(user)) {
          set.status = 403
          return {
            success: false,
            message: 'การเข้าถึงจำกัดเฉพาะเจ้าหน้าที่เท่านั้น'
          }
        }

        try {
          const roomId = parseInt(params.id)
          
          if (isNaN(roomId)) {
            set.status = 400
            return {
              success: false,
              message: 'ID ห้องประชุมไม่ถูกต้อง'
            }
          }

          // ตรวจสอบว่าห้องมีอยู่จริงและอยู่ใน department ของ officer
          const existingRoom = await prisma.meeting_room.findUnique({
            where: { room_id: roomId }
          })

          if (!existingRoom) {
            set.status = 404
            return {
              success: false,
              message: 'ไม่พบห้องประชุมที่ระบุ'
            }
          }

          // เช็คสิทธิ์ในการจัดการห้องนี้
          if (!canManageRoom(user, existingRoom.department)) {
            set.status = 403
            return {
              success: false,
              message: 'คุณไม่มีสิทธิ์จัดการห้องประชุมนี้'
            }
          }

          const { room_name, capacity, location_m, status_m, image, details_m } = body

          // อัปเดตข้อมูลห้อง (ไม่อนุญาตให้เปลี่ยน department)
          const updatedRoom = await prisma.meeting_room.update({
            where: { room_id: roomId },
            data: {
              ...(room_name && { room_name }),
              ...(capacity && { capacity: parseInt(capacity) }),
              ...(location_m && { location_m }),
              ...(status_m && { status_m }),
              ...(image !== undefined && { image }),
              ...(details_m !== undefined && { details_m }),
              updated_at: new Date()
            }
          })

          return {
            success: true,
            message: 'แก้ไขข้อมูลห้องประชุมสำเร็จ',
            room: updatedRoom
          }

        } catch (error) {
          console.error('❌ Error updating room:', error)
          set.status = 500
          return {
            success: false,
            message: 'เกิดข้อผิดพลาดในการแก้ไขห้องประชุม'
          }
        }
      })

      // ลบห้องประชุม (เฉพาะห้องใน department ตัวเอง)
      .delete('/:id', async ({ request, params, set }) => {
        // ตรวจสอบสิทธิ์ officer
        const user = await authMiddleware(request, set)
        if (user.success === false) return user
        
        if (!isOfficer(user)) {
          set.status = 403
          return {
            success: false,
            message: 'การเข้าถึงจำกัดเฉพาะเจ้าหน้าที่เท่านั้น'
          }
        }

        try {
          const roomId = parseInt(params.id)
          
          if (isNaN(roomId)) {
            set.status = 400
            return {
              success: false,
              message: 'ID ห้องประชุมไม่ถูกต้อง'
            }
          }

          // ตรวจสอบว่าห้องมีอยู่จริงและอยู่ใน department ของ officer
          const existingRoom = await prisma.meeting_room.findUnique({
            where: { room_id: roomId }
          })

          if (!existingRoom) {
            set.status = 404
            return {
              success: false,
              message: 'ไม่พบห้องประชุมที่ระบุ'
            }
          }

          // เช็คสิทธิ์ในการจัดการห้องนี้
          if (!canManageRoom(user, existingRoom.department)) {
            set.status = 403
            return {
              success: false,
              message: 'คุณไม่มีสิทธิ์จัดการห้องประชุมนี้'
            }
          }

          // ตรวจสอบว่าห้องมีการจองหรือไม่
          const reservations = await prisma.reservation.findMany({
            where: { 
              room_id: roomId,
              status_r: { not: 'cancelled' }
            }
          })

          if (reservations.length > 0) {
            set.status = 400
            return {
              success: false,
              message: 'ไม่สามารถลบห้องประชุมที่มีการจองอยู่ได้'
            }
          }

          // ลบข้อมูลที่เกี่ยวข้องก่อน
          await prisma.equipment.deleteMany({
            where: { room_id: roomId }
          })

          await prisma.review.deleteMany({
            where: { room_id: roomId }
          })

          // ลบห้องประชุม
          await prisma.meeting_room.delete({
            where: { room_id: roomId }
          })

          return {
            success: true,
            message: 'ลบห้องประชุมสำเร็จ'
          }

        } catch (error) {
          console.error('❌ Error deleting room:', error)
          set.status = 500
          return {
            success: false,
            message: 'เกิดข้อผิดพลาดในการลบห้องประชุม'
          }
        }
      })

      // ดูห้องประชุมใน department ตัวเอง
      .get('/', async ({ request, query, set }) => {
        // ตรวจสอบสิทธิ์ officer
        const user = await authMiddleware(request, set)
        if (user.success === false) return user
        
        if (!isOfficer(user)) {
          set.status = 403
          return {
            success: false,
            message: 'การเข้าถึงจำกัดเฉพาะเจ้าหน้าที่เท่านั้น'
          }
        }

        try {
          const { status, capacity, search } = query
          
          // สร้าง filter conditions (เฉพาะ department ตัวเอง)
          const where = {
            department: user.department
          }
          
          if (status) {
            where.status_m = status
          }
          
          if (capacity) {
            where.capacity = { gte: parseInt(capacity) }
          }
          
          if (search) {
            where.OR = [
              { room_name: { contains: search, mode: 'insensitive' } },
              { location_m: { contains: search, mode: 'insensitive' } },
              { details_m: { contains: search, mode: 'insensitive' } }
            ]
          }

          const rooms = await prisma.meeting_room.findMany({
            where,
            select: {
              room_id: true,
              room_name: true,
              capacity: true,
              location_m: true,
              department: true,
              status_m: true,
              image: true,
              details_m: true,
              created_at: true,
              updated_at: true,
              equipment: {
                select: {
                  equipment_id: true,
                  equipment_n: true,
                  quantity: true
                }
              },
              _count: {
                select: {
                  reservation: true,
                  review: true
                }
              }
            },
            orderBy: { room_name: 'asc' }
          })

          return {
            success: true,
            message: `ห้องประชุมใน ${user.department}`,
            rooms: rooms,
            total: rooms.length,
            department: user.department
          }

        } catch (error) {
          console.error('❌ Error fetching officer rooms:', error)
          set.status = 500
          return {
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลห้องประชุม'
          }
        }
      })
  )
