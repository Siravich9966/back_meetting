# 📋 สรุประบบหน้าจองห้องประชุม - สำหรับ AI Frontend
## ระบบจองห้องประชุม มหาวิทยาลัยราชภัฏมหาสารคาม

---

## 🎯 **ภาพรวมระบบ**

ระบบจองห้องประชุมออนไลน์ที่มี 3 หน้าหลัก:
1. **หน้าจองห้องประชุม** - เลือกห้อง ดูปฏิทิน และจองห้อง
2. **หน้ารายการจองของฉัน** - จัดการการจองที่มีอยู่
3. **หน้าค้นหา/ดูรายการห้อง** - สำรวจห้องประชุมทั้งหมด

---

## 🏠 **1. หน้าจองห้องประชุม (Booking Page)**

### **🎯 วัตถุประสงค์:**
หน้าหลักสำหรับการจองห้องประชุม มีปฏิทินแสดงสถานะการว่าง/ไม่ว่าง และฟอร์มจอง

### **🏗️ โครงสร้างหน้า:**

#### **A. Header Section**
```html
<header>
  <h1>จองห้องประชุม</h1>
  <breadcrumb>หน้าหลัก > จองห้องประชุม</breadcrumb>
</header>
```

#### **B. Room Selection Panel**
```javascript
// ข้อมูลห้องที่แสดง
{
  room_id: 7,
  room_name: "ห้องประชุม IT Lab",
  capacity: 12,
  location: "ชั้น 6 อาคาร IT",
  department: "คณะเทคโนโลยีสารสนเทศ",
  equipment: ["โปรเจคเตอร์", "เครื่องเสียง", "WiFi", "กระดานไวท์บอร์ด"],
  room_image: "/uploads/rooms/room_7.jpg",
  current_status: "available", // available/partial/full
  next_booking: "2025-08-05T15:00:00Z"
}
```

**UI Components:**
- Dropdown/Select สำหรับเลือกห้อง
- รูปภาพห้องประชุม (กรณีมี)
- รายชื่ออุปกรณ์ที่มี
- สถานะปัจจุบัน (ว่าง/ไม่ว่าง)

#### **C. Calendar Section**
```javascript
// ใช้ API: GET /api/reservations/calendar/:roomId?detailed=true
{
  "success": true,
  "room": {
    "room_id": 7,
    "room_name": "ห้องประชุม IT Lab",
    "department": "คณะเทคโนโลยีสารสนเทศ"
  },
  "calendar": {
    "month": 8,
    "year": 2025,
    "working_hours": {
      "start": 6, "end": 18,
      "lunch_break": { "start": 12, "end": 13 }
    },
    "daily_availability": [
      {
        "date": "2025-08-05",
        "day_of_week": 2,
        "slots": [
          {
            "time": "09:00",
            "available": false,
            "reservations": [{
              "reservation_id": 28,
              "status": "approved",
              "details": "ประชุมคณะกรรมการ IT",
              "time_range": "09:00-12:00"
            }]
          }
        ],
        "total_reservations": 1
      }
    ]
  }
}
```

**Calendar Features:**
- Grid 7x6 แสดงปฏิทินเดือน
- สีพื้นหลัง: 🟢 ว่างทั้งวัน | 🟡 ว่างบางช่วง | 🔴 เต็มทั้งวัน
- คลิกวันได้ → แสดง popup รายละเอียด
- เปลี่ยนเดือน/ปี ได้
- Hover แสดง tooltip ช่วงเวลาว่าง

#### **D. Booking Form**
```javascript
// ฟอร์มข้อมูลการจอง
{
  room_id: 7,
  start_date: "2025-08-15",
  end_date: "2025-08-15",
  start_time: "09:00",
  end_time: "12:00",
  details: "ประชุมทีมพัฒนาระบบ",
  attendees_count: 8,
  special_requirements: "ต้องการไมโครโฟน"
}
```

