# 🎯 คู่มือสร้าง Dashboard สำหรับ Frontend AI
## ระบบจองห้องประชุม - 4 ระดับผู้ใช้งาน

---

## 🔐 **1. USER (บุคลากร/อาจารย์)** - role_id: 3

### ✅ **สิ่งที่ควรเห็น**

#### 📊 **Dashboard หลัก**
```javascript
// API: GET /api/protected/profile
{
  "user_info": {
    "name": "สมชาย ใจดี",
    "email": "somchai@example.com",
    "department": "คณะเทคโนโลยีสารสนเทศ", 
    "position": "บุคลากร/อาจารย์ มหาวิทยาลัยราชภัฏมหาสารคาม",
    "role": "user"
  },
  "quick_stats": {
    "total_bookings": 15,
    "pending_bookings": 2,
    "approved_bookings": 12, 
    "rejected_bookings": 1,
    "this_month_bookings": 5
  }
}
```

#### 📅 **การจองของตัวเอง**
```javascript
// API: GET /api/protected/reservations
{
  "my_reservations": [
    {
      "reservation_id": 1,
      "room_name": "ห้องประชุม IT-301",
      "department": "คณะเทคโนโลยีสารสนเทศ",
      "start_date": "2025-08-05",
      "end_date": "2025-08-05",
      "start_time": "09:00",
      "end_time": "11:00", 
      "status": "pending", // pending/approved/rejected
      "details": "ประชุมวางแผนโครงการ",
      "approved_by": null,
      "created_at": "2025-08-03T10:30:00"
    }
  ]
}
```

#### 🏢 **ห้องประชุมทั้งหมด (ดูได้)**
```javascript
// API: GET /api/rooms
{
  "all_rooms": [
    {
      "room_id": 1,
      "room_name": "ห้องประชุม IT-301", 
      "department": "คณะเทคโนโลยีสารสนเทศ",
      "capacity": 20,
      "location": "อาคาร 2 ชั้น 3",
      "equipment": ["โปรเจคเตอร์", "เครื่องเสียง", "WiFi"],
      "status": "available"
    }
  ]
}
```

#### 📆 **ปฏิทินการจอง**
```javascript
// API: GET /api/reservations/calendar/:roomId?detailed=true
{
  "calendar": {
    "working_hours": { "start": 6, "end": 18, "lunch_break": {"start": 12, "end": 13} },
    "daily_availability": [
      {
        "date": "2025-08-05",
        "slots": [
          { "time": "06:00", "available": true },
          { "time": "09:00", "available": false, "reason": "จองแล้ว" },
          { "time": "12:00", "available": false, "reason": "พักเที่ยง" }
        ]
      }
    ]
  }
}
```

#### ⚡ **การดำเนินการที่ทำได้**
- ✅ จองห้องประชุม: `POST /api/protected/reservations`
- ✅ ดูการจองตัวเอง: `GET /api/protected/reservations`
- ✅ แก้ไขการจอง (เฉพาะ pending): `PUT /api/protected/reservations/:id`
- ✅ ยกเลิกการจอง: `DELETE /api/protected/reservations/:id`
- ✅ ดูรายละเอียดการจอง: `GET /api/protected/reservations/:id`

### ❌ **สิ่งที่ไม่ควรเห็น**
- การจองของคนอื่น
- ฟังก์ชันอนุมัติ/ปฏิเสธ
- การจัดการห้องประชุม
- ข้อมูลส่วนตัวของผู้อื่น
- รายงานระบบ

### ⚠️ **ข้อจำกัด**
- จองได้เฉพาะ 06:00-18:00
- ห้ามจองช่วง 12:00-13:00 (พักเที่ยง)
- แก้ไขได้เฉพาะสถานะ "pending"

---

## 👨‍💼 **2. OFFICER (เจ้าหน้าที่)** - role_id: 2

### ✅ **สิ่งที่ควรเห็น**

