// ===================================================================
// JWT Middleware สำหรับ Meeting Room Backend
// ===================================================================
// จัดการการตรวจสอบ JWT Token และ Role-based Access Control
// 
// Architecture:
// - jwtMiddleware: Core middleware ที่ inject user data
// - Role Guards: requireAuth, requireOfficer, requireAdmin
// - Token Verification: ตรวจสอบ JWT และดึงข้อมูล user
// ===================================================================

import { Elysia } from 'elysia'
import prisma from '../lib/prisma.js'
import jwt from 'jsonwebtoken'

// JWT Token Verification
const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    throw new Error(`Token ไม่ถูกต้อง: ${error.message}`)
  }
}

// Core JWT Middleware
// ฟังก์ชัน middleware หลักที่ inject user data เข้า context
export const jwtMiddleware = new Elysia()
  .derive(async ({ headers }) => {
    console.log('🔍 JWT Middleware: กำลังตรวจสอบ headers...', headers.authorization ? 'พบ Token' : 'ไม่พบ Token')
    
    // ตรวจสอบ Authorization header
    const authHeader = headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ JWT Middleware: ไม่พบ Bearer token ที่ถูกต้อง')
      return { user: null }
    }

    try {
      // แยกและตรวจสอบ token
      const token = authHeader.substring(7)
      console.log('🔓 JWT Middleware: กำลังตรวจสอบ token...')
      const decoded = await verifyToken(token)
      console.log('✅ JWT Middleware: ถอดรหัส token สำเร็จ:', { userId: decoded.userId, email: decoded.email })

      // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
      console.log('🔍 JWT Middleware: กำลังค้นหาผู้ใช้ในฐานข้อมูล ID:', decoded.userId)
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

      console.log('📋 JWT Middleware: ผลลัพธ์จากฐานข้อมูล:', user ? 'พบผู้ใช้' : 'ไม่พบผู้ใช้')
      
      if (!user) {
        console.log('❌ JWT Middleware: ไม่พบผู้ใช้ในฐานข้อมูล')
        return { user: null }
      }

      // **ENHANCEMENT**: Inject user.role เพื่อให้ง่ายต่อการเข้าถึง
      const userWithRole = {
        ...user,
        role: user.roles?.role_name || null
      }

      console.log('✅ JWT Middleware: ข้อมูลผู้ใช้พร้อมใช้งาน:', userWithRole)
      // Return user data สำหรับ Elysia context
      return { user: userWithRole }

    } catch (error) {
      console.error('❌ JWT Error:', error.message)
      return { user: null }
    }
  })

// Role-Based Access Control Guards
// ========================
// ใช้ "restrict to" pattern - กำหนดชัดเจนว่า role ไหนเข้าได้

// Restrict to: Authenticated users only (any role)
export const requireAuth = new Elysia()
  .use(jwtMiddleware)
  .guard({
    beforeHandle({ user, set }) {
      console.log('🔐 RequireAuth: กำลังตรวจสอบผู้ใช้...', user ? 'พบผู้ใช้' : 'ไม่พบผู้ใช้')
      if (!user) {
        console.log('❌ RequireAuth: ปฏิเสธการเข้าถึง - ไม่ได้ยืนยันตัวตน')
        set.status = 401
        return { 
          success: false, 
          message: 'จำเป็นต้องเข้าสู่ระบบ' 
        }
      }
      console.log('✅ RequireAuth: ยืนยันตัวตนผู้ใช้แล้ว กำลังดำเนินการต่อ...')
    }
  })

// Restrict to: Admin role ONLY
export const requireAdmin = new Elysia()
  .use(jwtMiddleware)
  .guard({
    beforeHandle({ user, set }) {
      console.log('🔐 RequireAdmin: กำลังตรวจสอบผู้ใช้...', user ? 'พบผู้ใช้' : 'ไม่พบผู้ใช้')
      if (!user) {
        console.log('❌ RequireAdmin: ปฏิเสธการเข้าถึง - ไม่ได้ยืนยันตัวตน')
        set.status = 401
        return { 
          success: false, 
          message: 'จำเป็นต้องเข้าสู่ระบบ' 
        }
      }
      // จำกัดเฉพาะ admin role เท่านั้น
      if (user?.role !== 'admin') {
        console.log('❌ RequireAdmin: ปฏิเสธการเข้าถึง - ไม่ใช่ admin')
        set.status = 403
        return { 
          success: false, 
          message: 'การเข้าถึงจำกัดเฉพาะผู้ดูแลระบบเท่านั้น' 
        }
      }
      console.log('✅ RequireAdmin: ยืนยันสิทธิ์ admin แล้ว กำลังดำเนินการต่อ...')
    }
  })

