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

    // ดึงข้อมูลผู้ใช้จาก table ที่ระบุใน token
    let user = null
    const userTable = decoded.userTable // ใช้ข้อมูลจาก token
    
    // Query ข้อมูลจาก table ที่ถูกต้องตาม token
    if (userTable === 'users') {
      user = await prisma.users.findUnique({
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
              role_name: true
            }
          }
        }
      })
    } else if (userTable === 'officer') {
      user = await prisma.officer.findUnique({
        where: { officer_id: decoded.userId },
        select: {
          officer_id: true,
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
              role_name: true
            }
          }
        }
      })
      
      if (user) {
        // เปลี่ยน officer_id เป็น user_id เพื่อให้ consistent
        user.user_id = user.officer_id
        delete user.officer_id
      }
    } else if (userTable === 'admin') {
      user = await prisma.admin.findUnique({
        where: { admin_id: decoded.userId },
        select: {
          admin_id: true,
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
              role_name: true
            }
          }
        }
      })
      
      if (user) {
        // เปลี่ยน admin_id เป็น user_id เพื่อให้ consistent
        user.user_id = user.admin_id
        delete user.admin_id
      }
    } else if (userTable === 'executive') {
      user = await prisma.executive.findUnique({
        where: { executive_id: decoded.userId },
        select: {
          executive_id: true,
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
              role_name: true
            }
          }
        }
      })
      
      if (user) {
        // เปลี่ยน executive_id เป็น user_id เพื่อให้ consistent
        user.user_id = user.executive_id
        delete user.executive_id
      }
    }

    if (!user) {
      set.status = 401
      return { success: false, message: 'ผู้ใช้ไม่ถูกต้อง' }
    }

    // เพิ่ม role เข้าไปใน user object
    const userWithRole = {
      ...user,
      role: decoded.role || user.roles?.role_name || 'user', // ใช้ role จาก token ก่อน
      userTable: userTable // เพิ่มข้อมูลว่ามาจาก table ไหน
    }

    // คืนค่า user กลับไป
    return userWithRole

  } catch (error) {
    set.status = 401
    return { success: false, message: 'Token ไม่ถูกต้อง' }
  }
}