#### 📊 **Officer Dashboard**
```javascript
// API: GET /api/protected/officer/area
{
  "officer_info": {
    "name": "สมหญิง ใจดี",
    "department": "คณะเทคโนโลยีสารสนเทศ",
    "position": "เจ้าหน้าที่ดูแลห้องประชุมคณะเทคโนโลยีสารสนเทศ",
    "role": "officer"
  },
  "department_stats": {
    "pending_approvals": 5,
    "total_rooms": 3,
    "today_reservations": 8,
    "this_month_reservations": 120
  }
}
```

#### 🏢 **ห้องประชุมในคณะตัวเอง**
```javascript
// API: GET /api/protected/officer/rooms
{
  "my_department_rooms": [
    {
      "room_id": 1,
      "room_name": "ห้องประชุม IT-301",
      "department": "คณะเทคโนโลยีสารสนเทศ", // เฉพาะคณะตัวเอง
      "capacity": 20,
      "location": "อาคาร 2 ชั้น 3", 
      "status": "available",
      "total_reservations": 45
    }
  ]
}
```

#### 📋 **การจองที่รออนุมัติ (คณะตัวเอง)**
```javascript
// API: GET /api/protected/officer/reservations?status=pending
{
  "pending_reservations": [
    {
      "reservation_id": 1,
      "room_name": "ห้องประชุม IT-301",
      "reserved_by": "สมชาย ใจดี",
      "user_email": "somchai@example.com",
      "user_department": "คณะเทคโนโลยีสารสนเทศ", // เฉพาะคณะตัวเอง
      "start_date": "2025-08-05",
      "start_time": "09:00",
      "end_time": "11:00",
      "details": "ประชุมวางแผนโครงการ",
      "status": "pending",
      "created_at": "2025-08-03T10:30:00"
    }
  ]
}
```

#### ⚡ **การดำเนินการที่ทำได้**
- ✅ ดูการจองในคณะตัวเอง: `GET /api/protected/officer/reservations`
- ✅ อนุมัติการจอง: `PUT /api/protected/officer/reservations/:id/approve`
- ✅ ปฏิเสธการจอง: `PUT /api/protected/officer/reservations/:id/reject`
- ✅ จัดการห้องประชุมในคณะ: `POST/PUT/DELETE /api/protected/officer/rooms`
- ✅ ดูข้อมูลผู้ใช้ในคณะ: `GET /api/protected/officer/users`

### ❌ **สิ่งที่ไม่ควรเห็น**
- การจองในคณะอื่น 
- ห้องประชุมในคณะอื่น
- การอนุมัติข้ามคณะ
- ข้อมูลผู้ใช้คณะอื่น
- รายงานระดับมหาวิทยาลัย

### ⚠️ **ข้อจำกัด**
- จัดการได้เฉพาะคณะตัวเอง
- อนุมัติได้เฉพาะห้องในคณะตัวเอง

---

## 👑 **3. ADMIN (ผู้ดูแลระบบ)** - role_id: 1

### ✅ **สิ่งที่ควรเห็น**

#### 📊 **Admin Dashboard**
```javascript
// API: GET /api/protected/admin/area  
{
  "admin_info": {
    "name": "ผู้ดูแลระบบ",
    "role": "admin",
    "access_level": "Super Admin"
  },
  "system_stats": {
    "total_users": 250,
    "total_officers": 15, 
    "total_executives": 8,
    "total_rooms": 12,
    "total_reservations": 1500,
    "pending_reservations": 25
  }
}
```

#### 👥 **จัดการผู้ใช้ทั้งหมด**
```javascript
// API: GET /api/protected/admin/all-users
{
  "all_users": {
    "users": [
      {
        "user_id": 1,
        "name": "สมชาย ใจดี",
        "email": "somchai@example.com",
        "department": "คณะเทคโนโลยีสารสนเทศ",
        "role": "user",
        "created_at": "2025-01-15"
      }
    ],
    "officers": [...],
    "executives": [...],
    "admins": [...]
  }
}
```

