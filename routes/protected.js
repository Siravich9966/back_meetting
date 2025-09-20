// ===================================================================
// Protected Routes - APIs ที่ต้องการ JWT Authentication
// ===================================================================
// ไฟล์นี้จัดการ API ที่ต้องเข้าสู่ระบบ:
// - ใช้ Auth Middleware จาก ../middleware/auth.js
// - แยก level การเข้าถึงตาม role: user/officer/admin
// ===================================================================

import { Elysia } from 'elysia'
import { authMiddleware, isAdmin, isOfficer, isUser } from '../middleware/index.js'
import prisma from '../lib/prisma.js'
import { getTableFromPosition } from '../utils/positions.js'

export const protectedRoutes = new Elysia({ prefix: '/protected' })
  // API ทดสอบง่ายๆ (ไม่ต้อง auth)
  .get('/test', () => ({
    message: 'API ทำงานได้!!',
    timestamp: new Date().toISOString()
  }))

  // API สำหรับเสิร์ฟรูปโปรไฟล์จาก database
  .get('/profile/image/:role/:id', async ({ params, set }) => {
    try {
      const { role, id } = params
      const userId = parseInt(id)
      
      let user
      if (role === 'admin') {
        user = await prisma.admin.findUnique({
          where: { admin_id: userId },
          select: { profile_image: true }
        })
      } else if (role === 'user') {
        user = await prisma.user.findUnique({
          where: { user_id: userId },
          select: { profile_image: true }
        })
      }
      
      if (!user || !user.profile_image) {
        set.status = 404
        return { success: false, message: 'Profile image not found' }
      }
      
      // ส่งรูปเป็น response
      set.headers['Content-Type'] = 'image/jpeg'
      return new Response(user.profile_image)
      
    } catch (error) {
      console.error('❌ Error serving profile image:', error)
      set.status = 500
      return { success: false, message: 'Error serving profile image' }
    }
  })

  // === User Routes (ต้องมี user, officer, หรือ admin role) ===
  .group('/user', app =>
    app
      .get('/profile', async ({ request, set }) => {
        // เรียกใช้ auth middleware
        const user = await authMiddleware(request, set)
        
        // ถ้า middleware return error response
        if (user.success === false) {
          return user
        }
        
        // เช็ค role
        if (!isUser(user)) {
          set.status = 403
          return { 
            success: false, 
            message: 'ไม่มีสิทธิ์เข้าถึง' 
          }
        }
        
        return {
          success: true,
          message: 'ข้อมูลโปรไฟล์ของคุณ',
          profile: user
        }
      })
      .put('/profile', async ({ request, set, body }) => {
        try {
          // เรียกใช้ auth middleware
          const user = await authMiddleware(request, set)
          
          // ถ้า middleware return error response
          if (user.success === false) {
            return user
          }
          
          // เช็ค role
          if (!isUser(user)) {
            set.status = 403
            return { 
              success: false, 
              message: 'ไม่มีสิทธิ์เข้าถึง' 
            }
          }

          // ข้อมูลที่อนุญาตให้แก้ไข
          const allowedFields = ['first_name', 'last_name', 'email', 'citizen_id', 'position', 'department', 'zip_code']
          const updateData = {}
          
          // กรองเฉพาะข้อมูลที่อนุญาต
          for (const field of allowedFields) {
            if (body[field] !== undefined) {
              updateData[field] = body[field]
            }
          }

          // ตรวจสอบว่ามีข้อมูลที่จะอัปเดตหรือไม่
          if (Object.keys(updateData).length === 0) {
            set.status = 400
            return {
              success: false,
              message: 'ไม่มีข้อมูลที่จะอัปเดต'
            }
          }

          // กำหนด table ที่จะอัปเดตตาม role
          let tableName
          let idField
          let userId

          switch (user.role) {
            case 'user':
              tableName = 'users'
              idField = 'user_id'
              userId = user.user_id
              break
            case 'officer':
              tableName = 'officer'
              idField = 'officer_id'
              userId = user.officer_id
              break
            case 'admin':
              tableName = 'admin'
              idField = 'admin_id'
              userId = user.admin_id
              break
            case 'executive':
              tableName = 'executive'
              idField = 'executive_id'
              userId = user.executive_id
              break
            default:
              set.status = 400
              return {
                success: false,
                message: 'ไม่สามารถระบุ role ได้'
              }
          }

          // อัปเดตข้อมูลในฐานข้อมูล
          await prisma[tableName].update({
            where: {
              [idField]: userId
            },
            data: {
              ...updateData,
              updated_at: new Date()
            }
          })

          return {
            success: true,
            message: 'อัปเดตโปรไฟล์สำเร็จ',
            updated_fields: Object.keys(updateData)
          }

        } catch (error) {
          console.error('Error updating profile:', error)
          set.status = 500
          return {
            success: false,
            message: 'เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์'
          }
        }
      })
      .post('/profile/image', async ({ request, set, body }) => {
        try {
          // เรียกใช้ auth middleware
          const user = await authMiddleware(request, set)
          
          // ถ้า middleware return error response
          if (user.success === false) {
            return user
          }
          
          // เช็ค role
          if (!isUser(user)) {
            set.status = 403
            return { 
              success: false, 
              message: 'ไม่มีสิทธิ์เข้าถึง' 
            }
          }

          // ตรวจสอบไฟล์ที่อัปโหลด
          if (!body.profileImage || !(body.profileImage instanceof File)) {
            set.status = 400
            return {
              success: false,
              message: 'กรุณาเลือกไฟล์รูปภาพ'
            }
          }

          const file = body.profileImage
          
          // ตรวจสอบประเภทไฟล์
          const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
          const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
          if (!allowedExtensions.includes(ext)) {
            set.status = 400
            return {
              success: false,
              message: 'รองรับเฉพาะไฟล์รูปภาพ (JPEG, JPG, PNG, GIF, WebP)'
            }
          }

          // ตรวจสอบขนาดไฟล์ (5MB)
          if (file.size > 5 * 1024 * 1024) {
            set.status = 400
            return {
              success: false,
              message: 'ขนาดไฟล์ต้องไม่เกิน 5MB'
            }
          }

          // เก็บรูปใน database แล้ว ไม่ใช้ filesystem

          // กำหนด table และ field ตาม role
          let tableName, idField, userId
          switch (user.role) {
            case 'admin':
              tableName = 'admin'
              idField = 'admin_id'
              userId = user.admin_id || user.user_id
              break
            case 'officer':
              tableName = 'officer'
              idField = 'officer_id'
              userId = user.officer_id || user.user_id
              break
            case 'executive':
              tableName = 'executive'
              idField = 'executive_id'
              userId = user.executive_id || user.user_id
              break
            default:
              tableName = 'users'
              idField = 'user_id'
              userId = user.user_id
          }

          // แปลงไฟล์เป็น Buffer เพื่อเก็บใน database
          const arrayBuffer = await file.arrayBuffer()
          const imageBuffer = Buffer.from(arrayBuffer)

          console.log('📷 Profile image converted to buffer, size:', imageBuffer.length, 'bytes')

          // อัปเดตรูปโปรไฟล์ในฐานข้อมูล (เก็บเป็น binary data)
          const updatedUser = await prisma[tableName].update({
            where: { [idField]: userId },
            data: { 
              profile_image: imageBuffer,
              updated_at: new Date()
            }
          })

          // รูปเก่าจะถูกเขียนทับใน database โดยอัตโนมัติ
          return {
            success: true,
            message: 'อัปโหลดรูปโปรไฟล์สำเร็จ',
            hasProfileImage: true
          }

        } catch (error) {
          console.error('Error uploading profile image:', error)
          set.status = 500
          return {
            success: false,
            message: 'เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ',
            error: error.message
          }
        }
      })
      .delete('/profile/image', async ({ request, set }) => {
        try {
          // เรียกใช้ auth middleware
          const user = await authMiddleware(request, set)
          
          // ถ้า middleware return error response
          if (user.success === false) {
            return user
          }
          
          // เช็ค role
          if (!isUser(user)) {
            set.status = 403
            return { 
              success: false, 
              message: 'ไม่มีสิทธิ์เข้าถึง' 
            }
          }

          // กำหนด table และ field ตาม role
          let tableName, idField, userId
          switch (user.role) {
            case 'admin':
              tableName = 'admin'
              idField = 'admin_id'
              userId = user.admin_id || user.user_id
              break
            case 'officer':
              tableName = 'officer'
              idField = 'officer_id'
              userId = user.officer_id || user.user_id
              break
            case 'executive':
              tableName = 'executive'
              idField = 'executive_id'
              userId = user.executive_id || user.user_id
              break
            default:
              tableName = 'users'
              idField = 'user_id'
              userId = user.user_id
          }

          // หารูปเก่าเพื่อลบ
          const currentUser = await prisma[tableName].findUnique({
            where: { [idField]: userId },
            select: { profile_image: true }
          })

          if (!currentUser.profile_image) {
            set.status = 400
            return {
              success: false,
              message: 'ไม่พบรูปโปรไฟล์ที่จะลบ'
            }
          }

          // ลบรูปจากระบบไฟล์
          const fs = await import('fs')
          const path = await import('path')
          const oldImagePath = path.join(process.cwd(), currentUser.profile_image.substring(1))
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath)
          }

          // อัปเดตฐานข้อมูลให้ profile_image เป็น null
          await prisma[tableName].update({
            where: { [idField]: userId },
            data: { 
              profile_image: null,
              updated_at: new Date()
            }
          })

          return {
            success: true,
            message: 'ลบรูปโปรไฟล์สำเร็จ'
          }

        } catch (error) {
          console.error('Error removing profile image:', error)
          set.status = 500
          return {
            success: false,
            message: 'เกิดข้อผิดพลาดในการลบรูปภาพ',
            error: error.message
          }
        }
      })
      .get('/area', async ({ request, set }) => {
        // เรียกใช้ auth middleware
        const user = await authMiddleware(request, set)
        
        // ถ้า middleware return error response
        if (user.success === false) {
          return user
        }
        
        // เช็ค role
        if (!isUser(user)) {
          set.status = 403
          return { 
            success: false, 
            message: 'ไม่มีสิทธิ์เข้าถึง' 
          }
        }
        
        return {
          success: true,
          message: `สวัสดี ${user.first_name || 'Unknown'} ${user.last_name || ''}`,
          area: 'พื้นที่สำหรับผู้ใช้ทั่วไป',
          your_role: user.role || 'unknown',
          user_data: user
        }
      })
  )

