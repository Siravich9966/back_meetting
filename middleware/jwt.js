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
    throw new Error(`Invalid token: ${error.message}`)
  }
}

// Core JWT Middleware
// ฟังก์ชัน middleware หลักที่ inject user data เข้า context
export const jwtMiddleware = new Elysia()
  .derive(async ({ headers }) => {
    console.log('🔍 JWT Middleware: Checking headers...', headers.authorization ? 'Token found' : 'No token')
    
    // ตรวจสอบ Authorization header
    const authHeader = headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ JWT Middleware: No valid Bearer token')
      return { user: null }
    }

    try {
      // แยกและตรวจสอบ token
      const token = authHeader.substring(7)
      console.log('🔓 JWT Middleware: Verifying token...')
      const decoded = await verifyToken(token)
      console.log('✅ JWT Middleware: Token decoded:', { userId: decoded.userId, email: decoded.email })

      // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
      console.log('🔍 JWT Middleware: Querying database for user ID:', decoded.userId)
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

      console.log('📋 JWT Middleware: Database result:', user ? 'User found' : 'User not found')
      
      if (!user) {
        console.log('❌ JWT Middleware: User not found in database')
        return { user: null }
      }

      // **ENHANCEMENT**: Inject user.role เพื่อให้ง่ายต่อการเข้าถึง
      const userWithRole = {
        ...user,
        role: user.roles?.role_name || null
      }

      console.log('✅ JWT Middleware: User data ready:', userWithRole)
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
      console.log('🔐 RequireAuth: Checking user...', user ? 'User exists' : 'No user')
      if (!user) {
        console.log('❌ RequireAuth: Blocking request - no authentication')
        set.status = 401
        return { 
          success: false, 
          message: 'Authentication required' 
        }
      }
      console.log('✅ RequireAuth: User authenticated, proceeding...')
    }
  })

// Restrict to: Admin role ONLY
export const requireAdmin = new Elysia()
  .use(jwtMiddleware)
  .guard({
    beforeHandle({ user, set }) {
      console.log('🔐 RequireAdmin: Checking user...', user ? 'User exists' : 'No user')
      if (!user) {
        console.log('❌ RequireAdmin: Blocking request - no authentication')
        set.status = 401
        return { 
          success: false, 
          message: 'Authentication required' 
        }
      }
      // Restrict to admin role only
      if (user?.role !== 'admin') {
        console.log('❌ RequireAdmin: Blocking request - not admin role')
        set.status = 403
        return { 
          success: false, 
          message: 'Access restricted to admin role only' 
        }
      }
      console.log('✅ RequireAdmin: Admin role verified, proceeding...')
    }
  })

// Restrict to: Officer OR Admin roles
export const requireOfficer = new Elysia()
  .use(jwtMiddleware)
  .guard({
    beforeHandle({ user, set }) {
      console.log('🔐 RequireOfficer: Checking user...', user ? 'User exists' : 'No user')
      if (!user) {
        console.log('❌ RequireOfficer: Blocking request - no authentication')
        set.status = 401
        return { 
          success: false, 
          message: 'Authentication required' 
        }
      }
      // Restrict to officer or admin roles only
      const allowedRoles = ['officer', 'admin']
      if (!allowedRoles.includes(user?.role)) {
        console.log('❌ RequireOfficer: Blocking request - role not in allowed list:', allowedRoles)
        set.status = 403
        return { 
          success: false, 
          message: 'Access restricted to officer or admin roles only' 
        }
      }
      console.log('✅ RequireOfficer: Role verified, proceeding...')
    }
  })

// Restrict to: User, Officer, OR Admin roles (any authenticated user)
export const requireUser = new Elysia()
  .use(jwtMiddleware)
  .guard({
    beforeHandle({ user, set }) {
      console.log('🔐 RequireUser: Checking user...', user ? 'User exists' : 'No user')
      if (!user) {
        console.log('❌ RequireUser: Blocking request - no authentication')
        set.status = 401
        return { 
          success: false, 
          message: 'Authentication required' 
        }
      }
      // Restrict to any valid role
      const allowedRoles = ['user', 'officer', 'admin']
      if (!allowedRoles.includes(user?.role)) {
        console.log('❌ RequireUser: Blocking request - invalid role')
        set.status = 403
        return { 
          success: false, 
          message: 'Access restricted to valid user roles only' 
        }
      }
      console.log('✅ RequireUser: Valid role verified, proceeding...')
    }
  })

// Flexible role restriction helper
export const restrictTo = (...allowedRoles) => {
  return new Elysia()
    .use(jwtMiddleware)
    .guard({
      beforeHandle({ user, set }) {
        console.log(`🔐 RestrictTo [${allowedRoles.join(', ')}]: Checking user...`, user ? 'User exists' : 'No user')
        
        if (!user) {
          console.log('❌ RestrictTo: Blocking request - no authentication')
          set.status = 401
          return { 
            success: false, 
            message: 'Authentication required' 
          }
        }
        
        // Check if user role is in allowed roles
        if (!allowedRoles.includes(user?.role)) {
          console.log(`❌ RestrictTo: Blocking request - role '${user?.role}' not in allowed list: [${allowedRoles.join(', ')}]`)
          set.status = 403
          return { 
            success: false, 
            message: `Access restricted to roles: ${allowedRoles.join(', ')}` 
          }
        }
        
        console.log(`✅ RestrictTo: Role '${user?.role}' verified, proceeding...`)
      }
    })
}
