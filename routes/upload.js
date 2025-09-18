import { Elysia } from 'elysia'
import { authMiddleware } from '../middleware/index.js'
import prisma from '../lib/prisma.js'
import path from 'path'

// ไม่ใช้ filesystem แล้ว - เก็บใน database

// ฟังก์ชันสำหรับตรวจสอบประเภทไฟล์
const isValidImageFile = (filename) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  const ext = path.extname(filename).toLowerCase()
  return allowedExtensions.includes(ext)
}

export const uploadRoutes = new Elysia({ prefix: '/upload' })
  .derive(async ({ headers, set }) => {
    const user = await authMiddleware({ headers }, set)
    if (!user || user.success === false) {
      return { user: null }
    }
    return { user }
  })
  
  // API สำหรับอัปโหลดรูปโปรไฟล์
  .post('/profile-image', async ({ body, user, set }) => {
    try {
      if (!body.profileImage || !(body.profileImage instanceof File)) {
        set.status = 400
        return {
          success: false,
          message: 'กรุณาเลือกไฟล์รูปภาพ'
        }
      }

      const file = body.profileImage
      
      // ตรวจสอบประเภทไฟล์
      if (!isValidImageFile(file.name)) {
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

      // กำหนด table และ field ตาม role
      const role = user.role || 'user'
      let tableName, idField, userId

      switch (role) {
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
        },
        select: {
          [idField]: true,
          first_name: true,
          last_name: true,
          email: true,
          profile_image: true,
          role_id: true,
          department: true,
          position: true
        }
      })

      // รูปเก่าจะถูกเขียนทับใน database โดยอัตโนมัติ

      return {
        success: true,
        message: 'อัปโหลดรูปโปรไฟล์สำเร็จ',
        data: updatedUser,
        imageUrl: `/api/upload/profile-image/${userId}` // URL สำหรับดึงรูป
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

  // API สำหรับลบรูปโปรไฟล์
  .delete('/profile-image', async ({ user, set }) => {
    try {
      // กำหนด table และ field ตาม role
      const role = user.role || 'user'
      let tableName, idField, userId

      switch (role) {
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

      // หารูปปัจจุบัน
      const currentUser = await prisma[tableName].findUnique({
        where: { [idField]: userId },
        select: { profile_image: true }
      })

      if (!currentUser.profile_image) {
        set.status = 400
        return {
          success: false,
          message: 'ไม่มีรูปโปรไฟล์ให้ลบ'
        }
      }

      // ลบรูปโปรไฟล์จากฐานข้อมูล
      // อัปเดตรูปโปรไฟล์ในฐานข้อมูล (ลบข้อมูลรูป)
      const updatedUser = await prisma[tableName].update({
        where: { [idField]: userId },
        data: { 
          profile_image: null,
          updated_at: new Date()
        },
        select: {
          [idField]: true,
          first_name: true,
          last_name: true,
          email: true,
          profile_image: true,
          role_id: true,
          department: true,
          position: true
        }
      })

      // รูปเก่าในฐานข้อมูลจะถูกลบอัตโนมัติ

      return {
        success: true,
        message: 'ลบรูปโปรไฟล์สำเร็จ',
        data: updatedUser
      }

    } catch (error) {
      console.error('Error deleting profile image:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการลบรูปภาพ',
        error: error.message
      }
    }
  })

// สร้าง public routes สำหรับดึงรูป (ไม่ต้อง authentication)
export const publicUploadRoutes = new Elysia({ prefix: '/upload' })
  // API สำหรับดึงรูปโปรไฟล์ (public)
  .get('/profile-image/:userId', async ({ params: { userId }, set }) => {
    try {
      // หาข้อมูล user จาก userId
      const user = await prisma.users.findUnique({
        where: { user_id: parseInt(userId) },
        select: { profile_image: true }
      })

      if (!user || !user.profile_image) {
        set.status = 404
        return {
          success: false,
          message: 'ไม่พบรูปโปรไฟล์'
        }
      }

      // ส่งกลับ binary data เป็น image
      set.headers['Content-Type'] = 'image/jpeg' // สามารถเปลี่ยนเป็น image/png ได้ตามต้องการ
      set.headers['Cache-Control'] = 'public, max-age=31536000' // Cache 1 ปี
      
      return user.profile_image

    } catch (error) {
      console.error('Error fetching profile image:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงรูปภาพ',
        error: error.message
      }
    }
  })
