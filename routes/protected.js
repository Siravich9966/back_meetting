// ===================================================================
// Protected Routes - APIs ที่ต้องการ JWT Authentication
// ===================================================================
// ไฟล์นี้จัดการ API ที่ต้องเข้าสู่ระบบ:
// - ใช้ Auth Middleware จาก ../middleware/auth.js
// - แยก level การเข้าถึงตาม role: user/officer/admin
// ===================================================================

import { Elysia } from 'elysia'
import { authMiddleware, isAdmin, isOfficer, isUser } from '../middleware/index.js'

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
export const adminRoutes = new Elysia({ prefix: '/protected' })
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