**Form Fields:**
- วันที่เริ่มต้น/สิ้นสุด (Date Picker)
- เวลาเริ่มต้น/สิ้นสุด (Time Picker)
- รายละเอียดการประชุม (Textarea)
- จำนวนผู้เข้าร่วม (Number)
- ความต้องการพิเศษ (Optional Text)

**Validation Rules:**
- วันที่ไม่ย้อนหลัง
- เวลาเริ่มต้น < เวลาสิ้นสุด
- ไม่ข้ามช่วงพักเที่ยง (12:00-13:00)
- ไม่ซ้อนทับกับการจองอื่น
- เวลาทำงาน 06:00-18:00

### **🔗 APIs ที่ใช้:**
```javascript
// 1. ดูรายการห้องประชุม
GET /api/rooms
Response: { rooms: [...] }

// 2. ดูปฏิทินห้องประชุม
GET /api/reservations/calendar/:roomId?detailed=true
Response: { calendar: {...} }

// 3. จองห้องประชุม (ต้อง JWT Token)
POST /api/protected/reservations
Headers: { "Authorization": "Bearer JWT_TOKEN" }
Body: { room_id, start_at, end_at, start_time, end_time, details_r }
Response: { success: true, reservation: {...} }
```

---

## 📝 **2. หน้ารายการจองของฉัน (My Reservations)**

### **🎯 วัตถุประสงค์:**
แสดงการจองทั้งหมดของผู้ใช้ พร้อมการจัดการ (แก้ไข/ยกเลิก/ดูรายละเอียด)

### **🏗️ โครงสร้างหน้า:**

#### **A. Summary Cards**
```javascript
// สถิติการใช้งาน
{
  user_statistics: {
    total_bookings: 15,
    pending_bookings: 3,
    approved_bookings: 10,
    rejected_bookings: 2,
    this_month_bookings: 5,
    total_hours_booked: 45
  }
}
```

**Cards Layout:**
```html
<div class="stats-grid">
  <card>📋 จองทั้งหมด: 15</card>
  <card>⏳ รออนุมัติ: 3</card>
  <card>✅ อนุมัติแล้ว: 10</card>
  <card>❌ ปฏิเสธ: 2</card>
</div>
```

#### **B. Filter & Search Bar**
```javascript
// ตัวกรองข้อมูล
{
  filters: {
    status: ["ทั้งหมด", "รออนุมัติ", "อนุมัติแล้ว", "ปฏิเสธ"],
    date_range: ["สัปดาห์นี้", "เดือนนี้", "3 เดือนล่าสุด", "กำหนดเอง"],
    rooms: ["ทุกห้อง", "ห้องประชุม IT Lab", "ห้องประชุม A1"]
  },
  search: {
    placeholder: "ค้นหาตามรายละเอียดการประชุม...",
    fields: ["details_r", "room_name"]
  }
}
```

#### **C. Reservations Table**
```javascript
// API: GET /api/protected/reservations?limit=10&offset=0&status=all
{
  "success": true,
  "reservations": [
    {
      "reservation_id": 32,
      "room": {
        "room_name": "ห้องประชุม IT Lab",
        "location": "ชั้น 6 อาคาร IT",
        "capacity": 12
      },
      "booking_details": {
        "start_at": "2025-08-15T00:00:00Z",
        "end_at": "2025-08-15T00:00:00Z",
        "start_time": "2025-08-15T09:00:00Z",
        "end_time": "2025-08-15T12:00:00Z",
        "details": "ประชุมทีมพัฒนา",
        "duration_hours": 3
      },
      "status": "pending", // pending/approved/rejected
      "approval": {
        "approved_by": null,
        "approved_at": null
      },
      "timestamps": {
        "created_at": "2025-08-05T10:30:00Z",
        "updated_at": "2025-08-05T10:30:00Z"
      },
      "actions": {
        "can_edit": true,    // เฉพาะ status = pending
        "can_cancel": true,  // pending หรือ approved
        "can_view_details": true
      }
    }
  ],
  "pagination": {
    "total": 15,
    "limit": 10,
    "offset": 0,
    "has_more": true
  }
}
```

