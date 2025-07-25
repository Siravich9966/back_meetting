# 🧪 สรุปการทดสอบระบบจองห้องประชุม - สำหรับ AI คนต่อไป

## 📋 Overview การทดสอบ

คุณ (User) ได้ให้ทดสอบระบบอย่างครอบคลุมใน **หลายด้าน** เพื่อให้แน่ใจว่าระบบทำงานถูกต้องตามการออกแบบ โดยเน้น **ความปลอดภัย** และ **การแยกสิทธิ์** อย่างเข้มงวด

---

## 🔐 การทดสอบระบบ Authentication & Authorization

### **1. การทดสอบการสมัครสมาชิก (Registration Testing)**

#### **สิ่งที่ต้องทดสอบ:**
- ✅ **Position-based Role Assignment**: เลือกตำแหน่งแล้วได้ role ที่ถูกต้องหรือไม่
- ✅ **Database Storage**: ข้อมูลเก็บใน table ที่ถูกต้องหรือไม่ (users/officer/admin)
- ✅ **Department Mapping**: แมปคณะกับตำแหน่งถูกต้องหรือไม่

#### **Test Cases ที่ต้องรัน:**
```javascript
// Test 1: สมัครเป็น User (นักศึกษา/อาจารย์)
{
  position: "อาจารย์",
  department: "คณะเทคโนโลยีสารสนเทศ",
  expected_role: "user",
  expected_table: "users"
}

// Test 2: สมัครเป็น Officer (เจ้าหน้าที่)
{
  position: "เจ้าหน้าที่คณะ",
  department: "คณะเทคโนโลยีสารสนเทศ",
  expected_role: "officer", 
  expected_table: "officer"
}

// Test 3: สมัครเป็น Admin (ผู้ดูแลระบบ)
{
  position: "ผู้ดูแลระบบ",
  department: "ศูนย์เทคโนโลยีสารสนเทศ",
  expected_role: "admin",
  expected_table: "admin"
}
```

#### **ผลลัพธ์ที่ต้องการ:**
- ✅ ข้อมูลต้องเก็บใน table ที่ถูกต้องตาม role
- ✅ role_id ต้องชี้ไปยัง roles table ที่ถูกต้อง
- ✅ department ต้องตรงกับตำแหน่งที่เลือก
- ✅ password ต้อง hash ด้วย bcrypt
- ✅ email ต้อง unique ใน database

### **2. การทดสอบการเข้าสู่ระบบ (Login Testing)**

#### **สิ่งที่ต้องทดสอบ:**
- ✅ **JWT Token Generation**: ได้ token ที่ถูกต้องหรือไม่
- ✅ **Role Information in Token**: token มีข้อมูล role ที่ถูกต้องหรือไม่
- ✅ **Cross-table Login**: login ด้วย email เดียวกันใน table ต่างกันได้หรือไม่

#### **Test Scenarios:**
```javascript
// Scenario 1: Login เป็น User
login("user@test.com", "password") 
→ ต้องได้ token ที่มี role: "user"

// Scenario 2: Login เป็น Officer  
login("officer@test.com", "password")
→ ต้องได้ token ที่มี role: "officer", department: "คณะเทคโนโลยีสารสนเทศ"

// Scenario 3: Login เป็น Admin
login("admin@test.com", "password") 
→ ต้องได้ token ที่มี role: "admin"
```

---

## 🏢 การทดสอบระบบสิทธิ์ตาม Department (หลัก!)

### **3. การทดสอบสิทธิ์ Officer (สำคัญมาก!)**

#### **สิ่งที่ต้องทดสอบ:**

##### **A. Officer เห็นการจองของ Department ตัวเองเท่านั้น**
```javascript
// Test Setup:
// - Officer A: department = "คณะเทคโนโลยีสารสนเทศ"
// - Officer B: department = "คณะครุศาสตร์"
// - User จอง room ของ คณะเทคโนโลยีสารสนเทศ

// Test Case 1: Officer A ควรเห็นการจอง
GET /api/protected/officer/reservations (Officer A token)
→ ต้องเห็นการจองของ คณะเทคโนโลยีสารสนเทศ

// Test Case 2: Officer B ไม่ควรเห็นการจอง
GET /api/protected/officer/reservations (Officer B token)  
→ ต้องไม่เห็นการจองของ คณะเทคโนโลยีสารสนเทศ (empty array)
```

