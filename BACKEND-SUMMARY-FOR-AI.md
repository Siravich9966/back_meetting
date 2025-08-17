# 📚 สรุประบบ Backend จองห้องประชุม - สำหรับ AI Frontend
## ระบบจองห้องประชุม มหาวิทยาลัยราชภัฏมหาสารคาม

---

## 🎯 **ภาพรวมระบบ Backend**

### **สถานะการพัฒนา**
- ✅ **Backend API สมบูรณ์ 100%** - พร้อมใช้งานจริง
- ✅ **ระบบฐานข้อมูล** - PostgreSQL บน Neon Cloud (ออนไลน์)
- ✅ **ระบบ Authentication** - JWT + bcryptjs พร้อมใช้
- ✅ **ระบบสิทธิ์** - Role-based access control เข้มงวด
- ✅ **ระบบจองห้อง** - Advanced booking logic พร้อม conflict detection
- ✅ **การทดสอบ** - ผ่านการทดสอบทุกกรณีแล้ว

### **เทคโนโลยีที่ใช้**
```
🔧 Runtime: Bun v1.2.6 (Fast JavaScript Runtime)
🌐 Framework: Elysia (TypeScript-first API Framework)
🗄️ Database: PostgreSQL (Neon Cloud - Online)
🔗 ORM: Prisma Client
🔐 Auth: JWT + bcryptjs
📡 CORS: @elysiajs/cors
📁 File Upload: @elysiajs/static
```

---

## 🗄️ **โครงสร้างฐานข้อมูล**

### **ตารางหลัก**
```sql
-- ผู้ใช้ทั่วไป
users (user_id, first_name, last_name, email, password_hash, department, role_id)

-- เจ้าหน้าที่ดูแลห้องประชุม
officer (officer_id, first_name, last_name, email, password_hash, department, role_id)

-- ผู้ดูแลระบบ
admin (admin_id, first_name, last_name, email, password_hash, role_id)

-- ผู้บริหาร (READ ONLY)
executive (executive_id, first_name, last_name, email, password_hash, department, role_id)

-- ห้องประชุม
meeting_room (room_id, room_name, capacity, location_m, department, status_m, details_m, image)

-- การจองห้องประชุม
reservation (reservation_id, user_id, room_id, start_at, end_at, start_time, end_time, details_r, status_r)

-- อุปกรณ์ในห้อง
equipment (equipment_id, room_id, equipment_n, quantity)

-- บทบาท
roles (role_id, role_name, role_status)
```

### **ความสัมพันธ์สำคัญ**
- **Users ↔ Reservations**: 1 user มีได้หลาย reservations
- **Rooms ↔ Reservations**: 1 room มีได้หลาย reservations
- **Rooms ↔ Equipment**: 1 room มีได้หลาย equipment
- **Users ↔ Departments**: ผู้ใช้สังกัดคณะ/หน่วยงาน
- **Officers**: จัดการได้เฉพาะห้องในคณะตัวเอง

---

## 🔐 **ระบบ Authentication & Authorization**

### **JWT Token Structure**
```javascript
// Token Payload (ไม่เปิดเผย JWT_SECRET)
{
  user_id: 123,
  email: "user@example.com",
  role: "user|officer|admin|executive",
  department: "คณะเทคโนโลยีสารสนเทศ",
  userTable: "users|officer|admin|executive",
  iat: timestamp,
  exp: timestamp
}
```

### **Role-based Access Control**
```javascript
// สิทธิ์ตาม Role
Permissions = {
  user: {
    can: ["จองห้อง", "ดูการจองตัวเอง", "ยกเลิกการจองตัวเอง"],
    cannot: ["อนุมัติการจอง", "จัดการห้องประชุม", "ดูการจองคนอื่น"]
  },
  
  officer: {
    can: ["จองห้อง", "อนุมัติการจองในคณะตัวเอง", "จัดการห้องในคณะตัวเอง", "ดูการจองในคณะตัวเอง"],
    cannot: ["จัดการข้ามคณะ", "ดูการจองคณะอื่น", "จัดการสมาชิก"]
  },
  
  admin: {
    can: ["จัดการสมาชิกทั้งหมด", "ดูสถิติระบบ", "promote/demote users"],
    cannot: ["จัดการห้องประชุม", "อนุมัติการจอง"]
  },
  
  executive: {
    can: ["ดูรายงานและสถิติ", "ดูข้อมูล dashboard"],
    cannot: ["แก้ไขข้อมูลใดๆ", "จองห้อง", "อนุมัติการจอง"]
  }
}
```

