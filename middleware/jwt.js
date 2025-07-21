// ===================================================================
// JWT Authentication Middleware
// ===================================================================
// ตรวจสอบ JWT Token และดึงข้อมูลผู้ใช้จาก Database
// ===================================================================

import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'

// JWT Authentication Middleware
export const authMiddleware = async (request, set) => {
  // แปลง Headers object เป็น plain object ผ่าน JSON
  const headersString = JSON.stringify(request.headers)
  const headersObj = JSON.parse(headersString)
  const authHeader = headersObj.authorization
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    set.status = 401
    return { success: false, message: 'ต้องเข้าสู่ระบบก่อน' }
  }

  try {
    // แยก token
    const token = authHeader.substring(7)
    
    // ตรวจสอบ token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // ดึงข้อมูลผู้ใช้
    const user = await prisma.users.findUnique({
      where: { user_id: decoded.userId },
      select: {
        user_id: true,
        email: true,
        first_name: true,
        last_name: true,
        citizen_id: true,
        position: true,
        department: true,
        zip_code: true,
        created_at: true,
        updated_at: true,
        roles: {
          select: {
            role_name: true,
            role_status: true
          }
        }
      }
    })

    if (!user) {
      set.status = 401
      return { success: false, message: 'ผู้ใช้ไม่ถูกต้อง' }
    }

    // เพิ่ม role เข้าไปใน user object
    const userWithRole = {
      ...user,
      role: user.roles?.role_name || 'user'
    }

    // คืนค่า user กลับไป
    return userWithRole

  } catch (error) {
    set.status = 401
    return { success: false, message: 'Token ไม่ถูกต้อง' }
  }
}
