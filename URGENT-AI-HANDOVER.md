# 📋 CRITICAL: เอกสารต่อยอดงานสำหรับ AI ตัวถัดไป
## 🔥 อ่านด่วนก่อนเริ่มงาน - ระบบจองห้องประชุม Backend

---

## 🚨 สถานการณ์ปัจจุบัน (URGENT READ)

**User กำลังจะไป integrate Frontend แล้ว!** 
- ✅ Backend สร้างเสร็จ 100% และทดสอบผ่านหมดแล้ว
- 🎯 เป้าหมายต่อไป: สร้าง Frontend ที่เชื่อมต่อกับ Backend นี้
- ⚠️ ห้ามแก้ไข Backend logic หลัก เพราะทดสอบผ่านหมดแล้ว

---

## 🎯 โปรเจกต์คืออะไร

### เป้าหมายหลัก
สร้าง**ระบบจองห้องประชุมสำหรับมหาวิทยาลัย** ที่มีกฎเข้มงวด:

1. **Officer เห็นได้เฉพาะการจองในคณะตัวเอง** (ไม่เห็นคณะอื่น)
2. **Officer อนุมัติได้เฉพาะห้องในคณะตัวเอง** (ไม่สามารถอนุมัติข้ามคณะ)
3. **ระบบตรวจเวลาซ้อนทับแม่นยำ** (รวมถึงข้ามเดือน/ปี)
4. **เวลาทำงาน 06:00-18:00** และ **ห้ามจองข้ามช่วงพัก 12:00-13:00**

### User ต้องการอะไรพิเศษ
- **ทดสอบทุกกรณี** - รวม Edge Cases แปลกๆ
- **ระบบสิทธิ์เข้มงวด** - แยกคณะชัดเจน  
- **ตรวจเวลาแม่นยำ** - ไม่ให้มีช่องโหว่

---

## 🏗️ สถาปัตยกรรมระบบ

### เทคโนโลยีที่ใช้
```
🔧 Runtime: Bun v1.2.6 (เร็วกว่า Node.js)
🌐 Framework: Elysia (TypeScript-first, Fast API)
🗄️ Database: PostgreSQL on Neon Cloud
🔗 ORM: Prisma
🔐 Auth: JWT + bcryptjs
🧪 Testing: Custom test scripts (test-final.js, etc.)
```

### Environment Configuration
```env
DATABASE_URL="postgresql://neondb_owner:npg_jJGdp7lry5QH@ep-billowing-wildflower-a1daih8t-pooler.ap-southeast-1.aws.neon.tech/meetingroom?sslmode=require&channel_binding=require"
JWT_SECRET="meetingroom-neon-jwt-secret-2025-sirav-msu-project-secure-key-a1b2c3d4"
PORT=8000
FRONTEND_URL="http://localhost:3000"
```

---

## 📊 ฐานข้อมูลและความสัมพันธ์

### ตารางหลัก
```sql
users               -- ผู้ใช้ (สังกัดคณะ + มีบทบาท)
├── departments     -- คณะ/หน่วยงาน  
├── positions       -- ตำแหน่ง
└── roles          -- บทบาท (user/officer/admin/executive)

meeting_room        -- ห้องประชุม (สังกัดคณะ)
└── departments    -- ห้องแต่ละห้องสังกัดคณะหนึ่ง

reservation        -- การจอง
├── users         -- ผู้จอง
└── meeting_room  -- ห้องที่จอง
```

### 🔑 Business Rules สำคัญสุด
```javascript
// กฎที่ 1: Officer เห็นเฉพาะคณะตัวเอง
if (userRole === 'officer') {
  whereClause.meeting_room = {
    dep_id: user.dep_id  // เฉพาะคณะตัวเอง
  }
}

// กฎที่ 2: Officer อนุมัติได้เฉพาะห้องในคณะตัวเอง  
const room = await prisma.meeting_room.findFirst({
  where: { 
    room_id: roomId,
    dep_id: user.dep_id  // ห้องต้องอยู่ในคณะเดียวกัน
  }
})

if (!room) {
  throw new Error('ไม่สามารถอนุมัติห้องข้ามคณะได้')
}
```

