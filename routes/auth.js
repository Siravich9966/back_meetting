// @ts-nocheck
// ===================================================================
// Authentication APIs - ระบบสมัครสมาชิก และ เข้าสู่ระบบ
// ===================================================================
// ไฟล์นี้จัดการ:
// - POST /api/auth/register - สมัครสมาชิกใหม่ (พร้อม Position-based routing)
// - POST /api/auth/login    - เข้าสู่ระบบและรับ JWT token
// ===================================================================

import { Elysia } from 'elysia'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'
import { validateRegisterData, formatValidationErrors } from '../validation.js'
import { isValidDepartment, getAllDepartments } from '../utils/departments.js'
import {
  isValidPosition,
  getTableFromPosition,
  getRoleIdFromPosition,
  getDepartmentFromPosition,
  getExecutivePositionType
} from '../utils/positions.js'
import { authMiddleware } from '../middleware/index.js'
import { sendResetEmail } from '../utils/email.js'

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

      // ตรวจสอบ citizen_id ซ้ำในทุก table (ถ้ามีการใส่มา)
      if (body.citizen_id) {
        const existingCitizenInUsers = await prisma.users.findUnique({
          where: { citizen_id: body.citizen_id }
        })

        const existingCitizenInOfficer = await prisma.officer.findUnique({
          where: { citizen_id: body.citizen_id }
        })

        const existingCitizenInAdmin = await prisma.admin.findUnique({
          where: { citizen_id: body.citizen_id }
        })

        const existingCitizenInExecutive = await prisma.executive.findUnique({
          where: { citizen_id: body.citizen_id }
        })

        if (existingCitizenInUsers || existingCitizenInOfficer || existingCitizenInAdmin || existingCitizenInExecutive) {
          console.log('❌ เลขบัตรประชาชนนี้ถูกใช้งานแล้ว')
          set.status = 409
          return {
            success: false,
            message: 'เลขบัตรประชาชนนี้ถูกใช้งานแล้ว'
          }
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
            // Address fields - รับ IDs และ zip_code
            province_id: body.province_id ? parseInt(body.province_id) : null,
            district_id: body.district_id ? parseInt(body.district_id) : null,
            subdistrict_id: body.subdistrict_id ? parseInt(body.subdistrict_id) : null,
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
            // Address fields - รับ IDs และ zip_code  
            province_id: body.province_id ? parseInt(body.province_id) : null,
            district_id: body.district_id ? parseInt(body.district_id) : null,
            subdistrict_id: body.subdistrict_id ? parseInt(body.subdistrict_id) : null,
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
            position: body.position, // เก็บตำแหน่งภาษาไทยตามที่ผู้ใช้เลือก
            department: departmentFromPosition ||
              (executiveType === 'university_executive' ? 'สำนักงานอธิการบดี' : body.department),
            // Address fields - รับ IDs และ zip_code
            province_id: body.province_id ? parseInt(body.province_id) : null,
            district_id: body.district_id ? parseInt(body.district_id) : null,
            subdistrict_id: body.subdistrict_id ? parseInt(body.subdistrict_id) : null,
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

  // 🎯 API สมัครสมาชิก Admin โดยตรง (สำหรับสร้าง Admin คนแรก)
  .post('/register-admin', async ({ body, set }) => {
    try {
      console.log('🔐 เรียกใช้ API สมัครสมาชิก Admin โดยตรง')
      console.log('📋 ข้อมูลที่ได้รับ:', body)

      // ตรวจสอบข้อมูลด้วย validation
      const validation = validateRegisterData(body)

      if (!validation.isValid) {
        console.log('❌ ตรวจสอบข้อมูลไม่ผ่าน:', validation.errors)
        set.status = 400
        return {
          success: false,
          message: formatValidationErrors(validation.errors)
        }
      }

      // ตรวจสอบ email ซ้ำในทุก table
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

      // ตรวจสอบ citizen_id ซ้ำในทุก table (ถ้ามีการใส่มา)
      if (body.citizen_id) {
        const existingCitizenInUsers = await prisma.users.findUnique({
          where: { citizen_id: body.citizen_id }
        })

        const existingCitizenInOfficer = await prisma.officer.findUnique({
          where: { citizen_id: body.citizen_id }
        })

        const existingCitizenInAdmin = await prisma.admin.findUnique({
          where: { citizen_id: body.citizen_id }
        })

        const existingCitizenInExecutive = await prisma.executive.findUnique({
          where: { citizen_id: body.citizen_id }
        })

        if (existingCitizenInUsers || existingCitizenInOfficer || existingCitizenInAdmin || existingCitizenInExecutive) {
          console.log('❌ เลขบัตรประชาชนนี้ถูกใช้งานแล้ว')
          set.status = 409
          return {
            success: false,
            message: 'เลขบัตรประชาชนนี้ถูกใช้งานแล้ว'
          }
        }
      }

      // เข้ารหัสรหัสผ่าน
      const bcrypt = await import('bcryptjs')
      const hashedPassword = await bcrypt.hash(body.password, 10)

      // สร้าง Admin ใหม่
      const newAdmin = await prisma.admin.create({
        data: {
          email: body.email,
          password: hashedPassword,
          first_name: body.first_name,
          last_name: body.last_name,
          role_id: 3, // admin role
          citizen_id: body.citizen_id || null,
          position: body.position || 'ผู้ดูแลระบบ',
          department: body.department || 'สำนักงานอธิการบดี',
          // Address fields
          province_id: body.province_id ? parseInt(body.province_id) : null,
          district_id: body.district_id ? parseInt(body.district_id) : null,
          subdistrict_id: body.subdistrict_id ? parseInt(body.subdistrict_id) : null,
          zip_code: body.zip_code ? parseInt(body.zip_code) : null,
        }
      })

      console.log('✅ สร้าง Admin ใหม่สำเร็จ')

      // ลบ password ออกจาก response
      const { password, ...adminWithoutPassword } = newAdmin

      return {
        success: true,
        message: 'สมัครสมาชิก Admin สำเร็จ!',
        user: {
          ...adminWithoutPassword,
          userTable: 'admin',
          role: 'admin'
        }
      }

    } catch (err) {
      console.error('❌ เกิดข้อผิดพลาดในการสมัครสมาชิก Admin:', err)

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
        message: 'เกิดข้อผิดพลาดในการสมัครสมาชิก Admin'
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

      // ตรวจสอบถ้าเป็น test mode (สำหรับทดสอบ expiry)
      const isTestMode = body.testExpiry === true
      const expiryTime = isTestMode ? '30s' : '1h' // Test: 30 วินาที, Production: 8 ชั่วโมง (วันทำงาน)

      const token = jwt.sign(
        {
          userId: userId,
          email: user.email,
          role: user.roles?.role_name || 'user',
          userTable: userTable
        },
        process.env.JWT_SECRET,
        { expiresIn: expiryTime }
      )

      // ตรวจสอบ token payload
      const decoded = jwt.decode(token)
      const expiryTimeReadable = new Date(decoded.exp * 1000)
      const minutesLeft = Math.round((decoded.exp * 1000 - Date.now()) / (1000 * 60))

      console.log(`✅ สร้าง JWT Token สำเร็จ - Role: ${decoded.role}, Expires: ${expiryTimeReadable.toLocaleString('th-TH')}`)
      console.log(`📅 Token จะหมดอายุใน ${minutesLeft} นาที ${isTestMode ? '(TEST MODE)' : ''}`)

      if (isTestMode) {
        console.log('🧪 TEST MODE: Token จะหมดอายุใน 30 วินาทีเพื่อทดสอบ')
      }

      // ลบ password ออกจาก response และปรับ user_id ให้ consistent
      const { password, ...userWithoutPassword } = user

      // ปรับ field ให้เหมือนกันทุก table - แต่ไม่ลบ original ID ออก
      if (userTable === 'officer') {
        userWithoutPassword.user_id = userWithoutPassword.officer_id
        // เก็บ officer_id ไว้ด้วยเพื่อใช้ในการสร้าง URL
      } else if (userTable === 'admin') {
        userWithoutPassword.user_id = userWithoutPassword.admin_id
        // เก็บ admin_id ไว้ด้วยเพื่อใช้ในการสร้าง URL
      } else if (userTable === 'executive') {
        userWithoutPassword.user_id = userWithoutPassword.executive_id
        // เก็บ executive_id ไว้ด้วยเพื่อใช้ในการสร้าง URL
      }

      return {
        success: true,
        message: 'เข้าสู่ระบบสำเร็จ',
        user: {
          ...userWithoutPassword,
          role: user.roles?.role_name || 'user', // เพิ่ม role field
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

  // API สำหรับตรวจสอบอีเมลและรีเซ็ตรหัสผ่าน
  .post('/forgot-password', async ({ body, set }) => {
    try {
      console.log('🔐 เรียกใช้ API ตรวจสอบอีเมลสำหรับรีเซ็ตรหัสผ่าน')

      if (!body.email) {
        set.status = 400
        return {
          success: false,
          message: 'กรุณากรอกอีเมล'
        }
      }

      console.log('🔍 กำลังตรวจสอบอีเมลในฐานข้อมูล...')

      // หาผู้ใช้ในฐานข้อมูลจาก 4 tables
      let user = null
      let userTable = null
      let userIdField = null
      let userId = null

      // ตรวจสอบใน users table ก่อน
      user = await prisma.users.findUnique({
        where: { email: body.email }
      })

      if (user) {
        userTable = 'users'
        userIdField = 'user_id'
        userId = user.user_id
      } else {
        // ตรวจสอบใน officer table
        user = await prisma.officer.findUnique({
          where: { email: body.email }
        })

        if (user) {
          userTable = 'officer'
          userIdField = 'officer_id'
          userId = user.officer_id
        } else {
          // ตรวจสอบใน admin table
          user = await prisma.admin.findUnique({
            where: { email: body.email }
          })

          if (user) {
            userTable = 'admin'
            userIdField = 'admin_id'
            userId = user.admin_id
          } else {
            // ตรวจสอบใน executive table
            user = await prisma.executive.findUnique({
              where: { email: body.email }
            })

            if (user) {
              userTable = 'executive'
              userIdField = 'executive_id'
              userId = user.executive_id
            }
          }
        }
      }

      // ตรวจสอบผลลัพธ์และให้ feedback ชัดเจน
      if (!user) {
        console.log('❌ ไม่พบอีเมลในระบบ')
        set.status = 404
        return {
          success: false,
          found: false,
          message: 'ไม่พบอีเมลนี้ในระบบ กรุณาลงทะเบียนใหม่',
          action: 'register'
        }
      }

      console.log('✅ พบอีเมลในระบบ:', {
        email: body.email,
        table: userTable,
        name: `${user.first_name} ${user.last_name}`
      })

      // สร้าง Reset Token (32 bytes = 64 hex characters)
      const crypto = await import('crypto')
      const resetToken = crypto.randomBytes(32).toString('hex')
      const tokenExpiry = new Date(Date.now() + 3600000) // 1 ชั่วโมง

      console.log('🔑 สร้าง Reset Token:', {
        token: resetToken.substring(0, 8) + '...',
        expiry: tokenExpiry.toLocaleString('th-TH')
      })

      // บันทึก Token ลงฐานข้อมูล
      await prisma[userTable].update({
        where: {
          [userIdField]: userId
        },
        data: {
          reset_token: resetToken,
          reset_token_expiry: tokenExpiry
        }
      })

      console.log('✅ บันทึก Reset Token ลงฐานข้อมูลสำเร็จ')

      return {
        success: true,
        found: true,
        message: 'พบอีเมลในระบบ กำลังนำคุณไปหน้ารีเซ็ตรหัสผ่าน',
        action: 'reset',
        user: {
          email: user.email,
          name: `${user.first_name} ${user.last_name}`,
          table: userTable
        },
        reset_token: resetToken
      }

    } catch (error) {
      console.error('❌ Error in forgot-password:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการตรวจสอบอีเมล'
      }
    }
  })

  // API สำหรับรีเซ็ตรหัสผ่านด้วย Token
  .post('/reset-password', async ({ body, set }) => {
    try {
      console.log('🔐 เรียกใช้ API รีเซ็ตรหัสผ่าน')

      if (!body.token || !body.password) {
        set.status = 400
        return {
          success: false,
          message: 'กรุณาระบุ token และรหัสผ่านใหม่'
        }
      }

      if (body.password.length < 6) {
        set.status = 400
        return {
          success: false,
          message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร'
        }
      }

      console.log('🔍 กำลังตรวจสอบ Reset Token...')

      // หา Token ในฐานข้อมูลจาก 4 tables
      let user = null
      let userTable = null
      let userIdField = null

      // ตรวจสอบใน users table ก่อน
      user = await prisma.users.findFirst({
        where: {
          reset_token: body.token,
          reset_token_expiry: {
            gt: new Date() // มากกว่าเวลาปัจจุบัน (ยังไม่หมดอายุ)
          }
        }
      })

      if (user) {
        userTable = 'users'
        userIdField = 'user_id'
      } else {
        // ตรวจสอบใน officer table
        user = await prisma.officer.findFirst({
          where: {
            reset_token: body.token,
            reset_token_expiry: {
              gt: new Date()
            }
          }
        })

        if (user) {
          userTable = 'officer'
          userIdField = 'officer_id'
        } else {
          // ตรวจสอบใน admin table
          user = await prisma.admin.findFirst({
            where: {
              reset_token: body.token,
              reset_token_expiry: {
                gt: new Date()
              }
            }
          })

          if (user) {
            userTable = 'admin'
            userIdField = 'admin_id'
          } else {
            // ตรวจสอบใน executive table
            user = await prisma.executive.findFirst({
              where: {
                reset_token: body.token,
                reset_token_expiry: {
                  gt: new Date()
                }
              }
            })

            if (user) {
              userTable = 'executive'
              userIdField = 'executive_id'
            }
          }
        }
      }

      if (!user) {
        console.log('❌ Token ไม่ถูกต้องหรือหมดอายุแล้ว')
        set.status = 400
        return {
          success: false,
          message: 'Token ไม่ถูกต้องหรือหมดอายุแล้ว'
        }
      }

      console.log('✅ พบ Token ที่ถูกต้อง:', {
        table: userTable,
        email: user.email
      })

      // เข้ารหัสรหัสผ่านใหม่
      const bcrypt = await import('bcryptjs')
      const hashedPassword = await bcrypt.hash(body.password, 10)

      // อัปเดตรหัสผ่านและลบ Token
      await prisma[userTable].update({
        where: {
          [userIdField]: user[userIdField]
        },
        data: {
          password: hashedPassword,
          reset_token: null,
          reset_token_expiry: null,
          updated_at: new Date()
        }
      })

      console.log('✅ เปลี่ยนรหัสผ่านสำเร็จ')

      return {
        success: true,
        message: 'เปลี่ยนรหัสผ่านสำเร็จ กรุณาเข้าสู่ระบบด้วยรหัสผ่านใหม่'
      }

    } catch (error) {
      console.error('❌ Error in reset-password:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน'
      }
    }
  })

  // API สำหรับอัปเดตโปรไฟล์ตนเอง
  .put('/profile', async ({ request, set, body }) => {
    try {
      console.log('📝 เรียกใช้ API อัปเดตโปรไฟล์')

      // ตรวจสอบ authentication
      const user = await authMiddleware(request, set)
      if (user.success === false) {
        return user
      }


      // แยก token เพื่อดึง original userId จาก JWT
      const headersString = JSON.stringify(request.headers)
      const headersObj = JSON.parse(headersString)
      const authHeader = headersObj.authorization
      const token = authHeader.substring(7)
      const decoded = jwt.verify(token, process.env.JWT_SECRET)


      console.log('🔍 ผู้ใช้:', user.email, 'Role:', user.role)
      console.log('🗂️ Original userId from token:', decoded.userId)

      // ข้อมูลพื้นฐานที่ทุกคนแก้ไขได้
      const basicFields = [
        'first_name', 'last_name', 'email', 'citizen_id',
        'department', // ✅ ปลดล็อค department ให้ทุกคนแก้ไขได้
        'province_id', 'district_id', 'subdistrict_id', 'zip_code'
      ]
      
      // ข้อมูลที่เฉพาะ admin แก้ไขได้ (เพื่อป้องกันการเปลี่ยน role/สิทธิ์)
      const adminOnlyFields = ['position'] // 🔐 เฉพาะ position ที่ล็อคไว้
      
      let allowedFields = [...basicFields]
      
      // เฉพาะ admin เท่านั้นที่แก้ไข position ได้
      if (user.role === 'admin') {
        allowedFields.push(...adminOnlyFields)
        console.log('✅ Admin detected: allowing position updates')
      } else {
        console.log('⚠️ Non-admin user: position updates blocked, department updates allowed')
        
        // เช็คว่ามีการพยายามแก้ไข position หรือไม่
        const blockedAttempts = adminOnlyFields.filter(field => body[field] !== undefined)
        if (blockedAttempts.length > 0) {
          console.log('🚫 Blocked attempts to modify:', blockedAttempts)
          set.status = 403
          return {
            success: false,
            message: 'คุณไม่มีสิทธิ์ในการแก้ไขตำแหน่งงาน ติดต่อแอดมินเพื่อขอความช่วยเหลือ'
          }
        }
      }
      
      const updateData = {}

      // กรองเฉพาะข้อมูลที่อนุญาต
      for (const field of allowedFields) {
        if (body[field] !== undefined) {
          updateData[field] = body[field]
        }
      }

      console.log('📋 ข้อมูลที่จะอัปเดต:', updateData)

      // ตรวจสอบว่ามีข้อมูลที่จะอัปเดตหรือไม่
      if (Object.keys(updateData).length === 0) {
        set.status = 400
        return {
          success: false,
          message: 'ไม่มีข้อมูลที่จะอัปเดต'
        }
      }

      // กำหนด table ที่จะอัปเดตตาม role
      let tableName, idField, userId

      switch (user.role) {
        case 'user':
          tableName = 'users'
          idField = 'user_id'
          userId = decoded.userId  // ใช้ original userId จาก token
          break
        case 'officer':
          tableName = 'officer'
          idField = 'officer_id'
          userId = decoded.userId  // ใช้ original officer_id จาก token
          break
        case 'admin':
          tableName = 'admin'
          idField = 'admin_id'
          userId = decoded.userId  // ใช้ original admin_id จาก token
          break
        case 'executive':
          tableName = 'executive'
          idField = 'executive_id'
          userId = decoded.userId  // ใช้ original executive_id จาก token
          break
        default:
          set.status = 400
          return {
            success: false,
            message: 'ไม่สามารถระบุ role ได้'
          }
      }

      console.log('🎯 อัปเดต table:', tableName, 'ID:', userId)
      
      // ตรวจสอบ userId ว่าเป็น undefined หรือไม่
      if (!userId) {
        console.log('❌ userId is undefined!')
        console.log('🔍 User object:', JSON.stringify(user, null, 2))
        set.status = 400
        return {
          success: false,
          message: 'ไม่สามารถระบุ ID ผู้ใช้ได้'
        }
      }

      // ตรวจสอบ email และ citizen_id ซ้ำก่อนอัปเดต
      if (updateData.email || updateData.citizen_id) {
        console.log('🔍 ตรวจสอบข้อมูลซ้ำ...')
        
        // ตรวจสอบ email ซ้ำในทุก table ยกเว้นข้อมูลตัวเอง
        if (updateData.email) {
          const emailChecks = await Promise.all([
            prisma.users.findFirst({ where: { email: updateData.email, NOT: { user_id: tableName === 'users' ? userId : undefined } } }),
            prisma.officer.findFirst({ where: { email: updateData.email, NOT: { officer_id: tableName === 'officer' ? userId : undefined } } }),
            prisma.admin.findFirst({ where: { email: updateData.email, NOT: { admin_id: tableName === 'admin' ? userId : undefined } } }),
            prisma.executive.findFirst({ where: { email: updateData.email, NOT: { executive_id: tableName === 'executive' ? userId : undefined } } })
          ])
          
          const duplicateEmail = emailChecks.find(check => check !== null)
          if (duplicateEmail) {
            console.log('❌ อีเมลนี้ถูกใช้งานแล้ว')
            set.status = 409
            return {
              success: false,
              message: 'อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น'
            }
          }
        }

        // ตรวจสอบ citizen_id ซ้ำในทุก table ยกเว้นข้อมูลตัวเอง
        if (updateData.citizen_id) {
          const citizenChecks = await Promise.all([
            prisma.users.findFirst({ where: { citizen_id: updateData.citizen_id, NOT: { user_id: tableName === 'users' ? userId : undefined } } }),
            prisma.officer.findFirst({ where: { citizen_id: updateData.citizen_id, NOT: { officer_id: tableName === 'officer' ? userId : undefined } } }),
            prisma.admin.findFirst({ where: { citizen_id: updateData.citizen_id, NOT: { admin_id: tableName === 'admin' ? userId : undefined } } }),
            prisma.executive.findFirst({ where: { citizen_id: updateData.citizen_id, NOT: { executive_id: tableName === 'executive' ? userId : undefined } } })
          ])
          
          const duplicateCitizen = citizenChecks.find(check => check !== null)
          if (duplicateCitizen) {
            console.log('❌ เลขบัตรประชาชนนี้ถูกใช้งานแล้ว')
            set.status = 409
            return {
              success: false,
              message: 'เลขบัตรประชาชนนี้ถูกใช้งานแล้ว กรุณาตรวจสอบข้อมูล'
            }
          }
        }

        console.log('✅ ไม่พบข้อมูลซ้ำ')
      }

      // อัปเดตข้อมูลในฐานข้อมูล
      const updatedUser = await prisma[tableName].update({
        where: {
          [idField]: userId
        },
        data: {
          ...updateData,
          updated_at: new Date()
        },
        select: {
          [idField]: true,
          email: true,
          first_name: true,
          last_name: true,
          citizen_id: true,
          position: true,
          department: true,
          zip_code: true,
          subdistrict_id: true,  // แก้จาก tambon_id เป็น subdistrict_id
          // 🔥 ลบ profile_image: true และจะเพิ่ม path ทีหลัง
          created_at: true,
          updated_at: true,
          roles: {
            select: {
              role_name: true
            }
          }
        }
      })

      console.log('✅ อัปเดตโปรไฟล์สำเร็จ')

      // ปรับ field ให้เหมือนกันทุก table (เหมือนใน login API)
      let responseUser = { ...updatedUser }

      if (tableName === 'officer') {
        // 🔥 เพิ่ม profile_image เป็น path แทน binary
        responseUser.profile_image = `/api/upload/profile-image/${responseUser.officer_id}`
        responseUser.user_id = responseUser.officer_id
        // เก็บ officer_id ไว้ด้วยเพื่อใช้ในการสร้าง URL
      } else if (tableName === 'admin') {
        // 🔥 เพิ่ม profile_image เป็น path แทน binary
        responseUser.profile_image = `/api/upload/profile-image/${responseUser.admin_id}`
        responseUser.user_id = responseUser.admin_id
        // เก็บ admin_id ไว้ด้วยเพื่อใช้ในการสร้าง URL
      } else if (tableName === 'executive') {
        // 🔥 เพิ่ม profile_image เป็น path แทน binary
        responseUser.profile_image = `/api/upload/profile-image/${responseUser.executive_id}`
        responseUser.user_id = responseUser.executive_id
        // เก็บ executive_id ไว้ด้วยเพื่อใช้ในการสร้าง URL
      } else if (tableName === 'users') {
        // 🔥 เพิ่ม profile_image เป็น path แทน binary
        responseUser.profile_image = `/api/upload/profile-image/${responseUser.user_id}`
      }

      return {
        success: true,
        message: 'อัปเดตโปรไฟล์สำเร็จ',
        updated_fields: Object.keys(updateData),
        user: {
          ...responseUser,
          role: responseUser.roles?.role_name || user.role,
          userTable: tableName
        }
      }

    } catch (error) {
      console.error('❌ Error updating profile:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์: ' + error.message
      }
    }
  })

  // API สำหรับดูโปรไฟล์ตนเอง
  .get('/profile', async ({ request, set }) => {
    try {
      console.log('📋 เรียกใช้ API ดูโปรไฟล์')

      // ตรวจสอบ authentication
      const user = await authMiddleware(request, set)
      if (user.success === false) {
        return user
      }

      return {
        success: true,
        message: 'ข้อมูลโปรไฟล์ของคุณ',
        profile: user
      }

    } catch (error) {
      console.error('❌ Error getting profile:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์'
      }
    }
  })