// Restrict to: Officer OR Admin roles
export const requireOfficer = new Elysia()
  .use(jwtMiddleware)
  .guard({
    beforeHandle({ user, set }) {
      console.log('🔐 RequireOfficer: กำลังตรวจสอบผู้ใช้...', user ? 'พบผู้ใช้' : 'ไม่พบผู้ใช้')
      if (!user) {
        console.log('❌ RequireOfficer: ปฏิเสธการเข้าถึง - ไม่ได้ยืนยันตัวตน')
        set.status = 401
        return { 
          success: false, 
          message: 'จำเป็นต้องเข้าสู่ระบบ' 
        }
      }
      // จำกัดเฉพาะ officer หรือ admin เท่านั้น
      const allowedRoles = ['officer', 'admin']
      if (!allowedRoles.includes(user?.role)) {
        console.log('❌ RequireOfficer: ปฏิเสธการเข้าถึง - role ไม่อยู่ในรายการที่อนุญาต:', allowedRoles)
        set.status = 403
        return { 
          success: false, 
          message: 'การเข้าถึงจำกัดเฉพาะเจ้าหน้าที่หรือผู้ดูแลระบบเท่านั้น' 
        }
      }
      console.log('✅ RequireOfficer: ยืนยันสิทธิ์แล้ว กำลังดำเนินการต่อ...')
    }
  })

// Restrict to: User, Officer, OR Admin roles (any authenticated user)
export const requireUser = new Elysia()
  .use(jwtMiddleware)
  .guard({
    beforeHandle({ user, set }) {
      console.log('🔐 RequireUser: กำลังตรวจสอบผู้ใช้...', user ? 'พบผู้ใช้' : 'ไม่พบผู้ใช้')
      if (!user) {
        console.log('❌ RequireUser: ปฏิเสธการเข้าถึง - ไม่ได้ยืนยันตัวตน')
        set.status = 401
        return { 
          success: false, 
          message: 'จำเป็นต้องเข้าสู่ระบบ' 
        }
      }
      // จำกัดเฉพาะ role ที่ถูกต้อง
      const allowedRoles = ['user', 'officer', 'admin']
      if (!allowedRoles.includes(user?.role)) {
        console.log('❌ RequireUser: ปฏิเสธการเข้าถึง - role ไม่ถูกต้อง')
        set.status = 403
        return { 
          success: false, 
          message: 'การเข้าถึงจำกัดเฉพาะผู้ใช้ที่มีสิทธิ์ถูกต้องเท่านั้น' 
        }
      }
      console.log('✅ RequireUser: ยืนยันสิทธิ์ผู้ใช้แล้ว กำลังดำเนินการต่อ...')
    }
  })

// Flexible role restriction helper
export const restrictTo = (...allowedRoles) => {
  return new Elysia()
    .use(jwtMiddleware)
    .guard({
      beforeHandle({ user, set }) {
        console.log(`🔐 RestrictTo [${allowedRoles.join(', ')}]: กำลังตรวจสอบผู้ใช้...`, user ? 'พบผู้ใช้' : 'ไม่พบผู้ใช้')
        
        if (!user) {
          console.log('❌ RestrictTo: ปฏิเสธการเข้าถึง - ไม่ได้ยืนยันตัวตน')
          set.status = 401
          return { 
            success: false, 
            message: 'จำเป็นต้องเข้าสู่ระบบ' 
          }
        }
        
        // ตรวจสอบว่า user role อยู่ในรายการที่อนุญาตหรือไม่
        if (!allowedRoles.includes(user?.role)) {
          console.log(`❌ RestrictTo: ปฏิเสธการเข้าถึง - role '${user?.role}' ไม่อยู่ในรายการที่อนุญาต: [${allowedRoles.join(', ')}]`)
          set.status = 403
          return { 
            success: false, 
            message: `การเข้าถึงจำกัดเฉพาะสิทธิ์: ${allowedRoles.join(', ')}` 
          }
        }
        
        console.log(`✅ RestrictTo: ยืนยันสิทธิ์ '${user?.role}' แล้ว กำลังดำเนินการต่อ...`)
      }
    })
}
