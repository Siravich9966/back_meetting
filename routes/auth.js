// ===================================================================
// Authentication APIs - ระบบสมัครสมาชิก และ เข้าสู่ระบบ
// ===================================================================
// ไฟล์นี้จัดการ:
// - POST /api/auth/register - สมัครสมาชิกใหม่ (พร้อม Email & Password Validation)
// - POST /api/auth/login    - เข้าสู่ระบบและรับ JWT token
// ===================================================================

import { Elysia } from 'elysia'
import prisma from '../lib/prisma.js'
import { validateRegisterData, formatValidationErrors } from '../utils/validation.js'

export const authRoutes = new Elysia({ prefix: '/auth' })
  // API สมัครสมาชิก
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
      
      // ตรวจสอบ email ซ้ำ
      const existingUser = await prisma.users.findUnique({
        where: { email: body.email }
      })
      
      if (existingUser) {
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
      
      // สร้างผู้ใช้ใหม่
      const newUser = await prisma.users.create({
        data: {
          email: body.email,
          password: hashedPassword,
          first_name: body.first_name,
          last_name: body.last_name,
          role_id: 3, // default = user (ตาม roles table: user = 3)
          citizen_id: body.citizen_id || null,
          position: body.position || null,
          department: body.department || null,
          zip_code: body.zip_code ? parseInt(body.zip_code) : null,
          // created_at และ updated_at จะใช้ DEFAULT CURRENT_TIMESTAMP จากฐานข้อมูล
        }
      })
      
      console.log('✅ สร้างผู้ใช้ใหม่สำเร็จ')
      
      // ลบ password ออกจาก response
      const { password, ...userWithoutPassword } = newUser
      
      return {
        success: true,
        message: 'สมัครสมาชิกสำเร็จ!',
        user: userWithoutPassword
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
  
  // API เข้าสู่ระบบ
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
      
      // หาผู้ใช้ในฐานข้อมูล
      const user = await prisma.users.findUnique({
        where: { email: body.email },
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
        console.log('❌ ไม่พบผู้ใช้')
        set.status = 401
        return { 
          success: false, 
          message: 'ไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' 
        }
      }
      
      console.log('✅ พบผู้ใช้ในฐานข้อมูล')
      
      // ตรวจสอบสถานะ role
      if (user.roles?.role_status !== 'active') {
        console.log('❌ บัญชีผู้ใช้ไม่ได้รับการอนุมัติ')
        set.status = 403
        return { 
          success: false, 
          message: 'บัญชีผู้ใช้ไม่ได้รับการอนุมัติ' 
        }
      }
      
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
          userId: user.user_id, 
          email: user.email,
          role: user.roles?.role_name || 'user'
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }  // เปลี่ยนจาก 24h เป็น 1h
      )
      
      console.log('✅ สร้าง JWT Token สำเร็จ')
      
      // ลบ password ออกจาก response
      const { password, ...userWithoutPassword } = user
      
      return {
        success: true,
        message: 'เข้าสู่ระบบสำเร็จ',
        user: userWithoutPassword,
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