---

## 🌐 **API Endpoints**

### **🔓 Public APIs (ไม่ต้อง Authentication)**
```javascript
// Server Status
GET /health                              // Health check

// Room Information
GET /api/rooms                           // ดูรายการห้องประชุมทั้งหมด
GET /api/rooms/:id                       // ดูรายละเอียดห้องประชุม

// Calendar Data
GET /api/reservations/calendar/:roomId   // ดูปฏิทินการจองห้อง
GET /api/reservations/calendar/:roomId?detailed=true  // ดูปฏิทินแบบละเอียด

// Department & Position Data
GET /api/departments                     // ดูรายการคณะ/หน่วยงาน
GET /api/positions                       // ดูรายการตำแหน่งสำหรับสมัครสมาชิก

// Database Test (for development)
GET /api/test-db                         // ทดสอบการเชื่อมต่อฐานข้อมูล
```

### **🔐 Authentication APIs**
```javascript
// Registration & Login
POST /api/auth/register                  // สมัครสมาชิก (Position-based routing)
POST /api/auth/login                     // เข้าสู่ระบบ

// Request Body สำหรับ Register:
{
  first_name: "ชื่อ",
  last_name: "นามสกุล", 
  email: "user@example.com",
  password: "password123",
  citizen_id: "1234567890123",
  position: "บุคลากร/อาจารย์ มหาวิทยาลัยราชภัฏมหาสารคาม",
  department: "คณะเทคโนโลยีสารสนเทศ",
  zip_code: 44000
}

// Response:
{
  success: true,
  message: "สมัครสมาชิกสำเร็จ",
  token: "JWT_TOKEN_HERE",
  user: { user_id, email, role, department }
}
```

### **👤 User APIs (ต้อง JWT Token)**
```javascript
// Headers ทุก Request:
{
  "Authorization": "Bearer JWT_TOKEN",
  "Content-Type": "application/json"
}

// Profile Management
GET /api/protected/profile               // ดูข้อมูลส่วนตัว
PUT /api/protected/profile               // แก้ไขข้อมูลส่วนตัว
POST /api/protected/profile/image        // อัปโหลดรูปโปรไฟล์
DELETE /api/protected/profile/image      // ลบรูปโปรไฟล์

// Reservation Management
GET /api/protected/reservations          // ดูรายการจองของตัวเอง
POST /api/protected/reservations         // จองห้องประชุมใหม่
PUT /api/protected/reservations/:id      // แก้ไขการจอง (เฉพาะ pending)
DELETE /api/protected/reservations/:id   // ยกเลิกการจอง

// Reservation Statistics
GET /api/protected/reservations/statistics/room-usage  // สถิติการใช้ห้อง
```

### **👮 Officer APIs (ต้อง JWT Token + isOfficer)**
```javascript
// Reservation Management (ในคณะตัวเองเท่านั้น)
GET /api/protected/officer/reservations               // ดูการจองในคณะตัวเอง
POST /api/protected/officer/reservations/:id/approve // อนุมัติการจอง
POST /api/protected/officer/reservations/:id/reject  // ปฏิเสธการจอง

// Room Management (ในคณะตัวเองเท่านั้น)
GET /api/protected/officer/rooms          // ดูห้องในคณะตัวเอง
POST /api/protected/officer/rooms         // เพิ่มห้องใหม่
PUT /api/protected/officer/rooms/:id      // แก้ไขห้อง
DELETE /api/protected/officer/rooms/:id   // ลบห้อง

// Area Management
GET /api/protected/officer/area           // ดูข้อมูลพื้นที่ที่ดูแล
```

### **👑 Admin APIs (ต้อง JWT Token + isAdmin)**
```javascript
// User Management
GET /api/protected/admin/stats            // ดูสถิติระบบทั้งหมด
GET /api/protected/admin/all-users        // ดูผู้ใช้ทั้งหมด
GET /api/protected/admin/executives       // ดูข้อมูล executive
POST /api/protected/admin/promote/user-to-officer     // เลื่อน user เป็น officer
POST /api/protected/admin/promote/officer-to-admin    // เลื่อน officer เป็น admin

// Area Information
GET /api/protected/admin/area             // ดูข้อมูลพื้นที่ทั้งหมด
```

