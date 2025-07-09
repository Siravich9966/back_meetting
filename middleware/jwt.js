// ===================================================================
// JWT Middleware สำหรับ Elysia Framework
// ===================================================================
// ไฟล์นี้จัดการการตรวจสอบ JWT Token และ Role-based Access:
// 
// Functions:
// - verifyToken()     - ตรวจสอบ JWT token ด้วย jsonwebtoken
// - jwtMiddleware     - Elysia middleware หลักสำหรับแปลง token เป็น user data
// - authenticate      - ใช้กับ route ที่ต้อง login (มี user หรือไม่)
// - restrictTo()      - ใช้กับ route ที่ต้องการ role เฉพาะ
// 
// Exports:
// - requireAuth       - ต้อง login (user, officer, admin ใช้ได้)
// - requireOfficer    - เจ้าหน้าที่ + admin เท่านั้น
// - requireAdmin      - admin เท่านั้น
// - requireUser       - user + officer + admin (เผื่อไว้)
// ===================================================================

import { Elysia } from 'elysia'
import { PrismaClient } from '@prisma/client'

// สร้าง Prisma client สำหรับ middleware
const prisma = new PrismaClient()

// ฟังก์ชันตรวจสอบ JWT Token
const verifyToken = async (token) => {
  try {
    const jwt = await import('jsonwebtoken')
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    throw error
  }
}

// JWT Middleware หลัก
export const jwtMiddleware = new Elysia()
  .derive(async ({ headers }) => {
    console.log('🚀 JWT Middleware started')
    
    // ตรวจสอบ Authorization header
    const authHeader = headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { user: null }
    }

    try {
      // แยกและตรวจสอบ token
      const token = authHeader.substring(7)
      const decoded = await verifyToken(token)
      
      console.log('🔍 Token decoded:', { userId: decoded.userId, email: decoded.email })

      // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
      const user = await prisma.users.findUnique({
        where: { user_id: decoded.userId },
        include: {
          roles: {
            select: {
              role_name: true,
              role_status: true
            }
          }
        }
      })

      if (!user) {
        console.log('❌ User not found')
        return { user: null }
      }

      if (user.roles?.role_status !== 'active') {
        console.log('❌ User role inactive')
        return { user: null }
      }

      // เตรียมข้อมูล user สำหรับ routes
      const userData = {
        user_id: user.user_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role_id: user.role_id,
        role_name: user.roles?.role_name,
        department: user.department
      }

      console.log('✅ User authenticated:', userData.email)
      return { user: userData }

    } catch (error) {
      console.error('JWT Error:', error.message)
      return { user: null }
    }
  })

// Middleware สำหรับ route ที่ต้อง authentication
export const authenticate = new Elysia()
  .use(jwtMiddleware)
  .guard(
    {
      beforeHandle({ user, set }) {
        if (!user) {
          set.status = 401
          return { 
            success: false,
            error: 'กรุณาเข้าสู่ระบบ' 
          }
        }
      }
    }
  )

// Middleware สำหรับตรวจสอบ role
export const restrictTo = (...allowedRoles) => {
  return new Elysia()
    .use(jwtMiddleware)
    .guard({
      beforeHandle({ user, set }) {
        if (!user) {
          set.status = 401
          return { 
            success: false,
            error: 'กรุณาเข้าสู่ระบบ' 
          }
        }
        
        if (!allowedRoles.includes(user.role_name)) {
          set.status = 403
          return { 
            success: false,
            error: 'คุณไม่มีสิทธิ์เข้าใช้งานส่วนนี้' 
          }
        }
      }
    })
}

// Middleware สำหรับ role เฉพาะ
export const requireAuth = authenticate
export const requireAdmin = new Elysia().use(authenticate).use(restrictTo('admin'))
export const requireOfficer = new Elysia().use(authenticate).use(restrictTo('officer', 'admin'))
export const requireUser = new Elysia().use(authenticate).use(restrictTo('user', 'officer', 'admin'))
