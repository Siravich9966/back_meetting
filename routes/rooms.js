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
import { getDepartmentFromPosition } from '../utils/positions.js'

// Public Room APIs (ไม่ต้อง authentication)
export const roomRoutes = new Elysia({ prefix: '/rooms' })
  
  // API สำหรับเสิร์ฟรูปภาพจาก database
  .get('/image/:id', async ({ params, set }) => {
    try {
      const roomId = parseInt(params.id)
      
      const room = await prisma.meeting_room.findUnique({
        where: { room_id: roomId },
        select: { image: true }
      })
      
      if (!room || !room.image) {
        set.status = 404
        set.headers['Content-Type'] = 'text/plain'
        return 'Image not found'
      }
      
      // ส่งรูปเป็น binary response ตรงๆ
      set.headers['Content-Type'] = 'image/png'
      set.headers['Cache-Control'] = 'public, max-age=3600' // cache 1 ชั่วโมง
      return room.image
      
    } catch (error) {
      console.error('❌ Error serving image:', error)
      set.status = 500
      return { success: false, message: 'Error serving image' }
    }
  })

  // ดูรายการห้องประชุมทั้งหมด
  .get('/', async ({ query, request, set }) => {
    try {
      const { status, capacity, search, department } = query
      
      // ⚠️ SECURITY CHECK: หาก request มี Authorization header แสดงว่าเป็น authenticated user
      // ต้องตรวจสอบสิทธิ์การดูห้องประชุม
      let authenticatedUser = null
      try {
        if (request.headers.authorization) {
          authenticatedUser = await authMiddleware(request, set)
          if (authenticatedUser.success === false) {
            // หากมี token แต่ invalid ให้ clear authenticatedUser
            authenticatedUser = null
          }
        }
      } catch (error) {
        // หาก auth middleware ล้มเหลว ให้ดำเนินการเป็น public request
        authenticatedUser = null
      }
      
      // สร้าง filter conditions
      const where = {}
      
      if (status) {
        where.status_m = status
      }
      
      if (capacity) {
        where.capacity = { gte: parseInt(capacity) }
      }

      // ⚠️ SECURITY FIX: Officer สามารถดูได้เฉพาะห้องตาม position_department เท่านั้น
      if (authenticatedUser && authenticatedUser.role === 'officer') {
        if (authenticatedUser.position_department) {
          where.department = authenticatedUser.position_department // บังคับให้เห็นเฉพาะห้องที่มีสิทธิ์ตาม position
          console.log('🔐 [SECURITY] Officer room filtering by position_department:', {
            officer_id: authenticatedUser.officer_id,
            current_department: authenticatedUser.department,
            position_department: authenticatedUser.position_department,
            filtered_by: authenticatedUser.position_department
          })
        } else {
          // หาก Officer ไม่มี position_department ให้ return empty result
          where.room_id = -1 // Impossible room_id to return no results
          console.log('⚠️ [SECURITY] Officer without position_department blocked from viewing rooms:', authenticatedUser.email)
        }
      } else if (department) {
        // สำหรับ role อื่นๆ หรือ public request ให้ filter ตาม parameter ปกติ
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
          image: true, // 🖼️ เพิ่ม image เพื่อตรวจสอบว่ามีรูปหรือไม่
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
              reservation: {
                where: {
                  status_r: 'approved',
                  end_at: {
                    gte: new Date() // เฉพาะการจองที่ยังไม่หมดอายุ
                  }
                }
              },
              review: true
            }
          }
        },
        orderBy: { room_name: 'asc' }
      })

      // 🖼️ แปลง image binary เป็น hasImage boolean และลบ binary data ออก
      const roomsWithImageFlag = rooms.map(room => ({
        ...room,
        hasImage: !!room.image, // แปลงเป็น boolean
        has_image: !!room.image, // เพิ่มเพื่อ compatibility
        active_bookings_count: room._count.reservation, // จำนวนการจองที่ใช้งานอยู่
        image: undefined // ลบ binary data ออกเพื่อประสิทธิภาพ
      }))

      return {
        success: true,
        message: 'รายการห้องประชุม',
        rooms: roomsWithImageFlag,
        total: roomsWithImageFlag.length
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
          // จัดการข้อมูลจาก body (Elysia ได้ parse FormData แล้ว)
          const room_name = body.room_name
          const capacity = body.capacity
          const location_m = body.location_m
          const status_m = body.status_m || 'available'
          const details_m = body.details_m || null
          
          // จัดการอุปกรณ์
          let equipment = []
          if (body.equipment) {
            try {
              equipment = typeof body.equipment === 'string' 
                ? JSON.parse(body.equipment) 
                : body.equipment
            } catch (e) {
              console.log('Equipment parsing error:', e)
              equipment = []
            }
          }

          // จัดการรูปภาพ - เก็บใน database เป็น binary data
          let imageBuffer = null
          if (body.image && typeof body.image === 'object' && body.image.name) {
            try {
              // แปลงไฟล์เป็น Buffer เพื่อเก็บใน database
              const arrayBuffer = await body.image.arrayBuffer()
              imageBuffer = Buffer.from(arrayBuffer)
              
              console.log('📷 Image converted to buffer, size:', imageBuffer.length, 'bytes')
            } catch (error) {
              console.error('❌ Error converting image to buffer:', error)
              imageBuffer = null
            }
          }

          if (!room_name || !capacity || !location_m) {
            set.status = 400
            return {
              success: false,
              message: 'กรุณากรอกข้อมูลที่จำเป็น: ชื่อห้อง, ความจุ, สถานที่'
            }
          }

          // ⚠️ SECURITY FIX: ใช้ position_department จาก JWT middleware
          if (!user.position_department) {
            set.status = 403
            return {
              success: false,
              message: 'ไม่พบข้อมูลสิทธิ์การดูแลห้องประชุม'
            }
          }

          console.log('🔐 [SECURITY] Officer room creation by position_department:', {
            officer_id: user.officer_id,
            current_department: user.department,
            position_department: user.position_department,
            creating_for_department: user.position_department
          })
          
          // สร้างห้องประชุมใหม่ (department ตาม position_department)
          const newRoom = await prisma.meeting_room.create({
            data: {
              room_name,
              capacity: parseInt(capacity),
              location_m,
              department: user.position_department, // ⚠️ SECURITY FIX: ใช้ position_department
              status_m,
              image: imageBuffer, // เก็บรูปเป็น binary data ใน database
              details_m
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
          if (!(await canManageRoom(user, existingRoom.department))) {
            set.status = 403
            return {
              success: false,
              message: 'คุณไม่มีสิทธิ์จัดการห้องประชุมนี้'
            }
          }

          const { room_name, capacity, location_m, status_m, details_m } = body

          // จัดการอุปกรณ์ (เหมือนกับ POST)
          let equipment = []
          if (body.equipment) {
            try {
              equipment = typeof body.equipment === 'string' 
                ? JSON.parse(body.equipment) 
                : body.equipment
              console.log('🛠️ Equipment data received for update:', equipment)
            } catch (e) {
              console.log('Equipment parsing error:', e)
              equipment = []
            }
          }

          // ⚡ ไม่จัดการรูปภาพใน PUT API แล้ว (ใช้ PUT /:id/image แทน)

          console.log('🔄 Updating room with data:', {
            room_name,
            capacity: capacity ? parseInt(capacity) : undefined,
            location_m,
            status_m,
            details_m,
            note: 'Image handled separately via PUT /:id/image'
          })

          // อัปเดตข้อมูลห้อง (ไม่อนุญาตให้เปลี่ยน department)
          const updatedRoom = await prisma.meeting_room.update({
            where: { room_id: roomId },
            data: {
              ...(room_name && { room_name }),
              ...(capacity && { capacity: parseInt(capacity) }),
              ...(location_m && { location_m }),
              ...(status_m && { status_m }),
              ...(details_m !== undefined && { details_m }),
              updated_at: new Date()  // ⚡ ไม่อัพเดทรูป ทำให้เร็วขึ้น
            }
          })

          // อัปเดตอุปกรณ์ - ลบอุปกรณ์เก่าทั้งหมดแล้วเพิ่มใหม่
          await prisma.equipment.deleteMany({
            where: { room_id: roomId }
          })

          // เพิ่มอุปกรณ์ใหม่ถ้ามี
          if (equipment && Array.isArray(equipment) && equipment.length > 0) {
            await prisma.equipment.createMany({
              data: equipment.map(item => ({
                room_id: roomId,
                equipment_n: item.equipment_n,
                quantity: parseInt(item.quantity)
              }))
            })
            console.log('🛠️ Equipment updated:', equipment.length, 'items')
          } else {
            console.log('🛠️ No equipment to update')
          }

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

      // 🚀 อัพโหลดรูปภาพแยกต่างหาก (Fast Image Upload)
      .put('/:id/image', async ({ request, params, body, set }) => {
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

          if (existingRoom.department !== user.department) {
            set.status = 403
            return {
              success: false,
              message: 'คุณไม่มีสิทธิ์แก้ไขห้องประชุมนี้'
            }
          }

          // จัดการรูปภาพ
          const image = body.image
          if (!image || !image.name) {
            set.status = 400
            return {
              success: false,
              message: 'กรุณาเลือกไฟล์รูปภาพ'
            }
          }

          console.log('📷 Processing image upload for room:', roomId)

          // แปลงไฟล์เป็น Buffer เพื่อเก็บใน database
          const arrayBuffer = await image.arrayBuffer()
          const imageBuffer = Buffer.from(arrayBuffer)

          console.log('💾 Saving image to database, size:', imageBuffer.length, 'bytes')

          // อัพเดทเฉพาะรูปภาพ
          const updatedRoom = await prisma.meeting_room.update({
            where: { room_id: roomId },
            data: {
              image: imageBuffer,
              updated_at: new Date()
            },
            select: {
              room_id: true,
              image: true,
              updated_at: true
            }
          })

          console.log('✅ Image updated successfully for room:', roomId)
          console.log('📊 Updated room image size:', updatedRoom.image ? updatedRoom.image.length : 0, 'bytes')
          console.log('🕒 Updated at:', updatedRoom.updated_at)

          return {
            success: true,
            message: 'อัพโหลดรูปภาพสำเร็จ'
          }

        } catch (error) {
          console.error('❌ Error uploading image:', error)
          set.status = 500
          return {
            success: false,
            message: 'เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ'
          }
        }
      })

      // 🗑️ ลบรูปภาพของห้องประชุม
      .delete('/:id/image', async ({ request, params, set }) => {
        try {
          // ตรวจสอบสิทธิ์ officer
          const user = await authMiddleware(request, set)
          if (user.success === false) return user

          const roomId = parseInt(params.id)
          if (!roomId) {
            set.status = 400
            return {
              success: false,
              message: 'ID ห้องประชุมไม่ถูกต้อง'
            }
          }

          console.log('🗑️ Deleting image for room:', roomId)

          // ตรวจสอบว่าห้องประชุมมีอยู่และอยู่ใน department เดียวกัน
          const room = await prisma.meeting_room.findFirst({
            where: {
              room_id: roomId,
              department: user.department
            }
          })

          if (!room) {
            set.status = 404
            return {
              success: false,
              message: 'ไม่พบห้องประชุมหรือไม่มีสิทธิ์เข้าถึง'
            }
          }

          // ลบรูปภาพ (set เป็น null)
          await prisma.meeting_room.update({
            where: { room_id: roomId },
            data: {
              image: null,
              updated_at: new Date()
            }
          })

          console.log('✅ Image deleted successfully for room:', roomId)

          return {
            success: true,
            message: 'ลบรูปภาพสำเร็จ'
          }

        } catch (error) {
          console.error('❌ Error deleting image:', error)
          set.status = 500
          return {
            success: false,
            message: 'เกิดข้อผิดพลาดในการลบรูปภาพ'
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
          if (!(await canManageRoom(user, existingRoom.department))) {
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
          
          // ⚠️ SECURITY FIX: ใช้ position_department แทน user.department
          if (!user.position_department) {
            set.status = 403
            return {
              success: false,
              message: 'ไม่พบข้อมูลสิทธิ์การดูแลห้องประชุม'
            }
          }
          
          // สร้าง filter conditions (เฉพาะ position_department ตัวเอง)
          const where = {
            department: user.position_department // ⚠️ SECURITY FIX: ใช้ position_department
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
              // � ใช้ _count แทนการดึง binary data เพื่อ performance
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

          // � ตรวจสอบว่ามีรูปหรือไม่โดยไม่ดึง binary data
          const roomsWithImageCheck = await Promise.all(
            rooms.map(async (room) => {
              // เช็คว่ามี image หรือไม่โดยไม่ดึง binary data
              const imageCheck = await prisma.meeting_room.findUnique({
                where: { room_id: room.room_id },
                select: { image: true }
              })
              
              // 👥 คำนวณจำนวนคนที่กำลังใช้งานในขณะนี้
              const currentTime = new Date()
              
              // หา reservation ที่กำลัง active อยู่ในช่วงเวลานี้
              const currentReservations = await prisma.reservation.findMany({
                where: {
                  room_id: room.room_id,
                  status_r: 'approved', // ใช้ status_r แทน status
                  // ตรวจสอบว่าอยู่ในช่วงเวลาการจองหรือไม่
                  start_time: { lte: currentTime },
                  end_time: { gte: currentTime }
                },
                select: {
                  user_id: true // เนื่องจากไม่มี participants_count ใช้ user_id แทน
                }
              })
              
              // นับจำนวน reservation ที่ active ปัจจุบัน (แต่ละการจองคือ 1 คน)
              const currentUsers = currentReservations.length
              
              return {
                ...room,
                has_image: !!imageCheck?.image, // ✅ ใช้ snake_case ตาม Frontend
                current_users: currentUsers // 👥 จำนวนคนที่กำลังใช้งานปัจจุบัน
              }
            })
          )

          return {
            success: true,
            message: `ห้องประชุมที่รับผิดชอบ (${user.position_department})`,
            rooms: roomsWithImageCheck,
            total: roomsWithImageCheck.length,
            department: user.position_department,
            position_info: {
              current_department: user.department,
              position_department: user.position_department,
              position: user.position
            }
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