#### 📊 **สถิติระบบ**
```javascript
// API: GET /api/protected/admin/stats
{
  "system_overview": {
    "user_distribution": {
      "users": 250,
      "officers": 15,
      "executives": 8, 
      "admins": 2
    },
    "department_distribution": {
      "คณะเทคโนโลยีสารสนเทศ": 45,
      "คณะครุศาสตร์": 38,
      // ... คณะอื่นๆ
    },
    "reservation_trends": {
      "this_month": 120,
      "last_month": 95,
      "growth": "+26%"
    }
  }
}
```

#### ⚡ **การดำเนินการที่ทำได้**
- ✅ ดูผู้ใช้ทั้งหมด: `GET /api/protected/admin/all-users`
- ✅ เลื่อนตำแหน่ง Officer → Admin: `POST /api/protected/admin/promote`
- ✅ ลดตำแหน่ง Admin → Officer: `POST /api/protected/admin/demote`
- ✅ ลบผู้ใช้: `DELETE /api/protected/admin/users/:id`
- ✅ ดูสถิติระบบ: `GET /api/protected/admin/stats`

### ❌ **สิ่งที่ไม่ควรเห็น/ทำได้**
- การจัดการห้องประชุม (เฉพาะ Officer)
- การอนุมัติการจอง (เฉพาะ Officer)
- รายงานการใช้งานรายละเอียด (เฉพาะ Executive)

### ⚠️ **หมายเหตุสำคัญ**
**Admin = จัดการคน, Officer = จัดการห้อง/การจอง**

---

## 🏛️ **4. EXECUTIVE (ผู้บริหาร)** - role_id: 4

### ✅ **สิ่งที่ควรเห็น**

#### 📊 **Executive Dashboard**
```javascript
// API: GET /api/protected/executive/dashboard
{
  "executive_info": {
    "name": "ผู้บริหารคณะเทคโนโลยีสารสนเทศ",
    "executive_type": "faculty_executive", // หรือ university_executive
    "department": "คณะเทคโนโลยีสารสนเทศ", // หรือ null สำหรับ university
    "role": "executive"
  },
  "stats": {
    // Faculty Executive - เฉพาะคณะตัวเอง
    "department_reservations": 150,
    "department_rooms": 3,
    "utilization_rate": "78%",
    
    // University Executive - ทุกคณะ
    "total_reservations": 1500,
    "total_rooms": 12,
    "overall_utilization": "82%"
  }
}
```

#### 📈 **รายงานและสถิติ**
```javascript
// API: GET /api/protected/executive/reports
{
  "reports": {
    "reservation_summary": [
      { "status": "pending", "count": 15 },
      { "status": "approved", "count": 120 },
      { "status": "rejected", "count": 5 }
    ],
    "room_utilization": [
      { "room_id": 1, "room_name": "IT-301", "usage_count": 45 },
      { "room_id": 2, "room_name": "IT-302", "usage_count": 38 }
    ],
    "monthly_trends": [
      { "month": "2025-07", "reservation_count": 95, "department": "คณะเทคโนโลยีสารสนเทศ" },
      { "month": "2025-08", "reservation_count": 120, "department": "คณะเทคโนโลยีสารสนเทศ" }
    ]
  }
}
```

#### 🏢 **ห้องประชุมที่ดูได้**
```javascript
// API: GET /api/protected/executive/rooms
{
  "accessible_rooms": [
    {
      "room_id": 1,
      "room_name": "ห้องประชุม IT-301",
      "department": "คณะเทคโนโลยีสารสนเทศ", // Faculty: เฉพาะคณะตัวเอง, University: ทุกคณะ
      "capacity": 20,
      "location": "อาคาร 2 ชั้น 3",
      "utilization_stats": {
        "total_bookings": 45,
        "this_month": 12,
        "average_duration": "2.5 hours"
      }
    }
  ]
}
```

#### ⚡ **การดำเนินการที่ทำได้**
- ✅ ดูรายงานและสถิติ: `GET /api/protected/executive/reports`
- ✅ ดูห้องประชุม: `GET /api/protected/executive/rooms`
- ✅ ดู Dashboard: `GET /api/protected/executive/dashboard`
- ✅ **READ-ONLY เท่านั้น** - ไม่สามารถแก้ไขอะไรได้

