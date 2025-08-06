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

          // สร้าง uploads/profiles folder ถ้าไม่มี
          const fs = await import('fs')
          const path = await import('path')
          const uploadsDir = path.join(process.cwd(), 'uploads/profiles')
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true })
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

          // สร้างชื่อไฟล์
          const fileName = `${userId}_${Date.now()}${ext}`
          const filePath = path.join(uploadsDir, fileName)
          const imagePath = `/uploads/profiles/${fileName}`

          // หารูปเก่าเพื่อลบ
          const currentUser = await prisma[tableName].findUnique({
            where: { [idField]: userId },
            select: { profile_image: true }
          })

          // บันทึกไฟล์
          const arrayBuffer = await file.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          fs.writeFileSync(filePath, buffer)

          // อัปเดตรูปโปรไฟล์ในฐานข้อมูล
          const updatedUser = await prisma[tableName].update({
            where: { [idField]: userId },
            data: { 
              profile_image: imagePath,
              updated_at: new Date()
            }
          })

          // ลบรูปเก่า (ถ้ามี)
          if (currentUser.profile_image && currentUser.profile_image !== imagePath) {
            const oldImagePath = path.join(process.cwd(), currentUser.profile_image.substring(1))
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath)
            }
          }

          return {
            success: true,
            message: 'อัปโหลดรูปโปรไฟล์สำเร็จ',
            profile_image: imagePath
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
