// ===================================================================
// ระบบจองห้องประชุม - Main Backend Server
// ===================================================================
// ไฟล์หลักของ Backend API Server ใช้:
// - Bun Runtime + Elysia Framework
// - PostgreSQL Database ผ่าน Prisma ORM
// - JWT Authentication with Role-based Access
// 
// API Routes:
// - /api/auth/*      - สมัครสมาชิก/เข้าสู่ระบบ (routes/auth.js)
// - /api/protected/* - APIs ที่ต้อง authentication (routes/protected.js)
// ===================================================================

import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { staticPlugin } from '@elysiajs/static'
import 'dotenv/config'
import prisma from './lib/prisma.js'  // ใช้สำหรับ database connection test

// ===== Import API Routes =====
import { authRoutes } from './routes/auth.js'        // สมัครสมาชิก/เข้าสู่ระบบ
import { protectedRoutes, officerRoutes, adminAreaRoutes } from './routes/protected.js' // APIs ที่ต้อง authentication
import { roomRoutes, officerRoomRoutes } from './routes/rooms.js' // APIs จัดการห้องประชุม
import { adminRoutes } from './routes/admin.js' // Admin APIs (3-table system)
import executiveRoutes from './routes/executive.js' // Executive APIs
import { departmentRoutes } from './routes/departments.js' // Department APIs
import positionRoutes from './routes/positions.js' // Position APIs
import { reservationRoutes, userReservationRoutes, officerReservationRoutes } from './routes/reservations.js' // Reservation APIs

// สร้าง Elysia app
const app = new Elysia()

// ตั้งค่า CORS
app.use(cors({
  origin: '*', // อนุญาตทุก origin สำหรับการทดสอบ
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))

// ตั้งค่า static file serving สำหรับรูปภาพ
app.use(staticPlugin({
  assets: 'uploads',
  prefix: '/uploads'
}))

// Global Error Handler (จัดการ error ครั้งเดียว)
app.onError(({ code, error, set }) => {
  console.error('API Error:', error)
  
  if (code === 'NOT_FOUND') {
    set.status = 404
    return { error: 'ไม่พบ endpoint ที่ต้องการ' }
  }
  
  set.status = 500
  return { error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }
})

// Routes พื้นฐาน
app.get('/', () => {
  return { 
    message: 'ระบบจองห้องประชุม API',
    status: 'running',
    timestamp: new Date().toISOString()
  }
})

// Health check endpoint
app.get('/health', () => {
  return { 
    status: 'healthy',
    database: 'connected',
    timestamp: new Date().toISOString()
  }
})

// API Routes
app.group('/api', app => app
  .get('/test', () => ({ message: 'API ทำงานได้แล้ว!' }))
  // Simple database test (ไม่ต้อง authentication)
  .get('/test-db', async () => {
    try {
      const roomCount = await prisma.meeting_room.count()
      const reservationCount = await prisma.reservation.count()
      const userCount = await prisma.users.count()
      
      return {
        success: true,
        message: 'Database ทำงานได้แล้ว!',
        data: {
          rooms: roomCount,
          reservations: reservationCount,
          users: userCount
        }
      }
    } catch (error) {
      console.error('Database test error:', error)
      return {
        success: false,
        message: 'Database ไม่ทำงาน',
        error: error.message
      }
    }
  })
  .use(authRoutes) // Authentication APIs: /api/auth/register, /api/auth/login
  .use(roomRoutes) // Room APIs: /api/rooms/*
  .use(positionRoutes) // Position APIs: /api/positions/*
  .use(departmentRoutes) // Department APIs: /api/departments/*
  .use(reservationRoutes) // Reservation APIs: /api/reservations/*
  .use(protectedRoutes) // Protected APIs: /api/protected/*
  .use(userReservationRoutes) // User Reservation APIs: /api/protected/reservations/*
  .use(officerRoutes) // Officer APIs: /api/protected/officer/*
  .use(officerReservationRoutes) // Officer Reservation APIs: /api/protected/officer/reservations/*
  .use(adminAreaRoutes) // Admin Area API: /api/protected/admin/area
  .use(officerRoomRoutes) // Officer Room Management APIs: /api/protected/officer/rooms/*
  .use(adminRoutes) // Admin Role Management APIs (3-table): /api/protected/admin/*
  .use(executiveRoutes) // Executive APIs: /api/protected/executive/*
)

// เริ่ม server
const PORT = process.env.PORT || 8000
app.listen(PORT)

console.log(`🚀 Server เริ่มทำงานที่ port ${PORT}`)
console.log(`� API Docs: http://localhost:${PORT}`)
console.log(`🔍 Health Check: http://localhost:${PORT}/health`)

// ทดสอบการเชื่อมต่อฐานข้อมูล
try {
  await prisma.$connect()
  console.log('✅ เชื่อมต่อฐานข้อมูลสำเร็จ')
} catch (error) {
  console.error('❌ ไม่สามารถเชื่อมต่อฐานข้อมูล:', error)
  process.exit(1)
}

// จัดการการปิดระบบอย่างสะอาด
process.on('SIGINT', async () => {
  console.log('🛑 กำลังปิดระบบ...')
  await prisma.$disconnect()
  console.log('✅ ปิดระบบเรียบร้อย')
  process.exit(0)
})

export default app
