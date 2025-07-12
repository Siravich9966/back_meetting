// ===================================================================
// Protected Routes - APIs ที่ต้องการ JWT Authentication
// ===================================================================
// ไฟล์นี้จัดการ API ที่ต้องเข้าสู่ระบบ:
// - ใช้ JWT Middleware จาก ../middleware/jwt.js
// - แยก level การเข้าถึงตาม role: user/officer/admin
// ===================================================================

import { Elysia } from 'elysia'
import { jwtMiddleware } from '../middleware/jwt.js'

export const protectedRoutes = new Elysia({ prefix: '/protected' })

  // API ทดสอบง่ายๆ (ไม่ต้อง auth)
  .get('/test', () => {
    console.log('🧪 Public test route')
    return { 
      message: 'API ทำงานได้!!',
      timestamp: new Date().toISOString()
    }
  })

  // === User Routes (ต้องมี user, officer, หรือ admin role) ===
  .group('/user', app =>
    app
      .derive(async ({ headers }) => {
        console.log('🔍 User Group: Checking headers...', headers.authorization ? 'Token found' : 'No token')
        
        // ตรวจสอบ Authorization header
        const authHeader = headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          console.log('❌ User Group: No valid Bearer token')
          return { user: null }
        }

        try {
          // แยกและตรวจสอบ token
          const token = authHeader.substring(7)
          console.log('🔓 User Group: Verifying token...')
          
          const jwt = await import('jsonwebtoken')
          const decoded = jwt.default.verify(token, process.env.JWT_SECRET)
          console.log('✅ User Group: Token decoded:', { userId: decoded.userId, email: decoded.email })

          // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
          const prisma = await import('../lib/prisma.js')
          const user = await prisma.default.users.findUnique({
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
            console.log('❌ User Group: User not found in database')
            return { user: null }
          }

          // Inject user.role
          const userWithRole = {
            ...user,
            role: user.roles?.role_name || null
          }

          console.log('✅ User Group: User data ready:', userWithRole)
          return { user: userWithRole }

        } catch (error) {
          console.error('❌ User Group JWT Error:', error.message)
          return { user: null }
        }
      })
      .guard({
        beforeHandle({ user, set }) {
          console.log('🔐 User Guard: Checking user...', user ? 'User exists' : 'No user')
          
          if (!user) {
            console.log('❌ User Guard: Blocking request - no authentication')
            set.status = 401
            return { 
              success: false, 
              message: 'ไม่มีสิทธิ์เข้าถึงข้อมูลนี้' 
            }
          }
          
          const allowedRoles = ['user', 'officer', 'admin']
          if (!allowedRoles.includes(user?.role)) {
            console.log('❌ User Guard: Blocking request - invalid role:', user?.role)
            set.status = 403
            return { 
              success: false, 
              message: 'Access restricted to valid user roles only' 
            }
          }
          
          console.log('✅ User Guard: Access granted for role:', user?.role)
        }
      })
      .get('/profile', ({ user }) => {
        console.log('👤 Profile route accessed')
        console.log('👤 User data:', user)
        
        return {
          success: true,
          message: 'ข้อมูลโปรไฟล์ของคุณ',
          profile: user
        }
      })
      .get('/area', ({ user }) => {
        console.log('👤 User area route accessed')
        console.log('👤 User data:', user)
        
        return {
          success: true,
          message: `สวัสดี ${user?.first_name || 'Unknown'} ${user?.last_name || ''}`,
          area: 'พื้นที่สำหรับผู้ใช้ทั่วไป',
          your_role: user?.role || 'unknown',
          user_data: user
        }
      })
  )

// === Officer Routes (ต้องมี officer หรือ admin role) ===
export const officerRoutes = new Elysia({ prefix: '/protected' })
  .group('/officer', app =>
    app
      .use(jwtMiddleware)
      .guard({
        beforeHandle({ user, set }) {
          console.log('🔐 Officer Guard: Checking user...', user ? 'User exists' : 'No user')
          
          if (!user) {
            console.log('❌ Officer Guard: Blocking request - no authentication')
            set.status = 401
            return { 
              success: false, 
              message: 'ไม่มีสิทธิ์เข้าถึงข้อมูลนี้' 
            }
          }
          
          const allowedRoles = ['officer', 'admin']
          if (!allowedRoles.includes(user?.role)) {
            console.log('❌ Officer Guard: Blocking request - invalid role:', user?.role)
            set.status = 403
            return { 
              success: false, 
              message: 'Access restricted to officer or admin roles only' 
            }
          }
          
          console.log('✅ Officer Guard: Access granted for role:', user?.role)
        }
      })
      .get('/area', ({ user }) => {
        console.log('👮 Officer area route accessed')
        console.log('👮 User data:', user)
        
        return {
          success: true,
          message: `สวัสดี ${user?.first_name || 'Unknown'} ${user?.last_name || ''} (เจ้าหน้าที่)`,
          area: 'พื้นที่สำหรับเจ้าหน้าที่',
          permissions: ['approve_reservations', 'manage_rooms'],
          your_role: user?.role || 'unknown',
          user_data: user
        }
      })
  )

// === Admin Routes (ต้องมี admin role เท่านั้น) ===
export const adminRoutes = new Elysia({ prefix: '/protected' })
  .group('/admin', app =>
    app
      .use(jwtMiddleware)
      .guard({
        beforeHandle({ user, set }) {
          console.log('🔐 Admin Guard: Checking user...', user ? 'User exists' : 'No user')
          
          if (!user) {
            console.log('❌ Admin Guard: Blocking request - no authentication')
            set.status = 401
            return { 
              success: false, 
              message: 'ไม่มีสิทธิ์เข้าถึงข้อมูลนี้' 
            }
          }
          
          if (user?.role !== 'admin') {
            console.log('❌ Admin Guard: Blocking request - not admin role:', user?.role)
            set.status = 403
            return { 
              success: false, 
              message: 'Access restricted to admin role only' 
            }
          }
          
          console.log('✅ Admin Guard: Access granted for role:', user?.role)
        }
      })
      .get('/area', ({ user }) => {
        console.log('👑 Admin area route accessed')
        console.log('👑 User data:', user)
        
        return {
          success: true,
          message: `สวัสดี ${user?.first_name || 'Unknown'} ${user?.last_name || ''} (ผู้ดูแลระบบ)`,
          area: 'พื้นที่สำหรับผู้ดูแลระบบ',
          permissions: ['manage_all_users', 'manage_all_rooms', 'system_settings'],
          access_level: 'Super Admin',
          user_data: user
        }
      })
  )