##### **B. Officer อนุมัติได้เฉพาะห้องใน Department ตัวเอง**
```javascript
// Test Setup:
// - Reservation ID 123: room ของ คณะเทคโนโลยีสารสนเทศ
// - Reservation ID 456: room ของ คณะครุศาสตร์

// Test Case 1: Officer A อนุมัติใน department ตัวเอง (ต้องสำเร็จ)
POST /api/protected/officer/reservations/123/approve (Officer A token)
→ Status: 200, reservation status = "approved"

// Test Case 2: Officer A อนุมัติข้าม department (ต้องถูกปฏิเสธ)
POST /api/protected/officer/reservations/456/approve (Officer A token)
→ Status: 403, message: "ไม่มีสิทธิ์อนุมัติการจองนี้"
```

##### **C. Officer จัดการห้องประชุมได้เฉพาะ Department ตัวเอง**
```javascript
// Test Case 1: ดูห้องใน department ตัวเอง
GET /api/protected/officer/rooms (Officer A token)
→ ต้องเห็นเฉพาะห้องของ คณะเทคโนโลยีสารสนเทศ

// Test Case 2: เพิ่มห้องใน department ตัวเอง (ต้องสำเร็จ)
POST /api/protected/officer/rooms (Officer A token)
{
  room_name: "ห้องประชุม IT-301",
  department: "คณะเทคโนโลยีสารสนเทศ"
}
→ Status: 201, สร้างห้องสำเร็จ

// Test Case 3: เพิ่มห้องข้าม department (ต้องถูกปฏิเสธ)
POST /api/protected/officer/rooms (Officer A token)
{
  room_name: "ห้องประชุม ED-201", 
  department: "คณะครุศาสตร์"
}
→ Status: 403, message: "ไม่มีสิทธิ์จัดการห้องประชุมนี้"
```

---

## 📅 การทดสอบระบบจองห้องประชุม (Advanced Features)

### **4. การทดสอบ Conflict Detection**

#### **สิ่งที่ต้องทดสอบ:**
- ✅ **Multi-day Booking Conflicts**: การจองหลายวันที่ซ้อนทับ
- ✅ **Same-day Time Conflicts**: เวลาในวันเดียวกันที่ขัดแย้ง
- ✅ **Partial-day Overlaps**: การซ้อนทับแบบบางส่วน
- ✅ **Edge Cases**: เวลาติดกัน (จบพอดีเริ่ม)

#### **Test Scenarios (Advanced Booking):**
```javascript
// Scenario 1: Multi-day Conference
// Base: จอง 20-22 Dec 2024, 9:00-17:00
// Test: จอง 21 Dec 2024, 10:00-11:00 → ต้องขัดแย้ง (409)

// Scenario 2: Same-day Overlaps  
// Base: จอง 25 Dec 2024, 9:00-11:00
// Test: จอง 25 Dec 2024, 10:30-12:30 → ต้องขัดแย้ง (409)

// Scenario 3: Same-day Non-overlapping
// Base: จอง 25 Dec 2024, 9:00-11:00 และ 14:00-16:00
// Test: จอง 25 Dec 2024, 12:00-13:00 → ต้องสำเร็จ (201)

// Scenario 4: Edge Case - Adjacent Times
// Base: จอง 25 Dec 2024, 9:00-11:00
// Test: จอง 25 Dec 2024, 11:00-14:00 → ต้องสำเร็จ (201)
```

### **5. การทดสอบ Calendar API**

#### **สิ่งที่ต้องทดสอบ:**
- ✅ **Basic Calendar**: แสดงการจองใน month/year
- ✅ **Detailed Calendar**: แสดง hourly time slots 
- ✅ **Availability Status**: สถานะ available/booked ของแต่ละชั่วโมง

#### **Test Cases:**
```javascript
// Test 1: Basic Calendar
GET /api/reservations/calendar/1?month=12&year=2024
→ ต้องได้ list การจองใน December 2024

// Test 2: Detailed Calendar  
GET /api/reservations/calendar/1?month=12&year=2024&detailed=true
→ ต้องได้ hourly slots พร้อม availability status

// Test 3: Empty Month
GET /api/reservations/calendar/1?month=1&year=2025  
→ ต้องได้ empty calendar แต่มี daily_availability structure
```

---

## 👑 การทดสอบระบบ Admin

### **6. การทดสอบสิทธิ์ Admin**

#### **สิ่งที่ต้องทดสอบ:**
- ✅ **User Management**: จัดการสมาชิกได้ แต่ไม่จัดการห้องประชุมได้
- ✅ **Executive Data Access**: เห็นข้อมูล executive ได้
- ✅ **Statistics**: ดูสถิติระบบทั้งหมดได้

