// ===================================================================
// Authentication APIs - ระบบสมัครสมาชิก และ เข้าสู่ระบบ
// ===================================================================
// ไฟล์นี้จัดการ:
// - POST /api/auth/register - สมัครสมาชิกใหม่ (พร้อม Position-based routing)
// - POST /api/auth/login    - เข้าสู่ระบบและรับ JWT token
// ===================================================================

import { Elysia } from 'elysia'
import prisma from '../lib/prisma.js'
import { validateRegisterData, formatValidationErrors } from '../utils/validation.js'
import { isValidDepartment, getAllDepartments } from '../utils/departments.js'
import { 
  isValidPosition, 
  getTableFromPosition, 
  getRoleIdFromPosition,
  getDepartmentFromPosition,
  getExecutivePositionType 
} from '../utils/positions.js'

export const authRoutes = new Elysia({ prefix: '/auth' })
  // API สมัครสมาชิก (Position-based)
  .post('/register', async ({ body, set }) => {
    try {
      console.log('📝 เรียกใช้ API สมัครสมาชิก')
      console.log('📋 ข้อมูลที่ได้รับ:', body)
      
      // ตรวจสอบข้อมูลด้วย validation
      console.log('🔍 กำลังตรวจสอบข้อมูล...')
      const validation = validateRegisterData(body)
      
      if (!validation.isValid) {
        console.log('❌ ตรวจสอบข้อมูลไม่ผ่าน:', validation.errors)
        set.status = 400
        return { 
          success: false, 
          message: formatValidationErrors(validation.errors) 
        }
      }
      
      console.log('✅ ตรวจสอบข้อมูลผ่าน')
      
      // ตรวจสอบ position ที่เลือก
      if (!body.position) {
        console.log('❌ ไม่ได้ระบุตำแหน่ง')
        set.status = 400
        return {
          success: false,
          message: 'กรุณาเลือกตำแหน่ง'
        }
      }
      
      if (!isValidPosition(body.position)) {
        console.log('❌ ตำแหน่งไม่ถูกต้อง:', body.position)
        set.status = 400
        return {
          success: false,
          message: 'ตำแหน่งไม่ถูกต้อง'
        }
      }
      
      // กำหนดตารางและ role_id จาก position
      const targetTable = getTableFromPosition(body.position)
      const roleId = getRoleIdFromPosition(body.position)
      const departmentFromPosition = getDepartmentFromPosition(body.position)
      const executiveType = getExecutivePositionType(body.position)
      
      console.log('📋 Position Analysis:', {
        position: body.position,
        targetTable,
        roleId,
        departmentFromPosition,
        executiveType
      })

      // ตรวจสอบ email ซ้ำในทุก table (users, officer, admin, executive)
      const existingInUsers = await prisma.users.findUnique({
        where: { email: body.email }
      })
      
      const existingInOfficer = await prisma.officer.findUnique({
        where: { email: body.email }
      })
      
      const existingInAdmin = await prisma.admin.findUnique({
        where: { email: body.email }
      })
      
      const existingInExecutive = await prisma.executive.findUnique({
        where: { email: body.email }
      })
      
      if (existingInUsers || existingInOfficer || existingInAdmin || existingInExecutive) {
        console.log('❌ อีเมลนี้ถูกใช้งานแล้ว')
        set.status = 409
        return { 
          success: false, 
          message: 'อีเมลนี้ถูกใช้งานแล้ว' 
        }
      }
      
      // เข้ารหัสรหัสผ่าน
      const bcrypt = await import('bcryptjs')
      const hashedPassword = await bcrypt.hash(body.password, 10)
      console.log('🔐 เข้ารหัสรหัสผ่านเสร็จสิ้น')
      
      // 🎯 Position-based Registration Logic
      let newUser = null
      
      if (targetTable === 'users') {
        // บุคลากรทั่วไป → users table
        newUser = await prisma.users.create({
          data: {
            email: body.email,
            password: hashedPassword,
            first_name: body.first_name,
            last_name: body.last_name,
            role_id: roleId, // 3 = user
            citizen_id: body.citizen_id || null,
            position: body.position,
            department: body.department || null,
            zip_code: body.zip_code ? parseInt(body.zip_code) : null,
          }
        })
        
      } else if (targetTable === 'officer') {
        // เจ้าหน้าที่ → officer table
        newUser = await prisma.officer.create({
          data: {
            email: body.email,
            password: hashedPassword,
            first_name: body.first_name,
            last_name: body.last_name,
            role_id: roleId, // 2 = officer
            citizen_id: body.citizen_id || null,
            position: body.position,
            department: departmentFromPosition || body.department,
            zip_code: body.zip_code ? parseInt(body.zip_code) : null,
          }
        })
        
      } else if (targetTable === 'executive') {
        // ผู้บริหาร → executive table
        newUser = await prisma.executive.create({
          data: {
            email: body.email,
            password: hashedPassword,
            first_name: body.first_name,
            last_name: body.last_name,
            role_id: roleId, // 4 = executive
            citizen_id: body.citizen_id || null,
            position: executiveType, // university_executive หรือ faculty_executive
            department: departmentFromPosition || 
                       (executiveType === 'university_executive' ? 'สำนักงานอธิการบดี' : body.department),
            zip_code: body.zip_code ? parseInt(body.zip_code) : null,
          }
        })
      }
      
      console.log(`✅ สร้างผู้ใช้ใหม่สำเร็จใน ${targetTable} table`)
      
      // ลบ password ออกจาก response
      const { password, ...userWithoutPassword } = newUser
      
      return {
        success: true,
        message: `สมัครสมาชิกสำเร็จ! บันทึกข้อมูลใน ${targetTable} table`,
        user: {
          ...userWithoutPassword,
          userTable: targetTable,
          selectedPosition: body.position
        }
      }
      
    } catch (err) {
      console.error('❌ เกิดข้อผิดพลาดในการสมัครสมาชิก:', err)
      console.error('รายละเอียดข้อผิดพลาด:', {
        message: err.message,
        code: err.code,
        meta: err.meta
      })
      
      // จัดการ error เฉพาะ
      if (err.code === 'P2002' && err.meta?.target?.includes('citizen_id')) {
        set.status = 409
        return { 
          success: false, 
          message: 'เลขบัตรประชาชนนี้ถูกใช้งานแล้ว' 
        }
      }
      
      if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
        set.status = 409
        return { 
          success: false, 
          message: 'อีเมลนี้ถูกใช้งานแล้ว' 
        }
      }
      
      set.status = 500
      return { 
        success: false, 
        message: 'เกิดข้อผิดพลาดในการสมัครสมาชิก' 
      }
    }
  })
  
  // API เข้าสู่ระบบ (4-table login)
  .post('/login', async ({ body, set }) => {
    try {
      console.log('🔐 เรียกใช้ API เข้าสู่ระบบ')
      
      // ตรวจสอบข้อมูล
      if (!body.email || !body.password) {
        set.status = 400
        return { 
          success: false, 
          message: 'กรุณากรอก email และ password' 
        }
      }
      
      console.log('🔍 กำลังหาผู้ใช้ในฐานข้อมูล...')
      
      // หาผู้ใช้ในฐานข้อมูลจาก 4 tables
      let user = null
      let userTable = null
      let userId = null
      
      // ลองหาใน users table ก่อน
      user = await prisma.users.findUnique({
        where: { email: body.email },
        include: { 
          roles: {
            select: {
              role_name: true
            }
          }
        }
      })
      
      if (user) {
        userTable = 'users'
        userId = user.user_id
      } else {
        // ลองหาใน officer table
        user = await prisma.officer.findUnique({
          where: { email: body.email },
          include: { 
            roles: {
              select: {
                role_name: true
              }
            }
          }
        })
        
        if (user) {
          userTable = 'officer'
          userId = user.officer_id
        } else {
          // ลองหาใน admin table
          user = await prisma.admin.findUnique({
            where: { email: body.email },
            include: { 
              roles: {
                select: {
                  role_name: true
                }
              }
            }
          })
          
          if (user) {
            userTable = 'admin'
            userId = user.admin_id
          } else {
            // ลองหาใน executive table
            user = await prisma.executive.findUnique({
              where: { email: body.email },
              include: { 
                roles: {
                  select: {
                    role_name: true
                  }
                }
              }
            })
            
            if (user) {
              userTable = 'executive'
              userId = user.executive_id
            }
          }
        }
      }
      
      if (!user) {
        console.log('❌ ไม่พบผู้ใช้')
        set.status = 401
        return { 
          success: false, 
          message: 'ไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' 
        }
      }
      
      console.log('✅ พบผู้ใช้ในฐานข้อมูล')
      
      // ตรวจสอบรหัสผ่าน
      const bcrypt = await import('bcryptjs')
      const isValidPassword = await bcrypt.compare(body.password, user.password)
      
      if (!isValidPassword) {
        console.log('❌ รหัสผ่านไม่ถูกต้อง')
        set.status = 401
        return { 
          success: false, 
          message: 'ไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' 
        }
      }
      
      console.log('✅ รหัสผ่านถูกต้อง')
      
      // สร้าง JWT Token
      const jwt = await import('jsonwebtoken')
      const token = jwt.sign(
        { 
          userId: userId,
          email: user.email,
          role: user.roles?.role_name || 'user',
          userTable: userTable
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      )
      
      console.log('✅ สร้าง JWT Token สำเร็จ')
      
      // ลบ password ออกจาก response และปรับ user_id ให้ consistent
      const { password, ...userWithoutPassword } = user
      
      // ปรับ field ให้เหมือนกันทุก table
      if (userTable === 'officer') {
        userWithoutPassword.user_id = userWithoutPassword.officer_id
        delete userWithoutPassword.officer_id
      } else if (userTable === 'admin') {
        userWithoutPassword.user_id = userWithoutPassword.admin_id
        delete userWithoutPassword.admin_id
      } else if (userTable === 'executive') {
        userWithoutPassword.user_id = userWithoutPassword.executive_id
        delete userWithoutPassword.executive_id
      }
      
      return {
        success: true,
        message: 'เข้าสู่ระบบสำเร็จ',
        user: {
          ...userWithoutPassword,
          userTable: userTable
        },
        token: token
      }
      
    } catch (err) {
      console.error('❌ เกิดข้อผิดพลาดในการเข้าสู่ระบบ:', err)
      set.status = 500
      return { 
        success: false, 
        message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' 
      }
    }
  })
