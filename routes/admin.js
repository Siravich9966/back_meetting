// ===================================================================
// Admin API - New 3-Table System
// ===================================================================

import { Elysia } from 'elysia'
import prisma from '../lib/prisma.js'
import { authMiddleware, isAdmin } from '../middleware/index.js'

export const adminRoutes = new Elysia({ prefix: '/protected/admin' })
  // ============================
  // 📊 ดูสถิติผู้ใช้ทั้ง 3 tables
  // ============================
  .get('/stats', async ({ request, set }) => {
    // ตรวจสอบสิทธิ์ admin
    const user = await authMiddleware(request, set)
    if (user.success === false) return user
    
    if (!isAdmin(user)) {
      set.status = 403
      return {
        success: false,
        message: 'การเข้าถึงจำกัดเฉพาะผู้ดูแลระบบเท่านั้น'
      }
    }

    try {
      console.log('📊 Admin: ดูสถิติผู้ใช้งาน (ทุก 4 tables)')
      
      // นับจำนวนใน users table
      const userCount = await prisma.users.count()
      
      // นับจำนวนใน officer table
      const officerCount = await prisma.officer.count()
      
      // นับจำนวนใน admin table
      const adminCount = await prisma.admin.count()
      
      // นับจำนวนใน executive table - ที่ admin เห็นได้ทั้งหมด
      const executiveCount = await prisma.executive.count()
      
      return {
        success: true,
        message: 'Admin เห็นข้อมูลทุกอย่าง (รวม executives)',
        stats: {
          total: userCount + officerCount + adminCount + executiveCount,
          users: userCount,
          officers: officerCount,
          admins: adminCount,
          executives: executiveCount
        }
      }
      
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาด:', error)
      set.status = 500
      return { 
        success: false, 
      }
    }
  })
  
  // ============================
  // 👁️ ดูข้อมูล Executive ทั้งหมด (Admin เห็นได้ทุกอย่าง)
  // ============================
  .get('/executives', async ({ request, set }) => {
    // ตรวจสอบสิทธิ์ admin
    const user = await authMiddleware(request, set)
    if (user.success === false) return user
    
    if (!isAdmin(user)) {
      set.status = 403
      return {
        success: false,
        message: 'การเข้าถึงจำกัดเฉพาะผู้ดูแลระบบเท่านั้น'
      }
    }

    try {
      console.log('👁️ Admin: ดูข้อมูล Executive ทั้งหมด')
      
      const executives = await prisma.executive.findMany({
        select: {
          executive_id: true,
          role_id: true,
          first_name: true,
          last_name: true,
          email: true,
          position: true,
          department: true,
          citizen_id: true,
          zip_code: true,
          created_at: true
        }
      })
      
      return {
        success: true,
        message: `Admin เห็นข้อมูล Executive ทั้งหมด (${executives.length} คน)`,
        executives
      }
      
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาด:', error)
      set.status = 500
      return { 
        success: false, 
        message: 'เกิดข้อผิดพลาดในการดูข้อมูล Executive' 
      }
    }
  })
  
  // ============================
  // 👁️ ดูข้อมูลผู้ใช้ทั้งหมด (Admin เห็นได้ทุกตาราง)
  // ============================
  .get('/all-users', async ({ request, set }) => {
    // ตรวจสอบสิทธิ์ admin
    const user = await authMiddleware(request, set)
    if (user.success === false) return user
    
    if (!isAdmin(user)) {
      set.status = 403
      return {
        success: false,
        message: 'การเข้าถึงจำกัดเฉพาะผู้ดูแลระบบเท่านั้น'
      }
    }

    try {
      console.log('👁️ Admin: ดูข้อมูลผู้ใช้ทั้งหมดจาก 4 tables')
      
      const [users, officers, admins, executives] = await Promise.all([
        prisma.users.findMany({
          select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            position: true,
            department: true,
            created_at: true
          }
        }),
        prisma.officer.findMany({
          select: {
            officer_id: true,
            first_name: true,
            last_name: true,
            email: true,
            position: true,
            department: true,
            created_at: true
          }
        }),
        prisma.admin.findMany({
          select: {
            admin_id: true,
            first_name: true,
            last_name: true,
            email: true,
            position: true,
            department: true,
            created_at: true
          }
        }),
        prisma.executive.findMany({
          select: {
            executive_id: true,
            first_name: true,
            last_name: true,
            email: true,
            position: true,
            department: true,
            created_at: true
          }
        })
      ])
      
      return {
        success: true,
        message: `Admin เห็นข้อมูลทุกคน จาก 4 tables`,
        data: {
          users: users.map(u => ({...u, role: 'user'})),
          officers: officers.map(o => ({...o, role: 'officer'})),
          admins: admins.map(a => ({...a, role: 'admin'})),
          executives: executives.map(e => ({...e, role: 'executive'}))
        },
        summary: {
          total: users.length + officers.length + admins.length + executives.length,
          users: users.length,
          officers: officers.length,
          admins: admins.length,
          executives: executives.length
        }
      }
      
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาด:', error)
      set.status = 500
      return { 
        success: false, 
        message: 'เกิดข้อผิดพลาดในการดูข้อมูลผู้ใช้' 
      }
    }
  })
  
  // ============================
  // 👆 เปลี่ยน User → Officer
  // ============================
  .post('/promote/user-to-officer', async ({ request, body, set }) => {
    // ตรวจสอบสิทธิ์ admin
    const user = await authMiddleware(request, set)
    if (user.success === false) return user
    
    if (!isAdmin(user)) {
      set.status = 403
      return {
        success: false,
        message: 'การเข้าถึงจำกัดเฉพาะผู้ดูแลระบบเท่านั้น'
      }
    }

    try {
      console.log('👆 Admin: เปลี่ยน User → Officer')
      
      if (!body.email) {
        set.status = 400
        return { 
          success: false, 
          message: 'กรุณาระบุอีเมล' 
        }
      }
      
      // Simple promotion logic - แทนที่ role-transfer function
      const user = await prisma.users.findUnique({
        where: { email: body.email }
      })
      
      if (!user) {
        set.status = 404
        return {
          success: false,
          message: `ไม่พบ user: ${body.email}`
        }
      }
      
      // ตรวจสอบว่ามี officer ที่ใช้อีเมลนี้แล้วหรือไม่
      const existingOfficer = await prisma.officer.findUnique({
        where: { email: body.email }
      })
      
      if (existingOfficer) {
        set.status = 409
        return {
          success: false,
          message: `มี officer ที่ใช้อีเมลนี้แล้ว: ${body.email}`
        }
      }
      
      // สร้าง officer ใหม่
      await prisma.officer.create({
        data: {
          role_id: 2, // officer role
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          password: user.password,
          citizen_id: user.citizen_id,
          position: user.position,
          department: user.department,
          zip_code: user.zip_code
        }
      })
      
      // ลบ user เดิม
      await prisma.users.delete({
        where: { email: body.email }
      })
      
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาด:', error)
      set.status = 500
      return { 
        success: false, 
        message: 'เกิดข้อผิดพลาดในการเปลี่ยน role' 
      }
    }
  })
  
  // ============================
  // 👆 เปลี่ยน Officer → Admin
  // ============================
  .post('/promote/officer-to-admin', async ({ request, body, set }) => {
    // ตรวจสอบสิทธิ์ admin
    const user = await authMiddleware(request, set)
    if (user.success === false) return user
    
    if (!isAdmin(user)) {
      set.status = 403
      return {
        success: false,
        message: 'การเข้าถึงจำกัดเฉพาะผู้ดูแลระบบเท่านั้น'
      }
    }

    try {
      console.log('👆 Admin: เปลี่ยน Officer → Admin')
      
      if (!body.email) {
        set.status = 400
        return { 
          success: false, 
          message: 'กรุณาระบุอีเมล' 
        }
      }
      
      // Simple promotion logic - แทนที่ role-transfer function  
      const officer = await prisma.officer.findUnique({
        where: { email: body.email }
      })
      
      if (!officer) {
        set.status = 404
        return {
          success: false,
          message: `ไม่พบ officer: ${body.email}`
        }
      }
      
      // ตรวจสอบว่ามี admin ที่ใช้อีเมลนี้แล้วหรือไม่
      const existingAdmin = await prisma.admin.findUnique({
        where: { email: body.email }
      })
      
      if (existingAdmin) {
        set.status = 409
        return {
          success: false,
          message: `มี admin ที่ใช้อีเมลนี้แล้ว: ${body.email}`
        }
      }
      
      // สร้าง admin ใหม่
      await prisma.admin.create({
        data: {
          role_id: 1, // admin role
          first_name: officer.first_name,
          last_name: officer.last_name,
          email: officer.email,
          password: officer.password,
          citizen_id: officer.citizen_id,
          position: officer.position,
          department: officer.department,
          zip_code: officer.zip_code
        }
      })
      
      // ลบ officer เดิม
      await prisma.officer.delete({
        where: { email: body.email }
      })
      
      return {
        success: true,
        message: `เปลี่ยน ${body.email} เป็น Admin สำเร็จ`
      }
      
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาด:', error)
      set.status = 500
      return { 
        success: false, 
        message: 'เกิดข้อผิดพลาดในการเปลี่ยน role' 
      }
    }
  })

export default adminRoutes