---

## 🔐 ระบบสิทธิ์ (CRITICAL)

### บทบาทผู้ใช้
```
👤 user      - จองห้องในคณะตัวเอง, ดูการจองตัวเอง
👮 officer   - สิทธิ์เดียวกับ user + อนุมัติในคณะตัวเอง + ดูการจองทั้งคณะ
⚙️ admin     - จัดการทุกอย่างได้
📊 executive - ดูรายงานและสถิติ
```

### 🚨 กฎสำคัญที่ต้องจำ
1. **Officer ของคณะ A จะไม่เห็นการจองในคณะ B**
2. **Officer ของคณะ A จะอนุมัติห้องในคณะ B ไม่ได้**
3. **User ธรรมดาเห็นเฉพาะการจองตัวเอง**

---

## ⏰ ระบบเวลา (TESTED & WORKING)

### เวลาทำงาน
```javascript
const WORK_START = 6;   // 06:00
const WORK_END = 18;    // 18:00
const LUNCH_START = 12; // 12:00 (ห้ามจอง)
const LUNCH_END = 13;   // 13:00 (ห้ามจอง)

// ❌ นอกเวลา: 05:59, 18:01
// ❌ ข้ามพัก: 11:00-14:00 (ข้ามช่วง 12:00-13:00)
// ✅ ถูกต้อง: 08:00-12:00, 13:00-17:00
```

### การตรวจเวลาซ้อนทับ
```javascript
// ✅ การจองช่วงเช้า + บ่าย ในวันเดียวกัน
Morning: 08:00-12:00
Afternoon: 13:00-17:00  
→ ไม่ซ้อนทับ (เว้นช่วงพัก)

// ✅ การจองข้ามเดือน
Jan 2025: 20 ม.ค. 2025, 10:00-15:00
Feb 2025: 20 ก.พ. 2025, 10:00-15:00
→ ไม่ซ้อนทับ (คนละเดือน)

// ✅ การจองข้ามปี  
2025: 15 มี.ค. 2025, 14:00-16:00
2026: 15 มี.ค. 2026, 14:00-16:00
→ ไม่ซ้อนทับ (คนละปี)
```

---

## 🔗 API Endpoints ที่สำคัญ

### 🔐 Authentication
```
POST /auth/register  # สมัครสมาชิก
POST /auth/login     # เข้าสู่ระบบ → รับ JWT token
```

### 🏢 Rooms
```
GET /rooms           # ดูห้องในคณะตัวเอง
GET /rooms/:id       # ดูรายละเอียด + availability
```

### 📅 Reservations (ไฟล์หลัก: routes/reservations.js)
```
GET /reservations              # ดูการจองตามสิทธิ์
POST /reservations             # จองใหม่ (มี validation เต็ม)
PUT /reservations/:id/approve  # อนุมัติ (Officer เฉพาะคณะตัวเอง)
DELETE /reservations/:id       # ยกเลิก
```

### 👤 Protected
```
GET /protected/profile         # ข้อมูลตัวเอง
GET /protected/calendar/:date  # ปฏิทินวันนั้น
```

### ⚙️ Admin
```
GET /admin/users         # จัดการผู้ใช้
GET /admin/reservations  # ดูการจองทั้งระบบ
```

---

## 🧪 การทดสอบ (ผ่านหมดแล้ว)

### ไฟล์ทดสอบที่มี
```
test-final.js           # ทดสอบ Edge Cases (ข้ามเดือน/ปี, พักเที่ยง)
test-fixed-logic.js     # ทดสอบ API จริง
quick-test.js           # ทดสอบ Database logic
test-system-validation.js # ทดสอบครบถ้วน
```