### **🏛️ Executive APIs (ต้อง JWT Token + isExecutive)**
```javascript
// Dashboard (READ ONLY)
GET /api/protected/executive/dashboard    // ดู dashboard ผู้บริหาร
GET /api/protected/executive/reports      // ดูรายงานการใช้งาน
GET /api/protected/executive/rooms        // ดูข้อมูลห้องประชุม (ตามระดับ)

// University Executive: ดูได้ทุกคณะ
// Faculty Executive: ดูได้เฉพาะคณะตัวเอง
```

---

## 📅 **ระบบจองห้องประชุม (Core Feature)**

### **Business Rules**
```javascript
// เวลาทำงาน
working_hours = {
  daily: "06:00-18:00",                   // ทุกวัน (รวมเสาร์-อาทิตย์)
  lunch_break: "12:00-13:00",             // ช่วงพักเที่ยง (ไม่สามารถจองได้)
  weekend_booking: true,                  // จองวันเสาร์-อาทิตย์ได้
  advance_booking: "unlimited",           // จองล่วงหน้าได้ไม่จำกัด
  past_booking: false                     // ไม่สามารถจองย้อนหลังได้
}

// การตรวจสอบ Conflict
conflict_detection = {
  same_day_overlap: "ตรวจสอบเวลาซ้อนทับในวันเดียวกัน",
  multi_day_overlap: "ตรวจสอบการจองข้ามหลายวัน",
  cross_month_year: "รองรับการจองข้ามเดือน/ปี",
  lunch_break_validation: "ห้ามจองข้ามช่วงพักเที่ยง",
  working_hours_only: "จองได้เฉพาะเวลาทำงาน"
}
```

### **การจองห้องประชุม API**
```javascript
// POST /api/protected/reservations
Request Body: {
  room_id: 7,
  start_at: "2025-08-10",                 // วันที่เริ่มต้น
  end_at: "2025-08-10",                   // วันที่สิ้นสุด
  start_time: "2025-08-10T09:00:00.000Z", // เวลาเริ่มต้น (ISO format)
  end_time: "2025-08-10T12:00:00.000Z",   // เวลาสิ้นสุด (ISO format)
  details_r: "ประชุมคณะกรรมการ IT",        // รายละเอียดการประชุม
  number_of_participants: 8,              // จำนวนผู้เข้าร่วม (optional)
  special_requirements: "ต้องการไมโครโฟน" // ความต้องการพิเศษ (optional)
}

// Success Response:
{
  success: true,
  message: "จองห้องประชุมสำเร็จ",
  reservation: {
    reservation_id: 123,
    room_name: "ห้องประชุม IT Lab",
    status_r: "pending",                  // รอการอนุมัติ
    created_at: "2025-08-07T..."
  }
}

// Error Response (Conflict):
{
  success: false,
  error: "เวลาการจองขัดแย้งกับการจองที่มีอยู่",
  conflicts: [
    {
      reservation_id: 456,
      start_time: "09:30",
      end_time: "11:30",
      details: "ประชุมแผนก"
    }
  ]
}
```

### **ปฏิทินการจอง API**
```javascript
// GET /api/reservations/calendar/7?detailed=true
Response: {
  success: true,
  room_info: {
    room_id: 7,
    room_name: "ห้องประชุม IT Lab",
    capacity: 12,
    department: "คณะเทคโนโลยีสารสนเทศ"
  },
  calendar: {
    "2025-08-07": {
      status: "available",               // available | partial | full | past
      color: "green",                    // green | yellow | red | gray
      available_slots: 12,               // จำนวนช่วงเวลาว่าง
      total_slots: 12,                   // จำนวนช่วงเวลาทั้งหมด
      reservations: []                   // การจองในวันนี้
    },
    "2025-08-08": {
      status: "partial",
      color: "yellow", 
      available_slots: 9,
      total_slots: 12,
      reservations: [
        {
          reservation_id: 123,
          start_time: "09:00",
          end_time: "12:00",
          details_r: "ประชุมคณะกรรมการ",
          status_r: "approved"
        }
      ]
    }
  }
}
```

---

## 🎨 **ระบบสีปฏิทิน (Calendar Color System)**

