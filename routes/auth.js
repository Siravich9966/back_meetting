// ===================================================================
// Authentication APIs - ระบบสมัครสมาชิก และ เข้าสู่ระบบ
// ===================================================================
// ไฟล์นี้จัดการ:
// - POST /api/auth/register - สมัครสมาชิกใหม่
// - POST /api/auth/login    - เข้าสู่ระบบและรับ JWT token
// ===================================================================

import { Elysia } from 'elysia'

export const authRoutes = new Elysia({ prefix: '/auth' })
  // API สมัครสมาชิก
  .post('/register', async ({ request, db, success, error }) => {
    try {
      console.log('📝 Register API called')
      
      // อ่านข้อมูลจาก request body
      const body = await request.json()
      console.log('📋 Request body:', body)
      
      // ตรวจสอบข้อมูลที่จำเป็น
      if (!body.email || !body.password || !body.first_name || !body.last_name) {
        console.log('❌ ข้อมูลไม่ครบถ้วน')
        return error('กรุณากรอกข้อมูลให้ครบถ้วน')
      }
      
      // ตรวจสอบ email ซ้ำ
      const existingUser = await db.users.findUnique({
        where: { email: body.email }
      })
      
      if (existingUser) {
        return error('อีเมลนี้ถูกใช้งานแล้ว')
      }
      
      // เข้ารหัสรหัสผ่าน
      const bcrypt = await import('bcryptjs')
      const hashedPassword = await bcrypt.hash(body.password, 10)
      
      // สร้างผู้ใช้ใหม่
      const newUser = await db.users.create({
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
      
      // ลบ password ออกจาก response
      const { password, ...userWithoutPassword } = newUser
      
      return success({
        message: 'สมัครสมาชิกสำเร็จ!',
        user: userWithoutPassword
      })
      
    } catch (err) {
      console.error('Register error:', err)
      console.error('Error details:', {
        message: err.message,
        code: err.code,
        meta: err.meta
      })
      
      // จัดการ error เฉพาะ
      if (err.code === 'P2002' && err.meta?.target?.includes('citizen_id')) {
        return error('เลขบัตรประชาชนนี้ถูกใช้งานแล้ว11')
      }
      
      if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
        return error('อีเมลนี้ถูกใช้งานแล้ว')
      }
      
      return error('เกิดข้อผิดพลาดในการสมัครสมาชิก1')
    }
  })
  

  
  // API เข้าสู่ระบบ
  .post('/login', async ({ request, db, success, error }) => {
    try {
      // อ่านข้อมูลจาก request body
      const body = await request.json()
      
      // ตรวจสอบข้อมูล
      if (!body.email || !body.password) {
        return error('กรุณากรอก email และ password')
      }
      
      // หาผู้ใช้ในฐานข้อมูล
      const user = await db.users.findUnique({
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
        return error('ไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
      }
      
      // ตรวจสอบสถานะ role
      if (user.roles?.role_status !== 'active') {
        return error('บัญชีผู้ใช้ไม่ได้รับการอนุมัติ')
      }
      
      // ตรวจสอบรหัสผ่าน
      const bcrypt = await import('bcryptjs')
      const isValidPassword = await bcrypt.compare(body.password, user.password)
      
      if (!isValidPassword) {
        return error('ไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
      }
      
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
      
      // ลบ password ออกจาก response
      const { password, ...userWithoutPassword } = user
      
      return success({
        message: 'เข้าสู่ระบบสำเร็จ',
        user: userWithoutPassword,
        token: token
      })
      
    } catch (error) {
      console.error('Login error:', error)
      return error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ')
    }
  })