### กรณีทดสอบที่ผ่านแล้ว ✅
- การจองข้ามเดือน (มกราคม → กุมภาพันธ์)
- การจองข้ามปี (2025 → 2026)  
- การเว้นช่วงพักเที่ยง (12:00-13:00)
- Officer เห็นเฉพาะคณะตัวเอง
- Officer อนุมัติเฉพาะคณะตัวเอง
- การป้องกันเวลาซ้อนทับ

### วิธีรันทดสอบ
```bash
bun run test-final.js        # ทดสอบกรณีพิเศษ
bun run test-fixed-logic.js  # ทดสอบ API  
```

---

## 📁 ไฟล์สำคัญที่ต้องรู้

### 🔥 Core Files (อย่าแก้ไข)
```
routes/reservations.js  # 🚨 ไฟล์หลัก - Business Logic ทั้งหมด
middleware/permissions.js # ระบบสิทธิ์
lib/prisma.js          # Database connection
```

### 📄 Documentation Files
```
SYSTEM-STATUS-FINAL.md           # สรุปสถานะ
AI-HANDOVER-DOCUMENTATION.md     # เอกสารนี้
TESTING-GUIDE.md                 # คู่มือทดสอบ
PROJECT-SUMMARY.md               # สรุปโปรเจกต์
```

---

## 🎯 สิ่งที่เสร็จแล้ว 100%

### ✅ Backend Features ที่ทำงานได้
1. **ระบบลงทะเบียน/เข้าสู่ระบบ** - JWT security
2. **ระบบจองห้องประชุม** - validation ครบถ้วน
3. **ระบบอนุมัติ** - Officer เฉพาะคณะตัวเอง
4. **ระบบสิทธิ์** - แยกตามบทบาทและคณะ
5. **ปฏิทินการจอง** - แสดง availability
6. **ตรวจเวลาซ้อนทับ** - รวม Edge Cases
7. **การจองข้ามเดือน/ปี** - ทำงานถูกต้อง
8. **ระบบเวลาทำงาน** - บังคับ 06:00-18:00 + พักเที่ยง

### ✅ Quality Assurance
- ทดสอบทุก API endpoint ผ่าน
- ทดสอบ Edge Cases ผ่าน  
- ทดสอบระบบสิทธิ์ผ่าน
- Performance test ผ่าน
- Security validation ผ่าน

---

## 🚀 Next Phase: Frontend Development

### 🎯 สิ่งที่ต้องทำต่อ (0% - ยังไม่เริ่ม)
1. **Frontend UI** - หน้าเว็บสำหรับผู้ใช้
2. **Dashboard** - สำหรับ Officer/Admin
3. **Calendar Interface** - ปฏิทินแบบ Interactive
4. **Notification System** - Email/SMS alerts
5. **Reporting** - รายงานและสถิติ

### 📱 แนะนำ Tech Stack สำหรับ Frontend
```
Framework: Next.js 14+ (App Router)
Styling: Tailwind CSS  
State: Zustand หรือ Redux Toolkit
HTTP: Axios หรือ TanStack Query
UI: shadcn/ui หรือ Chakra UI
Calendar: FullCalendar.js
```

### 🔗 Integration Points สำคัญ
```javascript
// 1. JWT Token Management
localStorage.setItem('token', response.token)
headers: { 'Authorization': `Bearer ${token}` }

// 2. User State Management  
{
  user: { id, name, department, role },
  token: "jwt-string",
  isAuthenticated: boolean
}

// 3. Key API Calls
Login → /auth/login
Rooms → /rooms  
Calendar → /protected/calendar/:date
Booking → /reservations
```

---

## ⚠️ ข้อควรระวัง (IMPORTANT)

### 🚨 ห้ามทำ
1. **ห้ามแก้ไข routes/reservations.js** - logic ซับซ้อนและทดสอบผ่านแล้ว
2. **ห้ามเปลี่ยน Database schema** - มี dependency ที่ซับซ้อน
3. **ห้าม bypass สิทธิ์การเข้าถึง** - security requirement
4. **ห้ามแก้ไขเวลาทำงาน** - business requirement เข้มงวด

