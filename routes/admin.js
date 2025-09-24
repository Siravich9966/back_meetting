// ===================================================================
// Admin API - New 3-Table System
// ===================================================================

import { Elysia } from 'elysia'
import prisma from '../lib/prisma.js'
import { authMiddleware, isAdmin } from '../middleware/index.js'

export const adminRoutes = new Elysia({ prefix: '/protected/admin' })
  
  // ============================
  // 👥 ดูรายการผู้ใช้ทั้งหมด (สำหรับหน้าจัดการผู้ใช้)
  // ============================
  .get('/users', async ({ request, set }) => {
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
      console.log('👥 Admin: ดูรายการผู้ใช้ทั้งหมด')
      
      // ดึงข้อมูลจากทุก table พร้อม address fields
      const [users, officers, executives, admins] = await Promise.all([
        prisma.users.findMany({
          select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            citizen_id: true,
            position: true,
            department: true,
            profile_image: true,
            province_id: true,
            district_id: true,
            subdistrict_id: true,
            zip_code: true,
            created_at: true
          }
        }),
        prisma.officer.findMany({
          select: {
            officer_id: true,
            first_name: true,
            last_name: true,
            email: true,
            citizen_id: true,
            position: true,
            department: true,
            profile_image: true,
            province_id: true,
            district_id: true,
            subdistrict_id: true,
            zip_code: true,
            created_at: true
          }
        }),
        prisma.executive.findMany({
          select: {
            executive_id: true,
            first_name: true,
            last_name: true,
            email: true,
            citizen_id: true,
            position: true,
            department: true,
            profile_image: true,
            province_id: true,
            district_id: true,
            subdistrict_id: true,
            zip_code: true,
            created_at: true
          }
        }),
        prisma.admin.findMany({
          select: {
            admin_id: true,
            first_name: true,
            last_name: true,
            email: true,
            citizen_id: true,
            position: true,
            department: true,
            profile_image: true,
            province_id: true,
            district_id: true,
            subdistrict_id: true,
            zip_code: true,
            created_at: true
          }
        })
      ])

      // รวมข้อมูลและเพิ่ม role
      const allUsers = [
        ...users.map(u => ({ ...u, role: 'user' })),
        ...officers.map(o => ({ ...o, role: 'officer' })),
        ...executives.map(e => ({ ...e, role: 'executive' })),
        ...admins.map(a => ({ ...a, role: 'admin' }))
      ]

      // เรียงตาม created_at จากใหม่ไปเก่า
      allUsers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      
      return {
        success: true,
        message: `ดึงรายการผู้ใช้ทั้งหมด (${allUsers.length} คน)`,
        data: allUsers
      }
      
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาดในการดึงรายการผู้ใช้:', error)
      set.status = 500
      return { 
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงรายการผู้ใช้',
        error: error.message
      }
    }
  })
  
  // ============================
  // ➕ เพิ่มผู้ใช้ใหม่ (สำหรับหน้าจัดการผู้ใช้)
  // ============================
  .post('/users', async ({ request, set }) => {
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
      const { first_name, last_name, email, citizen_id, position, department, role, password, province_id, district_id, subdistrict_id, zip_code } = await request.json()
      
      console.log(`➕ Admin: เพิ่มผู้ใช้ใหม่ ${first_name} ${last_name} (${role})`)
      console.log(`📍 ข้อมูลที่อยู่: จังหวัด=${province_id}, อำเภอ=${district_id}, ตำบล=${subdistrict_id}, รหัสไปรษณีย์=${zip_code}`)
      
      // Hash password
      const hashedPassword = await Bun.password.hash(password)
      
      // ตรวจสอบอีเมลซ้ำ
      const existingEmail = await Promise.all([
        prisma.users.findFirst({ where: { email } }),
        prisma.officer.findFirst({ where: { email } }),
        prisma.executive.findFirst({ where: { email } }),
        prisma.admin.findFirst({ where: { email } })
      ])
      
      if (existingEmail.some(result => result !== null)) {
        set.status = 400
        return {
          success: false,
          message: 'อีเมลนี้มีผู้ใช้แล้ว',
          error: 'email already exists'
        }
      }
      
      // ตรวจสอบเลขบัตรประชาชนซ้ำ
      const existingCitizenId = await Promise.all([
        prisma.users.findFirst({ where: { citizen_id } }),
        prisma.officer.findFirst({ where: { citizen_id } }),
        prisma.executive.findFirst({ where: { citizen_id } }),
        prisma.admin.findFirst({ where: { citizen_id } })
      ])
      
      if (existingCitizenId.some(result => result !== null)) {
        set.status = 400
        return {
          success: false,
          message: 'เลขบัตรประชาชนนี้มีผู้ใช้แล้ว',
          error: 'citizen_id already exists'
        }
      }

      let newUser
      
      // สร้างผู้ใช้ใน table ที่เหมาะสมตาม role
      switch(role) {
        case 'user':
          newUser = await prisma.users.create({
            data: {
              role_id: 1, // role_id สำหรับ user
              first_name,
              last_name,
              email,
              citizen_id,
              position: position || null,
              department: department || null,
              password: hashedPassword, // ใช้ password แทน password_hash
              // Address fields
              province_id: province_id ? parseInt(province_id) : null,
              district_id: district_id ? parseInt(district_id) : null,
              subdistrict_id: subdistrict_id ? parseInt(subdistrict_id) : null,
              zip_code: zip_code ? parseInt(zip_code) : null,
              created_at: new Date()
            }
          })
          break
          
        case 'officer':
          newUser = await prisma.officer.create({
            data: {
              role_id: 2, // role_id สำหรับ officer
              first_name,
              last_name,
              email,
              citizen_id,
              position: position || 'เจ้าหน้าที่',
              department: department || 'ไม่ระบุ',
              password: hashedPassword, // ใช้ password แทน password_hash
              // Address fields
              province_id: province_id ? parseInt(province_id) : null,
              district_id: district_id ? parseInt(district_id) : null,
              subdistrict_id: subdistrict_id ? parseInt(subdistrict_id) : null,
              zip_code: zip_code ? parseInt(zip_code) : null,
              created_at: new Date()
            }
          })
          break
          
        case 'executive':
          newUser = await prisma.executive.create({
            data: {
              role_id: 3, // role_id สำหรับ executive
              first_name,
              last_name,
              email,
              citizen_id,
              position: position || 'ผู้บริหาร',
              department: department || 'ไม่ระบุ',
              password: hashedPassword, // ใช้ password แทน password_hash
              // Address fields
              province_id: province_id ? parseInt(province_id) : null,
              district_id: district_id ? parseInt(district_id) : null,
              subdistrict_id: subdistrict_id ? parseInt(subdistrict_id) : null,
              zip_code: zip_code ? parseInt(zip_code) : null,
              created_at: new Date()
            }
          })
          break
          
        case 'admin':
          newUser = await prisma.admin.create({
            data: {
              role_id: 4, // role_id สำหรับ admin
              first_name,
              last_name,
              email,
              citizen_id,
              position: position || 'ผู้ดูแลระบบ',
              department: department || 'สำนักงานอธิการบดี',
              password: hashedPassword, // ใช้ password แทน password_hash
              // Address fields
              province_id: province_id ? parseInt(province_id) : null,
              district_id: district_id ? parseInt(district_id) : null,
              subdistrict_id: subdistrict_id ? parseInt(subdistrict_id) : null,
              zip_code: zip_code ? parseInt(zip_code) : null,
              created_at: new Date()
            }
          })
          break
          
        default:
          throw new Error('Invalid role specified')
      }
      
      return {
        success: true,
        message: `เพิ่มผู้ใช้ ${role} สำเร็จ`,
        data: { ...newUser, role }
      }
      
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาดในการเพิ่มผู้ใช้:', error)
      set.status = 500
      return { 
        success: false,
        message: 'เกิดข้อผิดพลาดในการเพิ่มผู้ใช้',
        error: error.message
      }
    }
  })
  
  // ============================
  // ✏️ แก้ไขข้อมูลผู้ใช้ (สำหรับหน้าจัดการผู้ใช้)
  // ============================
  .put('/users/:userId', async ({ request, set, params }) => {
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
      const { userId } = params
      const { first_name, last_name, email, citizen_id, department, originalRole, zip_code, province_id, district_id, subdistrict_id } = await request.json()
      
      console.log(`✏️ Admin: แก้ไขข้อมูลผู้ใช้ ID=${userId}, Role=${originalRole}`)
      
      // ตรวจสอบอีเมลซ้ำ (ยกเว้นตัวเอง)
      const existingEmail = await Promise.all([
        prisma.users.findFirst({ where: { email, NOT: { user_id: originalRole === 'user' ? parseInt(userId) : undefined } } }),
        prisma.officer.findFirst({ where: { email, NOT: { officer_id: originalRole === 'officer' ? parseInt(userId) : undefined } } }),
        prisma.executive.findFirst({ where: { email, NOT: { executive_id: originalRole === 'executive' ? parseInt(userId) : undefined } } }),
        prisma.admin.findFirst({ where: { email, NOT: { admin_id: originalRole === 'admin' ? parseInt(userId) : undefined } } })
      ])
      
      if (existingEmail.some(result => result !== null)) {
        set.status = 400
        return {
          success: false,
          message: 'อีเมลนี้มีผู้ใช้อื่นใช้แล้ว',
          error: 'email already exists'
        }
      }
      
      // ตรวจสอบเลขบัตรประชาชนซ้ำ (ยกเว้นตัวเอง)
      const existingCitizenId = await Promise.all([
        prisma.users.findFirst({ where: { citizen_id, NOT: { user_id: originalRole === 'user' ? parseInt(userId) : undefined } } }),
        prisma.officer.findFirst({ where: { citizen_id, NOT: { officer_id: originalRole === 'officer' ? parseInt(userId) : undefined } } }),
        prisma.executive.findFirst({ where: { citizen_id, NOT: { executive_id: originalRole === 'executive' ? parseInt(userId) : undefined } } }),
        prisma.admin.findFirst({ where: { citizen_id, NOT: { admin_id: originalRole === 'admin' ? parseInt(userId) : undefined } } })
      ])
      
      if (existingCitizenId.some(result => result !== null)) {
        set.status = 400
        return {
          success: false,
          message: 'เลขบัตรประชาชนนี้มีผู้ใช้อื่นใช้แล้ว',
          error: 'citizen_id already exists'
        }
      }

      let updatedUser
      
      // แก้ไขข้อมูลใน table เดิม (ไม่เปลี่ยน role)
      switch(originalRole) {
          case 'user':
            updatedUser = await prisma.users.update({
              where: { user_id: parseInt(userId) },
              data: {
                first_name,
                last_name,
                email,
                citizen_id,
                department: department || 'ไม่ระบุ',
                zip_code: zip_code ? parseInt(zip_code, 10) : null,
                province_id: province_id ? parseInt(province_id, 10) : null,
                district_id: district_id ? parseInt(district_id, 10) : null,
                subdistrict_id: subdistrict_id ? parseInt(subdistrict_id, 10) : null
              }
            })
            break
          case 'officer':
            updatedUser = await prisma.officer.update({
              where: { officer_id: parseInt(userId) },
              data: {
                first_name,
                last_name,
                email,
                citizen_id,
                department: department || 'ไม่ระบุ',
                zip_code: zip_code ? parseInt(zip_code, 10) : null,
                province_id: province_id ? parseInt(province_id, 10) : null,
                district_id: district_id ? parseInt(district_id, 10) : null,
                subdistrict_id: subdistrict_id ? parseInt(subdistrict_id, 10) : null
              }
            })
            break
          case 'executive':
            updatedUser = await prisma.executive.update({
              where: { executive_id: parseInt(userId) },
              data: {
                first_name,
                last_name,
                email,
                citizen_id,
                department: department || 'ไม่ระบุ',
                zip_code: zip_code ? parseInt(zip_code, 10) : null,
                province_id: province_id ? parseInt(province_id, 10) : null,
                district_id: district_id ? parseInt(district_id, 10) : null,
                subdistrict_id: subdistrict_id ? parseInt(subdistrict_id, 10) : null
              }
            })
            break
          case 'admin':
            updatedUser = await prisma.admin.update({
              where: { admin_id: parseInt(userId) },
              data: {
                first_name,
                last_name,
                email,
                citizen_id,
                department: department || 'ไม่ระบุ',
                zip_code: zip_code ? parseInt(zip_code, 10) : null,
                province_id: province_id ? parseInt(province_id, 10) : null,
                district_id: district_id ? parseInt(district_id, 10) : null,
                subdistrict_id: subdistrict_id ? parseInt(subdistrict_id, 10) : null
              }
            })
            break
        }
      
      return {
        success: true,
        message: `แก้ไขข้อมูลผู้ใช้สำเร็จ`,
        data: { ...updatedUser, role: originalRole }
      }
      
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาดในการแก้ไขผู้ใช้:', error)
      set.status = 500
      return { 
        success: false,
        message: 'เกิดข้อผิดพลาดในการแก้ไขผู้ใช้',
        error: error.message
      }
    }
  })
  
  // ============================
  // 🗑️ ลบผู้ใช้ (สำหรับหน้าจัดการผู้ใช้)
  // ============================
  .delete('/users/:userId', async ({ request, set, params }) => {
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
      const { userId } = params
      const body = await request.json()
      const { role } = body

      console.log(`🗑️ Admin: ลบผู้ใช้ ID=${userId}, Role=${role}`)
      
      let deleteResult
      
      // ลบจาก table ที่ถูกต้องตาม role
      switch(role) {
        case 'user':
          // ลบ reservations ที่เชื่อมโยงก่อน (Cascade Delete)
          const deletedUserReservations = await prisma.reservation.deleteMany({
            where: { user_id: parseInt(userId) }
          })
          console.log(`🗑️ ลบ ${deletedUserReservations.count} reservations ที่เชื่อมโยงกับ user ID=${userId}`)
          
          // ลบ reviews ที่เชื่อมโยงก่อน (Cascade Delete)
          const deletedUserReviews = await prisma.review.deleteMany({
            where: { user_id: parseInt(userId) }
          })
          console.log(`🗑️ ลบ ${deletedUserReviews.count} reviews ที่เชื่อมโยงกับ user ID=${userId}`)
          
          deleteResult = await prisma.users.delete({
            where: { user_id: parseInt(userId) }
          })
          break
        case 'officer':
          // ลบ reservations ที่เชื่อมโยงก่อน (Cascade Delete)
          const deletedReservations = await prisma.reservation.deleteMany({
            where: { officer_id: parseInt(userId) }
          })
          console.log(`🗑️ ลบ ${deletedReservations.count} reservations ที่เชื่อมโยงกับ officer ID=${userId}`)
          
          deleteResult = await prisma.officer.delete({
            where: { officer_id: parseInt(userId) }
          })
          break
        case 'executive':
          deleteResult = await prisma.executive.delete({
            where: { executive_id: parseInt(userId) }
          })
          break
        case 'admin':
          deleteResult = await prisma.admin.delete({
            where: { admin_id: parseInt(userId) }
          })
          break
        default:
          throw new Error('Invalid role specified')
      }
      
      return {
        success: true,
        message: `ลบผู้ใช้ ${role} เรียบร้อยแล้ว`,
        data: deleteResult
      }
      
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาดในการลบผู้ใช้:', error)
      set.status = 500
      return { 
        success: false,
        message: 'เกิดข้อผิดพลาดในการลบผู้ใช้',
        error: error.message
      }
    }
  })
  
  // ============================
  // 👁️ ดูข้อมูล Executive ทั้งหมด (Admin เห็นได้ทุกอย่าง)
  // ============================
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
  // � สถิติการเข้าใช้ระบบตามคณะ/หน่วยงาน
  // ============================
  .get('/department-stats', async ({ request, set }) => {
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
      console.log('📊 Admin: ดูสถิติการเข้าใช้ระบบตามคณะ')
      
      // นับจำนวนผู้ใช้จาก users table ตาม department
      const usersByDept = await prisma.users.groupBy({
        by: ['department'],
        _count: {
          user_id: true
        }
      })
      
      // นับจำนวน officer ตาม department
      const officersByDept = await prisma.officer.groupBy({
        by: ['department'],
        _count: {
          officer_id: true
        }
      })
      
      // นับจำนวน executive ตาม department
      const executivesByDept = await prisma.executive.groupBy({
        by: ['department'],
        _count: {
          executive_id: true
        }
      })
      
      // รวมข้อมูลทั้งหมดตาม department
      const departmentStats = new Map()
      
      // เพิ่มข้อมูล users (filter out null/empty department)
      usersByDept.forEach(item => {
        const dept = item.department
        if (dept && dept.trim() !== '') { // ข้าม null, undefined, และ empty string
          if (!departmentStats.has(dept)) {
            departmentStats.set(dept, { department: dept, users: 0, officers: 0, executives: 0, total: 0 })
          }
          departmentStats.get(dept).users = item._count.user_id
        }
      })
      
      // เพิ่มข้อมูล officers (filter out null/empty department)
      officersByDept.forEach(item => {
        const dept = item.department
        if (dept && dept.trim() !== '') { // ข้าม null, undefined, และ empty string
          if (!departmentStats.has(dept)) {
            departmentStats.set(dept, { department: dept, users: 0, officers: 0, executives: 0, total: 0 })
          }
          departmentStats.get(dept).officers = item._count.officer_id
        }
      })
      
      // เพิ่มข้อมูล executives (filter out null/empty department)
      executivesByDept.forEach(item => {
        const dept = item.department
        if (dept && dept.trim() !== '') { // ข้าม null, undefined, และ empty string
          if (!departmentStats.has(dept)) {
            departmentStats.set(dept, { department: dept, users: 0, officers: 0, executives: 0, total: 0 })
          }
          departmentStats.get(dept).executives = item._count.executive_id
        }
      })
      
      // คำนวณ total แต่ละ department
      departmentStats.forEach(dept => {
        dept.total = dept.users + dept.officers + dept.executives
      })
      
      // แปลงเป็น array และเรียงตาม total จากมากไปน้อย
      const sortedStats = Array.from(departmentStats.values())
        .sort((a, b) => b.total - a.total)
      
      return {
        success: true,
        message: `สถิติการเข้าใช้ระบบตามคณะ (${sortedStats.length} คณะ)`,
        data: sortedStats
      }
      
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาดในการดึงสถิติคณะ:', error)
      set.status = 500
      return { 
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงสถิติคณะ',
        error: error.message
      }
    }
  })
  
  // ============================
  // �👁️ ดูข้อมูล Executive ทั้งหมด (Admin เห็นได้ทุกอย่าง)
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

  // ============================
  // 👤 ดูข้อมูลผู้ใช้รายคน (สำหรับการแก้ไข)
  // ============================
  .get('/users/:userId/:role', async ({ params, request, set }) => {
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
      const { userId, role } = params
      console.log(`👤 Admin: ดูข้อมูลผู้ใช้ ID: ${userId}, Role: ${role}`)
      
      let userData = null
      
      // ดึงข้อมูลตาม role พร้อม address information
      if (role === 'user') {
        userData = await prisma.users.findUnique({
          where: { user_id: parseInt(userId) },
          include: {
            province: true,
            district: true,
            subdistrict: true
          }
        })
      } else if (role === 'officer') {
        userData = await prisma.officer.findUnique({
          where: { officer_id: parseInt(userId) },
          include: {
            province: true,
            district: true,
            subdistrict: true
          }
        })
      } else if (role === 'executive') {
        userData = await prisma.executive.findUnique({
          where: { executive_id: parseInt(userId) },
          include: {
            province: true,
            district: true,
            subdistrict: true
          }
        })
      } else if (role === 'admin') {
        userData = await prisma.admin.findUnique({
          where: { admin_id: parseInt(userId) },
          include: {
            province: true,
            district: true,
            subdistrict: true
          }
        })
      }

      if (!userData) {
        set.status = 404
        return {
          success: false,
          message: 'ไม่พบข้อมูลผู้ใช้'
        }
      }

      // เพิ่ม role และจัดรูปแบบข้อมูล address
      const responseData = {
        ...userData,
        role,
        // เพิ่มข้อมูลที่อยู่ที่มีชื่อ
        province_name: userData.province?.province_name || null,
        district_name: userData.district?.district_name || null,
        subdistrict_name: userData.subdistrict?.subdistrict_name || null,
      }

      return {
        success: true,
        message: `ดึงข้อมูลผู้ใช้ ${userData.first_name} ${userData.last_name}`,
        data: responseData
      }
      
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้'
      }
    }
  })

  // ============================
  // 📧 เช็คอีเมลซ้ำ (สำหรับการแก้ไข)
  // ============================
  .post('/check-email', async ({ request, set, body }) => {
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
      const { email, userId, role } = body

      console.log(`📧 Admin: เช็คอีเมลซ้ำ - ${email} (ยกเว้น ${role} ID: ${userId})`)
      
      // เช็คอีเมลซ้ำในทุก table ยกเว้นผู้ใช้ปัจจุบัน
      const [existingUsers, existingOfficers, existingExecutives, existingAdmins] = await Promise.all([
        prisma.users.findFirst({
          where: {
            email,
            NOT: role === 'user' ? { user_id: parseInt(userId) } : undefined
          }
        }),
        prisma.officer.findFirst({
          where: {
            email,
            NOT: role === 'officer' ? { officer_id: parseInt(userId) } : undefined
          }
        }),
        prisma.executive.findFirst({
          where: {
            email,
            NOT: role === 'executive' ? { executive_id: parseInt(userId) } : undefined
          }
        }),
        prisma.admin.findFirst({
          where: {
            email,
            NOT: role === 'admin' ? { admin_id: parseInt(userId) } : undefined
          }
        })
      ])

      const emailExists = existingUsers || existingOfficers || existingExecutives || existingAdmins

      return {
        success: true,
        available: !emailExists,
        message: emailExists ? 'อีเมลนี้ถูกใช้แล้ว' : 'อีเมลนี้ใช้ได้'
      }
      
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาดในการตรวจสอบอีเมล:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการตรวจสอบอีเมล'
      }
    }
  })

  // ============================
  // 🆔 เช็คเลขบัตรประชาชนซ้ำ (สำหรับการแก้ไข)
  // ============================
  .post('/check-citizen-id', async ({ request, set, body }) => {
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
      const { citizen_id, userId, role } = body

      console.log(`🆔 Admin: เช็คเลขบัตรประชาชนซ้ำ - ${citizen_id} (ยกเว้น ${role} ID: ${userId})`)
      
      // เช็คเลขบัตรประชาชนซ้ำในทุก table ยกเว้นผู้ใช้ปัจจุบัน
      const [existingUsers, existingOfficers, existingExecutives, existingAdmins] = await Promise.all([
        prisma.users.findFirst({
          where: {
            citizen_id,
            NOT: role === 'user' ? { user_id: parseInt(userId) } : undefined
          }
        }),
        prisma.officer.findFirst({
          where: {
            citizen_id,
            NOT: role === 'officer' ? { officer_id: parseInt(userId) } : undefined
          }
        }),
        prisma.executive.findFirst({
          where: {
            citizen_id,
            NOT: role === 'executive' ? { executive_id: parseInt(userId) } : undefined
          }
        }),
        prisma.admin.findFirst({
          where: {
            citizen_id,
            NOT: role === 'admin' ? { admin_id: parseInt(userId) } : undefined
          }
        })
      ])

      const citizenIdExists = existingUsers || existingOfficers || existingExecutives || existingAdmins

      return {
        success: true,
        available: !citizenIdExists,
        message: citizenIdExists ? 'เลขบัตรประชาชนนี้ถูกใช้แล้ว' : 'เลขบัตรประชาชนนี้ใช้ได้'
      }
      
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาดในการตรวจสอบเลขบัตรประชาชน:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการตรวจสอบเลขบัตรประชาชน'
      }
    }
  })

export default adminRoutes