### **การแสดงสถานะวันในปฏิทิน**
```javascript
calendar_colors = {
  "🟢 green": {
    condition: "available_slots === total_slots",
    meaning: "ว่างทั้งวัน",
    slots: "12/12 ช่วงว่าง"
  },
  
  "🟡 yellow": {
    condition: "0 < available_slots < total_slots", 
    meaning: "ว่างบางช่วง",
    slots: "เช่น 9/12 ช่วงว่าง"
  },
  
  "🔴 red": {
    condition: "available_slots === 0",
    meaning: "เต็มทั้งวัน", 
    slots: "0/12 ช่วงว่าง"
  },
  
  "⚫ gray": {
    condition: "date < today",
    meaning: "วันที่ผ่านแล้ว",
    action: "ไม่สามารถจองได้"
  }
}

// Slot Calculation (12 slots per day)
time_slots = {
  total_working_hours: "06:00-18:00 = 12 ชั่วโมง",
  lunch_break: "12:00-13:00 = 1 ชั่วโมง (ไม่นับ)",
  available_slots: "11 ชั่วโมง = 11 slots",
  slot_size: "1 ชั่วโมง/slot"
}
```

---

## ⚙️ **การตั้งค่าและ Environment**

### **Environment Variables (ไม่เปิดเผยค่าจริง)**
```bash
# Database Configuration (จาก Neon Console)
DATABASE_URL="postgresql://[username]:[password]@[host]/[database]?sslmode=require"

# JWT Configuration (Strong Secret Required)
JWT_SECRET="[your-secure-jwt-secret-key]"

# Server Configuration
PORT=8000
NODE_ENV=development

# CORS Configuration  
FRONTEND_URL="http://localhost:3000"

# Debug Configuration
ENABLE_DEBUG=true
```

### **การเริ่มต้นระบบ**
```bash
# ติดตั้ง Dependencies
bun install

# Generate Prisma Client
bun prisma generate

# Sync Database Schema (จาก Neon Console)
bun prisma db push

# เริ่มเซิร์ฟเวอร์
bun run start     # Production mode
bun run dev       # Development mode (with --watch)
```

---

## 🧪 **การทดสอบระบบ**

### **ไฟล์ทดสอบที่มี**
```javascript
// Basic Tests
quick-test.js              // ทดสอบการเชื่อมต่อฐานข้อมูล
test-calendar.js           // ทดสอบปฏิทินและสีสถานะ

// Advanced Tests  
test-advanced-logic.js     // ทดสอบ multi-day booking
test-conflict-detection.js // ทดสอบการตรวจสอบ conflict
test-final.js             // ทดสอบครอบคลุม (lunch break, cross-month)

// Data Seeding
seed-rooms.js             // เพิ่มข้อมูลห้องประชุมตัวอย่าง
seed-test-reservations.js // เพิ่มข้อมูลการจองทดสอบ
```

### **วิธีรันการทดสอบ**
```bash
# ทดสอบการเชื่อมต่อ
bun quick-test.js

# ทดสอบปฏิทิน
bun test-calendar.js

# ทดสอบ conflict detection
bun test-conflict-detection.js

# เพิ่มข้อมูลทดสอบ
bun seed-rooms.js
bun seed-test-reservations.js
```

---

## 🔒 **ความปลอดภัย (Security)**

### **การป้องกันที่มี**
```javascript
security_features = {
  password_hashing: "bcryptjs (แฮชรหัสผ่าน)",
  jwt_authentication: "JWT tokens (expire time กำหนดได้)",
  role_based_access: "เข้มงวด - แยกตาม role และ department",
  input_validation: "Email, password, citizen_id validation",
  cors_protection: "@elysiajs/cors plugin",
  sql_injection_prevention: "Prisma ORM (ป้องกัน SQL injection)",
  department_isolation: "Officer ดูได้เฉพาะคณะตัวเอง"
}
```

### **ข้อควรระวัง**
```javascript
security_notes = {
  env_file: "ห้าม commit .env ไปใน git",
  jwt_secret: "ใช้ secret ที่แข็งแกร่งใน production", 
  database_url: "เก็บเป็นความลับ - Neon จะ revoke ถ้าหลุด",
  cors_origin: "ตั้ง specific domain ใน production",
  password_policy: "บังคับอย่างน้อย 8 ตัวอักษร + ตัวเลข"
}
```