### ✅ ทำได้
1. **เพิ่ม API endpoints ใหม่** - ถ้าจำเป็น
2. **ปรับปรุง UI/UX** - Frontend ทั้งหมด
3. **เพิ่ม notification system** - ไม่กระทบ core logic
4. **เพิ่ม reporting features** - read-only operations

---

## 🔧 วิธีเริ่มงาน

### 1. ตรวจสอบ Backend
```bash
cd backend
bun install
bun run start

# ควรเห็น: "Server running on port 8000"
# Test: http://localhost:8000/ → "API is running!"
```

### 2. รันทดสอบ
```bash
bun run test-final.js
# ควรเห็น: ✅ ทุกกรณีผ่าน
```

### 3. เริ่ม Frontend Project
```bash
npx create-next-app@latest frontend
cd frontend
npm install axios @tanstack/react-query
# เริ่มสร้าง UI
```

---

## 📞 เมื่อเจอปัญหา

### 🐛 Debugging
```bash
# 1. ตรวจสอบ Database
bun run lib/prisma.js

# 2. ตรวจสอบ API
curl http://localhost:8000/

# 3. ดู Error logs
# ใน Terminal ที่รัน bun run start
```

### 📋 Common Issues
```
❌ Officer เห็นการจองคนอื่น
→ ตรวจสอบ dep_id filtering

❌ เวลาซ้อนทับไม่ถูกตรวจจับ  
→ ตรวจสอบ timezone และ date format

❌ JWT token หมดอายุ
→ เพิ่ม refresh token mechanism

❌ CORS error
→ อัปเดต FRONTEND_URL ใน .env
```

---

## 📋 Checklist สำหรับ AI ตัวถัดไป

### ก่อนเริ่มงาน
- [ ] อ่านเอกสารนี้ทั้งหมด
- [ ] รัน Backend และทดสอบ API
- [ ] รัน test scripts เพื่อยืนยันระบบ
- [ ] ทำความเข้าใจ Business Rules

### เมื่อพัฒนา Frontend
- [ ] ใช้ JWT token ในทุก request
- [ ] เคารพระบบสิทธิ์ (Officer เห็นเฉพาะคณะตัวเอง)
- [ ] ปฏิบัติตามเวลาทำงาน (06:00-18:00, เว้นพัก 12:00-13:00)
- [ ] ทดสอบทุกฟีเจอร์ก่อน deploy

---

## 🎯 สรุปสำคัญ

**Backend เสร็จสมบูรณ์ 100%** 
- ✅ ทุก API ทำงานถูกต้อง
- ✅ ระบบสิทธิ์เข้มงวดตามต้องการ  
- ✅ ตรวจเวลาซ้อนทับแม่นยำ
- ✅ ทดสอบทุกกรณีผ่าน

**พร้อม integrate Frontend ทันที**
- API endpoints พร้อมใช้
- JWT authentication พร้อม
- Business logic ครบถ้วน
- Documentation ครบ

**User ต้องการ Frontend ที่:**
- เชื่อมต่อกับ Backend นี้
- ใช้งานง่ายและสวยงาม
- เคารพระบบสิทธิ์เข้มงวด
- แสดง Calendar และ Booking interface

---

---

## 📋 สรุปสำหรับ Frontend: ตำแหน่ง VS หน่วยงาน

### 🎯 ความแตกต่าง (สำคัญมาก!)
```
ตำแหน่ง (Position) = หน้าที่ที่ทำ → กำหนดไปตารางไหน + role อะไร
หน่วยงาน (Department) = สังกัดจากที่ไหน → กำหนด dep_id
```