### ❌ **สิ่งที่ไม่ควรเห็น/ทำได้**
- การอนุมัติ/ปฏิเสธการจอง (เฉพาะ Officer)
- การจัดการห้องประชุม (เฉพาะ Officer) 
- การจัดการผู้ใช้ (เฉพาะ Admin)
- การแก้ไขข้อมูลใดๆ (READ-ONLY)

### ⚠️ **ข้อแตกต่าง**
- **Faculty Executive**: เห็นเฉพาะคณะตัวเอง
- **University Executive**: เห็นได้ทุกคณะ

---

## 🎨 **UI Layout แนะนำ**

### **1. User Dashboard**
```html
<div class="user-dashboard">
  <!-- Profile Header -->
  <div class="profile-section">
    <h2>สวัสดี สมชาย ใจดี</h2>
    <p>คณะเทคโนโลยีสารสนเทศ | บุคลากร/อาจารย์</p>
  </div>
  
  <!-- Quick Stats -->
  <div class="stats-grid">
    <div class="stat-card">
      <h3>รออนุมัติ</h3>
      <span class="count">2</span>
    </div>
    <div class="stat-card">
      <h3>เดือนนี้</h3>
      <span class="count">5</span>
    </div>
  </div>
  
  <!-- My Reservations Table -->
  <div class="reservations-table">
    <h3>การจองของฉัน</h3>
    <table>
      <thead>
        <tr>
          <th>ห้องประชุม</th>
          <th>วันที่</th>
          <th>เวลา</th>
          <th>สถานะ</th>
          <th>การดำเนินการ</th>
        </tr>
      </thead>
      <tbody>
        <!-- ข้อมูลการจอง -->
      </tbody>
    </table>
  </div>
  
  <!-- Quick Actions -->
  <div class="quick-actions">
    <button class="btn-primary">📅 จองห้องประชุม</button>
    <button class="btn-secondary">📋 ดูปฏิทิน</button>
  </div>
</div>
```

### **2. Officer Dashboard**
```html
<div class="officer-dashboard">
  <!-- Department Header -->
  <div class="department-section">
    <h2>เจ้าหน้าที่คณะเทคโนโลยีสารสนเทศ</h2>
    <p>สมหญิง ใจดี</p>
  </div>
  
  <!-- Department Stats -->
  <div class="stats-grid">
    <div class="stat-card urgent">
      <h3>รออนุมัติ</h3>
      <span class="count">5</span>
    </div>
    <div class="stat-card">
      <h3>ห้องประชุม</h3>
      <span class="count">3</span>
    </div>
    <div class="stat-card">
      <h3>วันนี้</h3>
      <span class="count">8</span>
    </div>
  </div>
  
  <!-- Pending Approvals (Priority) -->
  <div class="pending-approvals">
    <h3>🚨 การจองรออนุมัติ</h3>
    <div class="approval-cards">
      <!-- การจองที่รออนุมัติ -->
    </div>
  </div>
  
  <!-- Room Management -->
  <div class="room-management">
    <h3>จัดการห้องประชุม</h3>
    <!-- ห้องในคณะ -->
  </div>
</div>
```

### **3. Admin Dashboard**
```html
<div class="admin-dashboard">
  <!-- System Overview -->
  <div class="system-header">
    <h2>ผู้ดูแลระบบ</h2>
    <p>จัดการผู้ใช้และระบบ</p>
  </div>
  
  <!-- System Stats -->
  <div class="stats-grid">
    <div class="stat-card">
      <h3>ผู้ใช้ทั้งหมด</h3>
      <span class="count">275</span>
    </div>
    <div class="stat-card">
      <h3>เจ้าหน้าที่</h3>
      <span class="count">15</span>
    </div>
    <div class="stat-card">
      <h3>ผู้บริหาร</h3>
      <span class="count">8</span>
    </div>
  </div>
  
  <!-- User Management -->
  <div class="user-management">
    <h3>จัดการผู้ใช้</h3>
    <div class="user-tables">
      <!-- ตารางผู้ใช้แต่ละประเภท -->
    </div>
  </div>
</div>
```