---

## 🚀 **การ Deploy และ Production**

### **ข้อมูลสำหรับ Production**
```javascript
production_checklist = {
  environment: "สร้าง .env.production แยกจาก .env",
  database: "Database URL จาก Neon Console (production instance)",
  cors: "ตั้งค่า specific frontend domain",
  jwt_secret: "เปลี่ยนเป็น secret ที่แข็งแกร่งกว่า",
  debug: "ตั้งค่า ENABLE_DEBUG=false",
  port: "ตั้งค่า PORT สำหรับ production server",
  ssl: "ใช้ HTTPS ใน production"
}
```

---

## 📞 **การ Integration กับ Frontend**

### **ข้อมูลสำคัญสำหรับ AI Frontend**
```javascript
integration_guide = {
  base_url: "http://localhost:8000/api",
  authentication: "JWT Token ใน Authorization header",
  content_type: "application/json สำหรับทุก POST/PUT request",
  error_handling: "เช็ค success: true/false ใน response",
  real_time_updates: "เรียก calendar API ซ้ำเพื่อ refresh สถานะ",
  file_uploads: "ใช้ FormData สำหรับอัปโหลดรูปโปรไฟล์"
}
```

### **ลำดับการทำงานแนะนำ**
```javascript
frontend_workflow = {
  "1_register_login": "สร้างหน้า register/login ให้เสร็จก่อน",
  "2_room_list": "สร้างหน้าดูรายการห้องประชุม",
  "3_calendar": "สร้างปฏิทินการจองตามคู่มือ CALENDAR-FRONTEND-GUIDE.md", 
  "4_booking_form": "สร้างฟอร์มจองห้องตามข้อเสนอแนะ",
  "5_my_reservations": "สร้างหน้าจัดการการจองส่วนตัว",
  "6_officer_admin": "สร้างหน้าสำหรับ officer/admin (optional)"
}
```

---

## 📚 **เอกสารเพิ่มเติม**

### **ไฟล์คู่มือที่มี**
```
CALENDAR-FRONTEND-GUIDE.md    // คู่มือสร้างปฏิทินแบบละเอียด
FRONTEND-PAGES-GUIDE.md       // คู่มือสร้างหน้าต่างๆ ทั้งหมด
FRONTEND-REGISTER-GUIDE.md    // คู่มือสร้างหน้าสมัครสมาชิก
TESTING-GUIDE.md              // คู่มือการทดสอบระบบ
PROJECT-SUMMARY.md            // สรุปโปรเจกต์โดยรวม
```

### **สิ่งที่ Backend พร้อมแล้ว**
- ✅ API Endpoints ครบถ้วน
- ✅ Authentication & Authorization
- ✅ Database Schema & Relationships  
- ✅ Business Logic (จองห้อง, conflict detection)
- ✅ Calendar System (สี, สถานะ)
- ✅ Role-based Permissions
- ✅ Error Handling
- ✅ CORS Configuration
- ✅ File Upload Support
- ✅ Comprehensive Testing

### **สิ่งที่รอ Frontend**
- 🔲 User Interface (หน้าจอทั้งหมด)
- 🔲 การเชื่อมต่อ API
- 🔲 Form Validation
- 🔲 User Experience Design
- 🔲 Responsive Design
- 🔲 Real-time Updates

---

## 🎯 **สรุปสำหรับ AI Frontend**

**Backend ระบบจองห้องประชุมนี้พร้อมใช้งาน 100%** มีทุกอย่างที่จำเป็นสำหรับการสร้าง Frontend:

1. **API ครบถ้วน** - ทุก endpoint ที่ต้องการ
2. **Authentication** - JWT-based ที่ปลอดภัย  
3. **Role-based Access** - สิทธิ์แยกตาม user type
4. **Advanced Booking Logic** - conflict detection, multi-day support
5. **Calendar System** - สีสถานะ, real-time data
6. **Comprehensive Documentation** - คู่มือครบทุกหน้า

**ขั้นตอนต่อไป**: อ่านคู่มือใน `FRONTEND-PAGES-GUIDE.md` และ `CALENDAR-FRONTEND-GUIDE.md` แล้วเริ่มสร้าง Frontend ได้เลย!

---

**🔥 Backend พร้อมแล้ว - ถึงเวลา Frontend!**
