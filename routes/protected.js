// ===================================================================
// Protected Routes - APIs ที่ต้องการ JWT Authentication
// ===================================================================
// ไฟล์นี้จัดการ API ที่ต้องเข้าสู่ระบบ:
// - ใช้ JWT Middleware จาก ../middleware/jwt.js
// - แยก level การเข้าถึงตาม role: user/officer/admin
// ===================================================================

import { Elysia } from 'elysia'
import { requireAuth, requireUser, requireOfficer, requireAdmin, restrictTo } from '../middleware/jwt.js'

export const protectedRoutes = new Elysia({ prefix: '/protected' })

  // API ทดสอบง่ายๆ (ไม่ต้อง auth)
  .get('/test', () => {
    console.log('🧪 Public test route')
    return { 
      message: 'API ทำงานได้!!',
      timestamp: new Date().toISOString()
    }
  })

  // === Routes ที่ต้อง Authentication ===
  
  // User profile และ area (ใช้ requireUser middleware)
  .use(requireUser)
  .get('/user/profile', ({ user }) => {
    console.log('👤 Profile route accessed')
    console.log('👤 User data:', user)
    
    return {
      success: true,
      message: 'ข้อมูลโปรไฟล์ของคุณ',
      profile: user
    }
  })

  .get('/user/area', ({ user }) => {
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

// Officer Routes - ใช้ requireOfficer middleware
export const officerRoutes = new Elysia({ prefix: '/protected' })
  .use(requireOfficer)
  .get('/officer/area', ({ user }) => {
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

// Admin Routes - ใช้ requireAdmin middleware
export const adminRoutes = new Elysia({ prefix: '/protected' })
  .use(requireAdmin)
  .get('/admin/area', ({ user }) => {
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