**Table Columns:**
- วันที่/เวลา
- ห้องประชุม
- รายละเอียด
- สถานะ (Badge สี)
- การอนุมัติ
- Actions (ปุ่ม)

#### **D. Action Buttons**
```javascript
// การดำเนินการที่ทำได้
{
  actions: {
    view: {
      icon: "👁️",
      label: "ดูรายละเอียด",
      available: true
    },
    edit: {
      icon: "✏️", 
      label: "แก้ไข",
      available: status === 'pending'
    },
    cancel: {
      icon: "🗑️",
      label: "ยกเลิก", 
      available: ['pending', 'approved'].includes(status)
    },
    duplicate: {
      icon: "📋",
      label: "จองซ้ำ",
      available: true
    }
  }
}
```

### **🔗 APIs ที่ใช้:**
```javascript
// 1. ดูรายการจองของฉัน
GET /api/protected/reservations?limit=10&offset=0&status=all
Headers: { "Authorization": "Bearer JWT_TOKEN" }

// 2. ดูรายละเอียดการจอง
GET /api/protected/reservations/:id
Headers: { "Authorization": "Bearer JWT_TOKEN" }

// 3. แก้ไขการจอง (เฉพาะ pending)
PUT /api/protected/reservations/:id
Headers: { "Authorization": "Bearer JWT_TOKEN" }
Body: { start_at, end_at, start_time, end_time, details_r }

// 4. ยกเลิกการจอง
DELETE /api/protected/reservations/:id
Headers: { "Authorization": "Bearer JWT_TOKEN" }

// 5. สถิติการใช้งาน (optional)
GET /api/protected/reservations/statistics/room-usage
Headers: { "Authorization": "Bearer JWT_TOKEN" }
```

---

## 🔍 **3. หน้าค้นหา/ดูรายการห้องประชุม (Room Directory)**

### **🎯 วัตถุประสงค์:**
ดูรายการห้องประชุมทั้งหมด พร้อมการค้นหาและกรองแบบละเอียด

### **🏗️ โครงสร้างหน้า:**

#### **A. Search & Filter Panel**
```javascript
// API: GET /api/rooms?search=&department=&capacity_min=&capacity_max=
{
  "success": true,
  "filters": {
    "departments": [
      "ทั้งหมด",
      "คณะเทคโนโลยีสารสนเทศ",
      "คณะวิทยาการจัดการ",
      "คณะวิทยาศาสตร์และเทคโนโลยี",
      "สำนักงานอธิการบดี"
    ],
    "capacity_ranges": [
      { "label": "1-10 คน", "min": 1, "max": 10 },
      { "label": "11-20 คน", "min": 11, "max": 20 },
      { "label": "21-50 คน", "min": 21, "max": 50 },
      { "label": "50+ คน", "min": 51, "max": 999 }
    ],
    "equipment_options": [
      "โปรเจคเตอร์",
      "เครื่องเสียง", 
      "WiFi",
      "กระดานไวท์บอร์ด",
      "ไมโครโฟน",
      "ระบบประชุมออนไลน์"
    ],
    "availability_options": [
      "ทั้งหมด",
      "ว่างตอนนี้",
      "ว่างวันนี้", 
      "ว่างสัปดาห์นี้"
    ]
  }
}
```

**Filter Components:**
- Search Box (ค้นหาชื่อห้อง)
- Department Dropdown
- Capacity Range Slider
- Equipment Checkboxes
- Availability Radio Buttons
- Sort Options

#### **B. Room Cards/Grid**
```javascript
// รายการห้องประชุม
{
  "rooms": [
    {
      "room_id": 7,
      "room_name": "ห้องประชุม IT Lab",
      "capacity": 12,
      "location": "ชั้น 6 อาคาร IT",
      "department": "คณะเทคโนโลยีสารสนเทศ",
      "equipment": ["โปรเจคเตอร์", "เครื่องเสียง", "WiFi"],
      "room_image": "/uploads/rooms/room_7.jpg",
      "current_status": "available", // available/occupied/maintenance
      "next_available": "2025-08-05T13:00:00Z",
      "usage_statistics": {
        "bookings_this_month": 12,
        "utilization_rate": 65,
        "avg_booking_duration": 2.5
      },
      "quick_actions": {
        "can_book_now": true,
        "view_calendar": true,
        "view_details": true
      }
    }
  ],
  "pagination": {
    "total": 26,
    "limit": 12,
    "offset": 0,
    "has_more": true
  }
}
```