#### **Test Cases:**
```javascript
// Test 1: Admin ดูข้อมูลสมาชิกทั้งหมด (ต้องสำเร็จ)
GET /api/protected/admin/all-users (Admin token)
→ Status: 200, ได้ข้อมูลจาก 3 tables (users, officer, admin)

// Test 2: Admin promote user เป็น officer (ต้องสำเร็จ)
POST /api/protected/admin/promote/user-to-officer (Admin token)
→ Status: 200, ย้าย user จาก users table → officer table

// Test 3: Admin จัดการห้องประชุม (ต้องถูกปฏิเสธ)
POST /api/protected/officer/rooms (Admin token)
→ Status: 403, message: "Admin ไม่มีสิทธิ์จัดการห้องประชุม"
```

---

## 🏛️ การทดสอบระบบ Executive (READ ONLY)

### **7. การทดสอบสิทธิ์ Executive**

#### **สิ่งที่ต้องทดสอบ:**
- ✅ **Read-only Access**: ดูข้อมูลได้ แต่แก้ไขไม่ได้
- ✅ **University vs Faculty Executive**: สิทธิ์ต่างกันตาม position

#### **Test Cases:**
```javascript
// Test 1: University Executive ดู report ทุกคณะ (ต้องสำเร็จ)
GET /api/protected/executive/reports (University Executive token)
→ Status: 200, ได้ข้อมูลทุกคณะ

// Test 2: Faculty Executive ดู report เฉพาะคณะตัวเอง (ต้องสำเร็จ)
GET /api/protected/executive/reports (Faculty Executive token)
→ Status: 200, ได้ข้อมูลเฉพาะคณะตัวเอง

// Test 3: Executive พยายามแก้ไขข้อมูล (ต้องถูกปฏิเสธ)
POST /api/protected/officer/rooms (Executive token)
→ Status: 403, message: "Executive เป็น read-only"
```

---

## 🔄 การทดสอบ Workflow การจอง

### **8. การทดสอบ Complete Reservation Flow**

#### **สิ่งที่ต้องทดสอบ:**
- ✅ **User → Officer → Status Change**: ขั้นตอนการอนุมัติสมบูรณ์
- ✅ **Department Isolation**: Officer เห็นแค่การจองใน department ตัวเอง
- ✅ **Status Transitions**: pending → approved/rejected

#### **Complete Test Scenario:**
```javascript
// Step 1: User จองห้องคณะ IT
POST /api/protected/reservations (User token)
{
  room_id: 1, // ห้องคณะเทคโนโลยีสารสนเทศ
  start_at: "2024-12-25",
  start_time: "09:00",
  end_time: "11:00",
  details_r: "ประชุมโครงงาน"
}
→ Status: 201, reservation status = "pending"

// Step 2: Officer คณะ IT เห็นการจอง
GET /api/protected/officer/reservations (IT Officer token)
→ Status: 200, เห็นการจองของ User

// Step 3: Officer คณะอื่น ไม่เห็นการจอง
GET /api/protected/officer/reservations (Education Officer token)
→ Status: 200, ไม่เห็นการจองของ User (empty array)

// Step 4: Officer คณะ IT อนุมัติ
POST /api/protected/officer/reservations/{id}/approve (IT Officer token)
→ Status: 200, reservation status = "approved"

// Step 5: Officer คณะอื่น พยายามอนุมัติ (ต้องถูกปฏิเสธ)
POST /api/protected/officer/reservations/{id}/approve (Education Officer token)
→ Status: 403, message: "ไม่มีสิทธิ์อนุมัติการจองนี้"
```

---

## 📊 การทดสอบ Data Integrity

### **9. การทดสอบความถูกต้องของข้อมูล**

#### **สิ่งที่ต้องทดสอบ:**
- ✅ **Referential Integrity**: Foreign keys ถูกต้อง
- ✅ **Data Consistency**: ข้อมูลสอดคล้องกันข้าม tables
- ✅ **Validation Rules**: ข้อมูลผ่าน validation

#### **Test Cases:**
```javascript
// Test 1: Department Consistency
// Officer department ต้องตรงกับ room department ที่จัดการ

// Test 2: Role Mapping  
// role_id ใน users/officer/admin tables ต้องชี้ไปยัง roles table ที่ถูกต้อง

// Test 3: Reservation Relationships
// reservation.user_id ต้องมีอยู่ใน users table
// reservation.room_id ต้องมีอยู่ใน meeting_room table
// reservation.officer_id ต้องมีอยู่ใน officer table (ถ้ามี)
```

---

## 🚀 การทดสอบ Performance & Scalability

### **10. การทดสอบประสิทธิภาพ**

#### **สิ่งที่ต้องทดสอบ:**
- ✅ **API Response Time**: < 100ms สำหรับ query ธรรมดา
- ✅ **Concurrent Bookings**: จัดการการจองพร้อมกันได้
- ✅ **Large Dataset**: ทำงานได้กับข้อมูลจำนวนมาก