### **4. Executive Dashboard**
```html
<div class="executive-dashboard">
  <!-- Executive Header -->
  <div class="executive-header">
    <h2>ผู้บริหารคณะเทคโนโลยีสารสนเทศ</h2>
    <p>รายงานและสถิติ (อ่านอย่างเดียว)</p>
  </div>
  
  <!-- Department Performance -->
  <div class="performance-stats">
    <div class="stat-card">
      <h3>อัตราการใช้งาน</h3>
      <span class="count">78%</span>
    </div>
    <div class="stat-card">
      <h3>การจองเดือนนี้</h3>
      <span class="count">120</span>
    </div>
  </div>
  
  <!-- Reports and Charts -->
  <div class="reports-section">
    <h3>📊 รายงานการใช้งาน</h3>
    <div class="charts-container">
      <!-- กราฟและรายงาน -->
    </div>
  </div>
  
  <!-- Room Utilization -->
  <div class="room-utilization">
    <h3>การใช้งานห้องประชุม</h3>
    <!-- สถิติแต่ละห้อง -->
  </div>
</div>
```

---

## 🔗 **API Endpoints Summary**

### **User APIs**
```
GET /api/protected/profile              # ข้อมูลตัวเอง
GET /api/protected/reservations         # การจองของตัวเอง
POST /api/protected/reservations        # จองใหม่
PUT /api/protected/reservations/:id     # แก้ไข
DELETE /api/protected/reservations/:id  # ยกเลิก
```

### **Officer APIs**
```
GET /api/protected/officer/area                    # Dashboard
GET /api/protected/officer/reservations            # การจองรออนุมัติ
PUT /api/protected/officer/reservations/:id/approve # อนุมัติ
PUT /api/protected/officer/reservations/:id/reject  # ปฏิเสธ
GET /api/protected/officer/rooms                    # ห้องในคณะ
```

### **Admin APIs**
```
GET /api/protected/admin/area           # Dashboard
GET /api/protected/admin/all-users      # ผู้ใช้ทั้งหมด
GET /api/protected/admin/stats          # สถิติระบบ
POST /api/protected/admin/promote       # เลื่อนตำแหน่ง
POST /api/protected/admin/demote        # ลดตำแหน่ง
```

### **Executive APIs**
```
GET /api/protected/executive/dashboard  # Dashboard
GET /api/protected/executive/reports    # รายงาน
GET /api/protected/executive/rooms      # ห้องประชุม (READ-ONLY)
```

### **Public APIs**
```
GET /api/rooms                          # ห้องประชุมทั้งหมด
GET /api/reservations/calendar/:roomId  # ปฏิทินห้อง
GET /api/departments                    # รายชื่อคณะ
GET /api/positions                      # รายชื่อตำแหน่ง
```

---

## 🎯 **สรุปสำคัญ**

| Role | หน้าที่หลัก | สิทธิ์พิเศษ | ข้อจำกัด |
|------|------------|------------|----------|
| **User** | จองห้องประชุม | ดู/จอง/แก้ไข/ยกเลิกของตัวเอง | เฉพาะเวลาทำการ, ไม่ข้ามพักเที่ยง |
| **Officer** | อนุมัติการจอง | จัดการห้อง + อนุมัติในคณะตัวเอง | เฉพาะคณะตัวเอง |
| **Admin** | จัดการผู้ใช้ | จัดการคน, ดูสถิติระบบ | ไม่จัดการห้อง/การจอง |
| **Executive** | ดูรายงาน | ดูสถิติ/รายงานระดับคณะ/มหาวิทยาลัย | READ-ONLY เท่านั้น |

**🔥 แต่ละ Role มีหน้าที่ชัดเจน ไม่ทับซ้อนกัน!**
