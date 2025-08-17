import { Elysia } from 'elysia'
import { authMiddleware } from '../middleware/index.js'
import prisma from '../lib/prisma.js'
import fs from 'fs'
import path from 'path'

// สร้างโฟลเดอร์ uploads หากไม่มี
const uploadsDir = path.join(process.cwd(), 'uploads/profiles')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

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

      const fileExtension = path.extname(file.name)
      const fileName = `${userId}_${Date.now()}${fileExtension}`
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

      // ลบรูปเก่า (ถ้ามี)
      if (currentUser.profile_image) {
        const oldImagePath = path.join(process.cwd(), currentUser.profile_image.substring(1))
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath)
        }
      }

      return {
        success: true,
        message: 'อัปโหลดรูปโปรไฟล์สำเร็จ',
        data: updatedUser
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

      // ลบไฟล์รูปภาพ
      const imagePath = path.join(process.cwd(), currentUser.profile_image.substring(1))
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }

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