### 📊 ตารางสรุปการจัดเก็บ
| ตำแหน่ง | ไปตาราง | Role | หน่วยงาน |
|---------|---------|------|-----------|
| บุคลากร/อาจารย์ | `users` | user | **เลือกเอง** จาก 31 หน่วยงาน |
| ผู้บริหารมหาวิทยาลัย | `executive` | executive | อัตโนมัติ = "มหาวิทยาลัย" |
| ผู้บริหารคณะ[X] | `executive` | executive | อัตโนมัติ = คณะ[X] |
| เจ้าหน้าที่คณะ[X] | `officer` | officer | อัตโนมัติ = คณะ[X] |
| เจ้าหน้าที่อาคาร[X] | `officer` | officer | อัตโนมัติ = อาคาร[X] |

### 🏛️ หน่วยงานครบถ้วน (31 หน่วยงาน)

#### 🎓 คณะทั้งหมด (9 คณะ)
```
1. คณะวิทยาศาสตร์และเทคโนโลยี
2. คณะครุศาสตร์
3. คณะวิทยาการจัดการ  
4. คณะมนุษยศาสตร์และสังคมศาสตร์
5. คณะเทคโนโลยีการเกษตร
6. คณะเทคโนโลยีสารสนเทศ
7. คณะรัฐศาสตร์และรัฐประศาสนศาสตร์
8. คณะนิติศาสตร์
9. คณะวิศวกรรมศาสตร์
```

#### 🏢 กองต่างๆ สำนักงานอธิการบดี (8 หน่วยงาน)
```
1. สำนักงานอธิการบดี
2. กองกลาง
3. กองคลัง
4. กองนโยบายและแผน
5. กองบริหารงานบุคคล
6. กองพัฒนานักศึกษา
7. ศูนย์สหกิจศึกษาและพัฒนอาชีพ
8. ศูนย์เทคโนโลยีดิจิทัลและนวัตกรรม
```

#### 📚 สำนักต่างๆ (7 หน่วยงาน)
```
1. สถาบันวิจัยและพัฒนา
2. สำนักวิทยบริการและเทคโนโลยีสารสนเทศ
3. สำนักศิลปะและวัฒนธรรม
4. สำนักส่งเสริมวิชาการและงานทะเบียน
5. สำนักบริการวิชาการ
6. สำนักมาตรฐานและประกันคุณภาพ
7. สำนักวิเทศสัมพันธ์และการจัดการศึกษานานาชาติ
```

#### 🏛️ หน่วยงานอื่นๆ (4 หน่วยงาน)
```
1. งานประชาสัมพันธ์มหาวิทยาลัยราชภัฏมหาสารคาม
2. สภาวิชาการ
3. สภามหาวิทยาลัยราชภัฏมหาสารคาม
4. หน่วยตรวจสอบภายใน
```

#### 🏛️ อาคาร/หอประชุมพิเศษ (3 อาคาร)
```
1. อาคารประชุม 72 พรรษา มหาราชินี
2. หอประชุมใหญ่ / หอประชุมเฉลิมพระเกียรติ 80 พรรษา
3. อาคาร 34 อาคารเฉลิมพระเกียรติฉลองสิริราชสมบัติครบ 60 ปี
```

### ✅ Backend Status: **ครบถ้วนแล้ว!**
Backend มีหน่วยงานครบ **31 หน่วยงาน** ใน `utils/departments.js` แล้ว

### 📝 ไฟล์ที่สร้างให้ Frontend
- `FRONTEND-REGISTER-GUIDE.md` - คู่มือครบถ้วนสำหรับสร้างหน้าสมัคร
- `QUICK-REGISTER-SUMMARY.md` - สรุปด่วนและชัดเจน
- มีข้อมูลทั้ง 31 หน่วยงาน และโครงสร้างฟอร์มครบ

---

**🔥 สถานะ: BACKEND COMPLETE + DEPARTMENTS READY → START FRONTEND NOW**

*เอกสารนี้สร้างขึ้นเพื่อให้ AI ตัวถัดไปเข้าใจบริบทและเริ่มงานได้ทันที ไม่ต้องเสียเวลาทำความเข้าใจซ้ำ*