// === Officer Routes (ต้องมี officer หรือ admin role) ===
export const officerRoutes = new Elysia({ prefix: '/protected' })
  .group('/officer', app =>
    app
      .get('/area', async ({ request, set }) => {
        // เรียกใช้ auth middleware
        const user = await authMiddleware(request, set)
        
        // ถ้า middleware return error response
        if (user.success === false) {
          return user
        }
        
        // เช็ค role
        if (!isOfficer(user)) {
          set.status = 403
          return { 
            success: false, 
            message: 'การเข้าถึงจำกัดเฉพาะเจ้าหน้าที่หรือผู้ดูแลระบบเท่านั้น' 
          }
        }
        
        return {
          success: true,
          message: `สวัสดี ${user.first_name || 'Unknown'} ${user.last_name || ''} (เจ้าหน้าที่)`,
          area: 'พื้นที่สำหรับเจ้าหน้าที่',
          permissions: ['approve_reservations', 'manage_rooms'],
          your_role: user.role || 'unknown',
          user_data: user
        }
      })


      // === Officer Reports === 
      .get('/reports', async ({ request, query, set }) => {
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

          console.log('📊 Officer Reports - User:', user.email, 'Position:', user.position)
          const { period = 'current_month' } = query

          // ⚠️ SECURITY FIX: เจ้าหน้าที่เห็นเฉพาะข้อมูลในหน่วยงานที่รับผิดชอบ
          if (!user.position_department) {
            set.status = 403
            return {
              success: false,
              message: 'ไม่พบข้อมูลสิทธิ์การดูแลห้องประชุม'
            }
          }

          console.log('🏢 Officer department filter:', user.position_department)

          // คำนวณช่วงเวลาตาม period
          let startDate, endDate
          const now = new Date()
          
          switch (period) {
            case 'last_month':
              startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
              endDate = new Date(now.getFullYear(), now.getMonth(), 0)
              break
            case 'last_3_months':
              startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1)
              endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
              break
            case 'last_6_months':
              startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1)
              endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
              break
            case 'current_quarter':
              const currentQuarter = Math.floor(now.getMonth() / 3)
              startDate = new Date(now.getFullYear(), currentQuarter * 3, 1)
              endDate = new Date(now.getFullYear(), (currentQuarter + 1) * 3, 0)
              break
            case 'current_year':
              startDate = new Date(now.getFullYear(), 0, 1)
              endDate = new Date(now.getFullYear(), 11, 31)
              break
            default: // current_month
              startDate = new Date(now.getFullYear(), now.getMonth(), 1)
              endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
          }

          console.log('📅 Date range:', startDate, 'to', endDate)

          // เตรียมข้อมูลสำหรับสถิติ
          const reservation_summary = []
          const room_utilization = []
          const monthly_trends = []

          // สถิติสรุปการจอง
          const totalReservations = await prisma.reservation.count({
            where: {
              meeting_room: {
                department: user.position_department
              },
              start_at: {
                gte: startDate,
                lte: endDate

              }
            }
          })


          const approvedReservations = await prisma.reservation.count({
            where: {
              meeting_room: {
                department: user.position_department
              },
              start_at: {
                gte: startDate,
                lte: endDate
              },
              status_r: 'approved'
            }
          })

          const pendingReservations = await prisma.reservation.count({
            where: {
              meeting_room: {
                department: user.position_department
              },
              start_at: {
                gte: startDate,
                lte: endDate
              },

              status_r: 'pending'
            }
          })


          const rejectedReservations = await prisma.reservation.count({
            where: {
              meeting_room: {
                department: user.position_department
              },
              start_at: {
                gte: startDate,
                lte: endDate
              },
              status_r: 'rejected'
            }
          })

          reservation_summary.push({
            category: 'การจองทั้งหมด',
            count: totalReservations,
            percentage: 100
          })

          if (totalReservations > 0) {
            reservation_summary.push({
              category: 'อนุมัติแล้ว',
              count: approvedReservations,
              percentage: Math.round((approvedReservations / totalReservations) * 100)
            })

            reservation_summary.push({
              category: 'รอการอนุมัติ',
              count: pendingReservations,
              percentage: Math.round((pendingReservations / totalReservations) * 100)
            })

            reservation_summary.push({
              category: 'ปฏิเสธ',
              count: rejectedReservations,
              percentage: Math.round((rejectedReservations / totalReservations) * 100)
            })
          }

          // สถิติการใช้งานห้องประชุม
          const roomUsageStats = await prisma.reservation.groupBy({
            by: ['room_id'],
            where: {
              meeting_room: {
                department: user.position_department
              },
              start_at: {
                gte: startDate,
                lte: endDate
              },
              status_r: 'approved'
            },
            _count: {
              reservation_id: true
            },
            orderBy: {
              _count: {
                reservation_id: 'desc'
              }
            }
          })

          for (const roomStat of roomUsageStats.slice(0, 10)) { // แสดง 10 ห้องแรก
            const room = await prisma.meeting_room.findUnique({
              where: { room_id: roomStat.room_id },
              select: { room_name: true }
            })

            room_utilization.push({
              room_name: room?.room_name || `ห้อง ${roomStat.room_id}`,
              usage_count: roomStat._count.reservation_id,
              percentage: Math.round((roomStat._count.reservation_id / approvedReservations) * 100) || 0
            })
          }

          // แนวโน้มการจองรายเดือน (สำหรับ 6 เดือนย้อนหลัง)
          for (let i = 5; i >= 0; i--) {
            const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
            const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0)
            
            const monthlyReservations = await prisma.reservation.count({
              where: {
                meeting_room: {
                  department: user.position_department
                },
                start_at: {
                  gte: monthDate,
                  lte: nextMonth
                },
                status_r: 'approved'
              }
            })

            monthly_trends.push({
              month: monthDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'short' }),
              reservations: monthlyReservations
            })
          }

          return {
            success: true,
            data: {
              reservation_summary,
              room_utilization,
              monthly_trends
            },
            meta: {
              department: user.position_department,
              period,
              date_range: {
                start: startDate.toISOString(),
                end: endDate.toISOString()
              }

            }
          }

        } catch (error) {

          console.error('❌ Error in officer reports:', error)
          set.status = 500
          return {
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงรายงาน',
            error: error.message

          }
        }
      })
  )

// === Admin Routes (ต้องมี admin role เท่านั้น) ===
export const adminAreaRoutes = new Elysia({ prefix: '/protected' })
  .group('/admin', app =>
    app
      .get('/area', async ({ request, set }) => {
        // เรียกใช้ auth middleware
        const user = await authMiddleware(request, set)
        
        // ถ้า middleware return error response
        if (user.success === false) {
          return user
        }
        
        // เช็ค role
        if (!isAdmin(user)) {
          set.status = 403
          return { 
            success: false, 
            message: 'การเข้าถึงจำกัดเฉพาะผู้ดูแลระบบเท่านั้น' 
          }
        }
        
        return {
          success: true,
          message: `สวัสดี ${user.first_name || 'Unknown'} ${user.last_name || ''} (ผู้ดูแลระบบ)`,
          area: 'พื้นที่สำหรับผู้ดูแลระบบ',
          permissions: ['manage_all_users', 'manage_all_rooms', 'system_settings'],
          access_level: 'Super Admin',
          user_data: user
        }
      })
  )