**Card Layout:**
```html
<div class="room-card">
  <img src="/uploads/rooms/room_7.jpg" alt="ห้องประชุม IT Lab">
  <div class="room-info">
    <h3>ห้องประชุม IT Lab</h3>
    <p>🏢 ชั้น 6 อาคาร IT</p>
    <p>👥 ความจุ: 12 คน</p>
    <p>🏛️ คณะเทคโนโลยีสารสนเทศ</p>
    <div class="equipment-tags">
      <span>โปรเจคเตอร์</span>
      <span>เครื่องเสียง</span>
      <span>WiFi</span>
    </div>
    <div class="status-badge available">ว่างตอนนี้</div>
  </div>
  <div class="quick-actions">
    <button class="btn-book-now">จองเลย</button>
    <button class="btn-view-calendar">ดูปฏิทิน</button>
    <button class="btn-details">รายละเอียด</button>
  </div>
</div>
```

#### **C. View Options**
```javascript
// ตัวเลือกการแสดงผล
{
  view_options: {
    grid: {
      label: "แสดงแบบกริด",
      cols: 3, // desktop
      responsive: true
    },
    list: {
      label: "แสดงแบบรายการ", 
      detailed: true
    },
    map: {
      label: "แสดงแบบแผนที่", 
      available: false // future feature
    }
  },
  sort_options: [
    { value: "name_asc", label: "ชื่อห้อง (A-Z)" },
    { value: "name_desc", label: "ชื่อห้อง (Z-A)" },
    { value: "capacity_asc", label: "ความจุ (น้อย-มาก)" },
    { value: "capacity_desc", label: "ความจุ (มาก-น้อย)" },
    { value: "availability", label: "ความว่าง (มาก-น้อย)" },
    { value: "department", label: "หน่วยงาน" }
  ]
}
```

### **🔗 APIs ที่ใช้:**
```javascript
// 1. ค้นหาห้องประชุม
GET /api/rooms?search=IT&department=เทคโนโลยีสารสนเทศ&capacity_min=10&capacity_max=20
Response: { rooms: [...], filters: {...} }

// 2. ดูรายละเอียดห้อง
GET /api/rooms/:id
Response: { room: {...} }

// 3. ดูปฏิทินห้องเฉพาะ (สำหรับ quick view)
GET /api/reservations/calendar/:roomId?month=8&year=2025
Response: { calendar: {...} }
```

---

## 🎨 **UI/UX Guidelines**

### **🎨 Color Scheme:**
```css
:root {
  /* Primary Colors */
  --primary: #3B82F6;        /* น้ำเงิน - ปุ่มหลัก */
  --primary-dark: #1E40AF;   /* น้ำเงินเข้ม - hover */
  --primary-light: #DBEAFE; /* น้ำเงินอ่อน - background */
  
  /* Status Colors */
  --success: #10B981;        /* เขียว - ว่างทั้งวัน */
  --warning: #F59E0B;        /* เหลือง - ว่างบางช่วง */
  --danger: #EF4444;         /* แดง - เต็มทั้งวัน */
  --gray: #6B7280;           /* เทา - ไม่สามารถจอง */
  
  /* Status Background */
  --success-bg: #D1FAE5;     /* เขียวอ่อน */
  --warning-bg: #FEF3C7;     /* เหลืองอ่อน */
  --danger-bg: #FECACA;      /* แดงอ่อน */
  --gray-bg: #F3F4F6;        /* เทาอ่อน */
  
  /* Text Colors */
  --text-primary: #1F2937;   /* ข้อความหลัก */
  --text-secondary: #6B7280; /* ข้อความรอง */
  --text-muted: #9CA3AF;     /* ข้อความเบา */
}
```