#### **Test Scenarios:**
```javascript
// Test 1: Concurrent Booking Conflicts
// 2 users จองห้องเดียวกัน เวลาเดียวกัน พร้อมกัน
// → เฉพาะ 1 คนได้ อีกคนต้องได้ 409 Conflict

// Test 2: Heavy Load Testing  
// Officer ดูการจองเมื่อมีการจอง 1000+ รายการ
// → ต้อง response ภายใน 200ms

// Test 3: Complex Calendar Query
// Calendar API เมื่อมีการจอง 100+ รายการในเดือนเดียว
// → ต้อง response ภายใน 300ms
```

---

## 📝 Test Scripts ที่มีอยู่

### **สคริปต์ทดสอบที่พร้อมใช้:**

1. **`test-api-conflicts.js`** - ทดสอบ Advanced Booking Conflicts
2. **`test-reservation-flow.js`** - ทดสอบ Complete Workflow
3. **`test-advanced-scenarios.js`** - ทดสอบ Complex Scenarios
4. **`setup-test-data.js`** - สร้างข้อมูลทดสอบ
5. **`run-tests.ps1`** - รันทดสอบทั้งหมด

### **วิธีการรันทดสอบ:**
```bash
# รันทดสอบทั้งหมด
.\run-tests.ps1

# รันทดสอบแยกตัว
bun test-api-conflicts.js      # Advanced booking conflicts
bun test-reservation-flow.js   # Complete workflow
bun setup-test-data.js         # Setup data first
```

---

## ✅ ผลลัพธ์ที่ต้องการทุก Test

### **Critical Success Criteria:**

#### **1. Security (ความปลอดภัย)**
- ❌ **ห้าม** Officer เห็นข้อมูลข้าม department
- ❌ **ห้าม** User อนุมัติการจองได้
- ❌ **ห้าม** Admin จัดการห้องประชุมได้
- ❌ **ห้าม** Executive แก้ไขข้อมูลใดๆ ได้

#### **2. Data Integrity (ความถูกต้องของข้อมูล)**
- ✅ ข้อมูลเก็บใน table ที่ถูกต้องตาม role
- ✅ Department mapping ถูกต้อง 100%
- ✅ Foreign keys ทำงานถูกต้อง
- ✅ Validation rules ทำงานครบถ้วน

#### **3. Business Logic (ตรรกะทางธุรกิจ)**
- ✅ Conflict detection ทำงาน 100% ถูกต้อง
- ✅ Workflow การอนุมัติสมบูรณ์
- ✅ Calendar API แม่นยำ
- ✅ Time zone handling ถูกต้อง

#### **4. Performance (ประสิทธิภาพ)**
- ✅ API response < 100ms
- ✅ รองรับ concurrent users
- ✅ Scalable architecture

---

## 🎯 การทดสอบที่ต้องทำเพิ่มเติม

### **Test Cases ที่ยังขาด:**

1. **Email Validation Testing** - ตรวจสอบ email format
2. **Password Security Testing** - ความแข็งแรงของ password
3. **Session Management Testing** - JWT expiration
4. **File Upload Testing** - รูปภาพห้องประชุม (ถ้ามี)
5. **Audit Trail Testing** - บันทึกการใช้งาน
6. **Backup/Recovery Testing** - การสำรองข้อมูล

### **Integration Testing:**
1. **Database Migration Testing** - การ migrate schema
2. **Environment Testing** - Dev/Staging/Production
3. **Cross-browser Testing** - เมื่อมี Frontend
4. **Mobile Responsiveness** - เมื่อมี Mobile App

---

## 🔍 Tips สำหรับ AI คนต่อไป

### **สิ่งสำคัญที่ต้องจำ:**

1. **Department Isolation คือหัวใจ** - Officer ต้องเห็นแค่ของตัวเอง
2. **3-Table System** - แต่ละ role แยก table = ความปลอดภัยสูง
3. **Advanced Conflict Detection** - Algorithm ซับซ้อน ต้องทดสอบทุก edge case
4. **Real User Scenarios** - ต้องจำลองการใช้งานจริงของมหาวิทยาลัย
5. **Performance Matters** - Response time ต้องเร็วสำหรับ production

### **การรันทดสอบอย่างมีประสิทธิภาพ:**
```bash
# 1. Setup ข้อมูลทดสอบ
bun setup-test-data.js

# 2. รัน server
$env:PORT=8001; bun index.js

# 3. รันทดสอบทั้งหมด
.\run-tests.ps1

# 4. ตรวจสอบผลลัพธ์ใน console
# 5. วิเคราะห์ error logs (ถ้ามี)
```

**ระบบนี้ต้องผ่านการทดสอบทุกข้อ ก่อนนำไปใช้งานจริง!** 🚀
