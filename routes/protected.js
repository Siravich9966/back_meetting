// ===================================================================
// Protected Routes - APIs ที่ต้องการ JWT Authentication
// ===================================================================
// ไฟล์นี้จัดการ API ที่ต้องเข้าสู่ระบบ:
// - ใช้ JWT Middleware จาก ../middleware/jwt.js
// - แยก level การเข้าถึงตาม role: user/officer/admin
// 
// Routes:
// PUBLIC (ไม่ต้อง auth):
//   GET /api/protected/test
// 
// USER + (ต้อง login):
//   GET /api/protected/profile
//   GET /api/protected/user-area
// 
// OFFICER + (เจ้าหน้าที่ + admin):
//   GET /api/protected/officer-area
//   GET /api/protected/pending-reservations
// 
// ADMIN ONLY (ผู้ดูแลระบบเท่านั้น):
//   GET /api/protected/admin-area
//   GET /api/protected/users
//   GET /api/protected/system-stats
// ===================================================================

import { Elysia } from 'elysia'
import { requireAuth, requireAdmin, requireOfficer } from '../middleware/jwt.js'

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
  .use(requireAuth)
  
  // API ดูโปรไฟล์ตัวเอง
  .get('/profile', ({ user }) => {
    console.log('👤 Profile accessed by:', user.email)
    return {
      success: true,
      message: 'ข้อมูลโปรไฟล์ของคุณ',
      profile: user
    }
  })

  // API สำหรับ User ทั่วไป
  .get('/user-area', ({ user }) => {
    return {
      success: true,
      message: `สวัสดี ${user.first_name} ${user.last_name}`,
      area: 'พื้นที่สำหรับผู้ใช้ทั่วไป',
      your_role: user.role_name,
      department: user.department
    }
  })

  // === Routes สำหรับ Officer เท่านั้น ===
  .use(requireOfficer)
  
  .get('/officer-area', ({ user }) => {
    return {
      success: true,
      message: `สวัสดี ${user.first_name} (เจ้าหน้าที่)`,
      area: 'พื้นที่สำหรับเจ้าหน้าที่',
      permissions: ['approve_reservations', 'manage_rooms'],
      department: user.department
    }
  })

  // API อนุมัติการจองห้อง (Officer/Admin เท่านั้น)
  .get('/pending-reservations', ({ user }) => {
    return {
      success: true,
      message: 'รายการจองที่รออนุมัติ',
      officer: user.first_name,
      reservations: [] // จะเติมข้อมูลจริงภายหลัง
    }
  })

  // === Routes สำหรับ Admin เท่านั้น ===
  .use(requireAdmin)
  
  .get('/admin-area', ({ user }) => {
    return {
      success: true,
      message: `สวัสดี ${user.first_name} (ผู้ดูแลระบบ)`,
      area: 'พื้นที่สำหรับผู้ดูแลระบบ',
      permissions: ['manage_all_users', 'manage_all_rooms', 'system_settings'],
      access_level: 'Super Admin'
    }
  })

  // API ดูรายชื่อผู้ใช้ทั้งหมด (Admin เท่านั้น)
  .get('/users', async ({ user, db }) => {
    console.log('👑 Admin viewing all users:', user.email)
    
    const users = await db.users.findMany({
      select: {
        user_id: true,
        email: true,
        first_name: true,
        last_name: true,
        role_id: true,
        department: true,
        created_at: true,
        roles: {
          select: {
            role_name: true,
            role_status: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })

    return {
      success: true,
      message: 'รายชื่อผู้ใช้ทั้งหมด',
      total_users: users.length,
      users: users,
      accessed_by: user.first_name
    }
  })

  // API จัดการระบบ (Admin เท่านั้น)
  .get('/system-stats', ({ user }) => {
    return {
      success: true,
      message: 'สถิติระบบ',
      stats: {
        total_users: '...',
        total_rooms: '...',
        total_reservations: '...',
        active_sessions: '...'
      },
      accessed_by: user.first_name
    }
  })