### **📱 Responsive Breakpoints:**
```css
/* Mobile First Approach */
.container {
  /* Mobile: 320px+ */
  padding: 1rem;
  
  /* Tablet: 768px+ */
  @media (min-width: 768px) {
    padding: 1.5rem;
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
  }
  
  /* Desktop: 1024px+ */
  @media (min-width: 1024px) {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
}
```

### **🧩 Component Guidelines:**

#### **Calendar Component:**
```css
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.calendar-day {
  aspect-ratio: 1;
  padding: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.calendar-day.available { background: var(--success-bg); }
.calendar-day.partial { background: var(--warning-bg); }
.calendar-day.full { background: var(--danger-bg); }
.calendar-day.past { background: var(--gray-bg); opacity: 0.5; }
```

#### **Status Badges:**
```css
.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.status-badge.pending { background: var(--warning-bg); color: #92400E; }
.status-badge.approved { background: var(--success-bg); color: #065F46; }
.status-badge.rejected { background: var(--danger-bg); color: #991B1B; }
```

---

## 🔧 **Technical Requirements**

### **🚀 Performance:**
- First Contentful Paint < 2s
- Time to Interactive < 3s
- Calendar rendering < 500ms
- API response caching (5 minutes)

### **♿ Accessibility:**
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatible
- High contrast mode support

### **📱 Browser Support:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### **🔒 Security:**
- JWT token management
- XSS protection
- CSRF protection
- Input validation

---

## 📋 **Development Checklist**

### **✅ หน้าจองห้องประชุม:**
- [ ] Room selection dropdown
- [ ] Calendar component with color coding
- [ ] Booking form with validation
- [ ] Real-time conflict checking
- [ ] Success/error notifications
- [ ] Mobile responsive design

### **✅ หน้ารายการจองของฉัน:**
- [ ] Statistics summary cards
- [ ] Filter and search functionality
- [ ] Reservations table/list
- [ ] Edit/cancel action buttons
- [ ] Status badges and icons
- [ ] Pagination support

### **✅ หน้าค้นหาห้องประชุม:**
- [ ] Advanced search filters
- [ ] Room cards with images
- [ ] Grid/list view toggle
- [ ] Quick booking buttons
- [ ] Equipment tags display
- [ ] Availability status

### **✅ General Requirements:**
- [ ] JWT authentication integration
- [ ] Error handling and loading states
- [ ] Toast notifications
- [ ] Form validation
- [ ] Responsive design
- [ ] Performance optimization

---

## 🚨 **สำหรับ AI Frontend - ข้อสำคัญ**

### **🎯 ลำดับความสำคัญ:**
1. **หน้าจองห้องประชุม** - มี Calendar API พร้อมแล้ว
2. **หน้ารายการจองของฉัน** - มี CRUD APIs พร้อมแล้ว  
3. **หน้าค้นหาห้องประชุม** - มี Search API พร้อมแล้ว

### **🔗 APIs ที่พร้อมใช้:**
- ✅ Calendar API: `/api/reservations/calendar/:roomId?detailed=true`
- ✅ Booking API: `POST /api/protected/reservations`
- ✅ Room List API: `GET /api/rooms`
- ✅ My Reservations API: `GET /api/protected/reservations`
- ✅ Department List: utils/departments.js

### **⚠️ ข้อควรระวัง:**
- **JWT Token** จำเป็นสำหรับ APIs ที่มี `/protected/`
- **เสาร์-อาทิตย์** สามารถจองได้ตามปกติ (ไม่ใช่วันหยุด)
- **การจองข้ามเที่ยง** (12:00-13:00) ไม่ได้ ต้องแยกเป็น 2 การจอง
- **Real-time update** เมื่อยกเลิกการจอง ปฏิทินต้องอัพเดตทันที

### **🎨 การใช้สี:**
- Backend ส่งข้อมูล `available_slots` และ `total_slots`
- Frontend คำนวณสี: available=total → เขียว, available=0 → แดง, อื่นๆ → เหลือง

**พร้อมเริ่มพัฒนาได้เลย!** 🚀
