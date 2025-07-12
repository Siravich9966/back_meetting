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
import 'dotenv/config'
import prisma from './lib/prisma.js'                    // Shared Prisma client

// ===== Import API Routes =====
import { authRoutes } from './routes/auth.js'        // สมัครสมาชิก/เข้าสู่ระบบ
import { protectedRoutes, officerRoutes, adminRoutes } from './routes/protected.js' // APIs ที่ต้อง authentication

// สร้าง Elysia app
const app = new Elysia()

// Global Database Decorator (ใช้ db ได้ทุก endpoint)
app.decorate('db', prisma)

// Global Response Helpers
app.decorate('success', (data) => {
  return { success: true, ...data }
})

app.decorate('error', (message) => {
  return { success: false, error: message }
})

// ตั้งค่า CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
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
  .use(authRoutes) // Authentication APIs: /api/auth/register, /api/auth/login
  .use(protectedRoutes) // Protected APIs: /api/protected/*
  .use(officerRoutes) // Officer APIs: /api/protected/officer/*
  .use(adminRoutes) // Admin APIs: /api/protected/admin/*
)

// เริ่ม server
const PORT = process.env.PORT || 8000
app.listen(PORT)

console.log('\n🚀 ระบบจองห้องประชุม - Backend Server')
console.log(`📡 Server: http://localhost:${PORT}`)
console.log('📋 Available Endpoints:')
console.log('   GET  /              - หน้าแรก')
console.log('   GET  /health        - ตรวจสอบสถานะ')
console.log('   GET  /api/test      - ทดสอบ API')
console.log('   POST /api/auth/register - สมัครสมาชิค')
console.log('   POST /api/auth/login    - เข้าสู่ระบบ')
console.log('🔐 Protected APIs (ต้องใส่ Token):')
console.log('   GET  /api/protected/profile     - ดูโปรไฟล์ตัวเอง')
console.log('   GET  /api/protected/user-area   - พื้นที่ผู้ใช้')
console.log('   GET  /api/protected/officer-area - พื้นที่เจ้าหน้าที่')
console.log('   GET  /api/protected/admin-area  - พื้นที่ผู้ดูแลระบบ')
console.log('   GET  /api/protected/users       - ดูรายชื่อผู้ใช้ทั้งหมด')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')