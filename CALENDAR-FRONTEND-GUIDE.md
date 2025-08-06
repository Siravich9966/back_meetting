# 📅 สรุปหน้าปฏิทินการจอง - สำหรับ AI Frontend
## ระบบจองห้องประชุม มหาวิทยาลัยราชภัฏมหาสารคาม

---

#### **2. Filter Options**
- **แสดงเฉพาะวันที่ว่าง**
- **แสดงเฉพาะช่วงเวลาที่ต้องการ** (เช่น ตอนเช้า/บ่าย)

---

## ⚠️ **ข้อสำคัญสำหรับ AI Frontend**

### **🎯 การทำงานของระบบสีปฏิทิน**

**ระบบจะแสดงสีตามจำนวนช่วงเวลาที่ว่าง:**

1. **🟢 เขียว (ว่างทั้งวัน)**
   - เงื่อนไข: `availableSlots === totalSlots` 
   - กรณี: วันจันทร์-ศุกร์ที่ไม่มีการจองใดๆ
   - ช่วงเวลา: 0---

## ✨ **User Experience**

### **Flow การใช้งาน**
1. **เลือกห้องประชุม** → ไปหน้าปฏิทิน
2. **ดูสถานะในปฏิทิน** → เลือกวันที่ต้องการ  
3. **คลิกวันที่ว่าง** → เลือกช่วงเวลา
4. **กรอกรายละเอียด** → ยืนยันการจอง
5. **รอการอนุมัติ** → ได้รับแจ้งเตือน

### **การแจ้งเตือน**
- **สีเปลี่ยน Real-time** เมื่อมีการจอง/ยกเลิก
- **แจ้งเตือนเมื่อห้องว่าง** สำหรับวันที่ต้องการ
- **แสดงสถานะการอนุมัติ** (รออนุมัติ/อนุมัติแล้ว/ปฏิเสธ)

### **UX/UI ที่สำคัญ**
- **ปฏิทินต้องโหลดเร็ว**: ใช้ loading skeleton ขณะดึงข้อมูล
- **สีต้องชัดเจน**: แยกแยะได้ง่าย ไม่สับสน
- **คลิกได้ง่าย**: พื้นที่คลิกกว้างพอ (มือถือ)
- **ข้อความชัดเจน**: บอกสถานะและเวลาว่างชัดเจน

---

## ⚡ **ข้อจำกัดและกฎการจอง**

### **เวลาทำงาน**
- **ทุกวัน** (จันทร์-อาทิตย์): 06:00-18:00 (12 ชั่วโมง)
- **ช่วงพักเที่ยง**: 12:00-13:00 (ไม่สามารถจองได้)

### **ข้อจำกัดการจอง**
- **จองล่วงหน้า**: จองได้ทุกวันในอนาคต (ไม่จำกัด)
- **ระยะเวลาขั้นต่ำ**: 1 ชั่วโมง
- **ระยะเวลาสูงสุด**: ไม่จำกัด (สามารถจองหลายวันได้)
- **ข้ามช่วงพักเที่ยง**: ต้องแยกเป็น 2 การจอง (เช้า/บ่าย)

### **สิทธิ์ตาม Role**
- **User**: จองได้ → รอการอนุมัติจาก Officer
- **Officer**: จองได้ → อนุมัติอัตโนมัติ (เฉพาะห้องในคณะตัวเอง)
- **Admin**: จองได้ → อนุมัติอัตโนมัติ (ทุกห้อง)
- **Executive**: ดูข้อมูลได้อย่างเดียว (ไม่สามารถจอง)

### **การตรวจสอบ Conflict**
```javascript
// ระบบจะตรวจสอบการซ้อนทับแบบละเอียด:
function checkConflict(newBooking, existingBookings) {
  // 1. เช็ควันที่ทับซ้อน
  // 2. เช็คเวลาในแต่ละวันที่ทับซ้อน  
  // 3. รองรับการจองหลายวัน
  // 4. จัดการ edge cases (จองข้ามเที่ยงคืน, วันสุดท้าย)
}
```

---

## 🎯 **เป้าหมาย**12:00-13:00 พักเที่ยง)
   - จำนวน slots: 12 ช่วง (6-12, 13-18)

2. **🟡 เหลือง (ว่างบางช่วง)**
   - เงื่อนไข: `0 < availableSlots < totalSlots`
   - กรณี: มีการจองบางส่วน แต่ยังมีช่วงว่าง
   - ตัวอย่าง: จอง 09:00-12:00 = ว่าง 9/12 ช่วง

3. **🔴 แดง (เต็มทั้งวัน)**
   - เงื่อนไข: `availableSlots === 0`
   - กรณี: ถูกจองหมดทุกช่วงเวลา 06:00-18:00
   - ตัวอย่าง: จอง 06:00-12:00 + 13:00-18:00

4. **⚫ เทา (วันที่ผ่านแล้ว)**
   - เงื่อนไข: `date < today`
   - กรณี: วันที่ผ่านมาแล้ว ไม่สามารถจองย้อนหลังได้

**หมายเหตุสำคัญ**: เสาร์-อาทิตย์ สามารถจองได้ตามปกติ ไม่ใช่วันหยุด

### **🗓️ การเลือกวันที่จองได้**

**✅ จองได้:**
```javascript
// เงื่อนไขการจองได้
const canBook = (date) => {
  const isFuture = date >= new Date().setHours(0,0,0,0)  // ไม่ย้อนหลัง
  return isFuture  // จองได้ทุกวัน รวมเสาร์-อาทิตย์
}

// ตัวอย่าง:
canBook(new Date('2025-08-08'))  // true - วันศุกร์ในอนาคต
canBook(new Date('2025-08-09'))  // true - วันเสาร์ (จองได้)
canBook(new Date('2025-08-10'))  // true - วันอาทิตย์ (จองได้)
canBook(new Date('2025-12-25'))  // true - วันพฤหัส
canBook(new Date('2026-01-15'))  // true - วันพุธปีหน้า
```

**❌ จองไม่ได้:**
```javascript
canBook(new Date('2025-08-03'))  // false - วันที่ผ่านมาแล้ว
canBook(new Date('2025-08-04'))  // false - วันที่ผ่านมาแล้ว
```

### **⏰ การเลือกเวลาที่จองได้**

**✅ ช่วงเวลาที่จองได้:**
- **06:00-12:00** (ช่วงเช้า)
- **13:00-18:00** (ช่วงบ่าย)
- **ข้ามวัน**: สามารถจองหลายวันติดต่อกันได้

**❌ ข้อจำกัดเวลา:**
- **12:00-13:00**: ช่วงพักเที่ยง (จองไม่ได้)
- **ก่อน 06:00**: นอกเวลาทำงาน
- **หลัง 18:00**: นอกเวลาทำงาน
- **การจองข้ามช่วงพักเที่ยง**: ต้องแยกเป็น 2 การจอง

### **🔄 Real-time Update Logic**

**เมื่อมีการยกเลิกการจอง:**
```javascript
// ตัวอย่าง: ยกเลิกการจอง 09:00-12:00 ในวันที่เต็ม
ก่อนยกเลิก: 🔴 แดง (เต็มทั้งวัน - 0/12 ช่วงว่าง)
หลังยกเลิก: 🟡 เหลือง (ว่างบางช่วง - 3/12 ช่วงว่าง)

// UI ต้องอัพเดตทันที:
1. เปลี่ยนสีพื้นหลังของวันนั้น
2. อัพเดตข้อความสถานะ
3. เพิ่มช่วงเวลาว่างใน available slots
4. เปิดให้คลิกจองได้
```

---

## 📱 **Responsive Design**วัตถุประสงค์หลัก**
หน้าปฏิทินจะแสดงสถานะการว่าง/ไม่ว่างของห้องประชุมแต่ละห้องในแต่ละวันอย่างชัดเจน เพื่อให้ผู้ใช้เลือกวันและเวลาที่เหมาะสมได้อย่างสะดวก

---

## 🏗️ **โครงสร้างหน้าปฏิทิน**

### **1. Header Section**
```
📍 [ชื่อห้องประชุม] - [ความจุ] คน
📍 ตำแหน่ง: [อาคาร/ชั้น]
🛠️ อุปกรณ์: [รายการอุปกรณ์]
```

### **2. Calendar Grid**
- **รูปแบบ**: Grid 7x6 (7 วัน x 6 สัปดาห์)
- **เนวิเกชัน**: Previous/Next Month
- **วันปัจจุบัน**: เน้นด้วยเส้นขอบหรือพื้นหลังที่แตกต่าง

---

## 🎨 **ระบบสีและสถานะ**

### **สีหลัก**
| สีพื้นหลัง | ความหมาย | รายละเอียด |
|-----------|-----------|------------|
| 🟢 **เขียว** | **ว่างทั้งวัน** | สามารถจองได้ตลอดเวลาทำงาน (06:00-18:00) |
| 🟡 **เหลือง** | **ว่างบางช่วง** | มีการจองแล้วบางช่วงเวลา แต่ยังมีช่วงว่าง |
| 🔴 **แดง** | **เต็มทั้งวัน** | ถูกจองหมดแล้วหรือไม่สามารถจองได้ |

### **รายละเอียดเพิ่มเติม**
- **ทุกวัน** (จันทร์-อาทิตย์): สามารถจองได้ 06:00-18:00
- **วันที่ผ่านมาแล้ว**: พื้นหลังเทาเข้ม (ไม่สามารถจองได้)
- **วันปัจจุบัน**: เส้นขอบหนา

---

## 📊 **ข้อมูลที่แสดงในแต่ละวัน**

### **เมื่อ Hover หรือ Click วัน**
```
📅 วันที่ [DD/MM/YYYY]
⏰ ช่วงเวลาที่ว่าง:
   ✅ 06:00-09:00 (ว่าง)
   ❌ 09:00-12:00 (ถูกจอง)
   ⏸️ 12:00-13:00 (พักเที่ยง)
   ✅ 13:00-15:00 (ว่าง)
   ❌ 15:00-18:00 (ถูกจอง)

📋 การจองที่มีอยู่:
   • 09:00-12:00: "ประชุมคณะกรรมการ" (รออนุมัติ)
   • 15:00-18:00: "อบรมพนักงาน" (อนุมัติแล้ว)
```

---

## 🔍 **ตัวอย่างการแสดงผล**

### **วันที่ว่างทั้งวัน (สีเขียว)**
```
   15
🟢 ว่างตลอด
   06:00-18:00
```

### **วันที่ว่างบางช่วง (สีเหลือง)**
```
   16
🟡 ว่างบางช่วง
   06:00-09:00
   13:00-15:00
```

### **วันที่เต็มทั้งวัน (สีแดง)**
```
   17
🔴 เต็มทั้งวัน
   ไม่มีช่วงว่าง
```

### **วันหยุด (สีเทา)**
```
   18
⚫ วันที่ผ่านแล้ว
   ไม่สามารถจอง
```

**หมายเหตุ**: เสาร์-อาทิตย์ สามารถจองได้ตามปกติ

---

## 🛠️ **ฟีเจอร์เพิ่มเติม**

### **1. Quick Actions**
- **จองเลย**: ปุ่มสำหรับวันที่ว่างทั้งวัน
- **ดูรายละเอียด**: สำหรับวันที่มีการจองบางส่วน
- **แจ้งเตือน**: เมื่อมีการยกเลิกจองในวันที่เต็ม

### **2. Legend (คำอธิบายสี)**
```
🟢 ว่างทั้งวัน    🟡 ว่างบางช่วง    🔴 เต็มทั้งวัน    ⚫ ไม่เปิดให้บริการ
```

### **3. Filter Options**
- **แสดงเฉพาะวันที่ว่าง**
- **แสดงเฉพาะช่วงเวลาที่ต้องการ** (เช่น ตอนเช้า/บ่าย)

---

## 📱 **Responsive Design**

### **Desktop**
- ปฏิทินแบบ Grid 7x6
- Tooltip แสดงรายละเอียดเมื่อ hover

### **Mobile**
- ปฏิทินแบบ List View
- แสดงวันละรายการ
- Swipe เพื่อเปลี่ยนเดือน

---

## 🔗 **API ที่ใช้**

### **1. ดูปฏิทินห้องประชุม (รายละเอียด)**
```javascript
GET /api/reservations/calendar/:roomId?detailed=true&month=8&year=2025

Response: {
  "success": true,
  "message": "ปฏิทินการจองห้อง IT Lab (รายละเอียด)",
  "room": {
    "room_id": 7,
    "room_name": "ห้องประชุม IT Lab",
    "department": "คอมพิวเตอร์"
  },
  "calendar": {
    "month": 8,
    "year": 2025,
    "working_hours": {
      "start": 6,
      "end": 18,
      "morningEnd": 12,
      "afternoonStart": 13,
      "lunchBreak": { "start": 12, "end": 13 }
    },
    "daily_availability": [
      {
        "date": "2025-08-05",
        "day_of_week": 2,  // 0=อาทิตย์, 1=จันทร์, ... 6=เสาร์
        "slots": [
          {
            "time": "06:00",
            "available": true,
            "reservations": []
          },
          {
            "time": "09:00",
            "available": false,
            "reservations": [
              {
                "reservation_id": 28,
                "status": "approved",
                "details": "ประชุมคณะกรรมการ IT",
                "time_range": "09:00-12:00"
              }
            ]
          }
        ],
        "total_reservations": 1
      }
    ]
  }
}
```

### **2. ดูปฏิทินห้องประชุม (พื้นฐาน)**
```javascript
GET /api/reservations/calendar/:roomId?month=8&year=2025

Response: {
  "success": true,
  "message": "ปฏิทินการจองห้อง IT Lab",
  "room": {
    "room_id": 7,
    "room_name": "ห้องประชุม IT Lab",
    "department": "คอมพิวเตอร์"
  },
  "calendar": {
    "month": 8,
    "year": 2025,
    "reservations": [
      {
        "reservation_id": 28,
        "start_at": "2025-08-05T00:00:00.000Z",
        "end_at": "2025-08-05T00:00:00.000Z",
        "start_time": "2025-08-05T09:00:00.000Z",
        "end_time": "2025-08-05T12:00:00.000Z",
        "details_r": "ประชุมคณะกรรมการ IT (ทดสอบ)",
        "status_r": "approved"
      }
    ]
  }
}
```

### **3. จองห้องประชุม (ต้อง Authentication)**
```javascript
POST /api/protected/reservations
Headers: {
  "Authorization": "Bearer JWT_TOKEN",
  "Content-Type": "application/json"
}
Body: {
  "room_id": 7,
  "start_at": "2025-08-15",
  "end_at": "2025-08-15",
  "start_time": "2025-08-15T09:00:00.000Z",
  "end_time": "2025-08-15T12:00:00.000Z",
  "details_r": "ประชุมทีมพัฒนา"
}

Response Success: {
  "success": true,
  "message": "จองห้องประชุมสำเร็จ รอการอนุมัติจากเจ้าหน้าที่",
  "reservation": {
    "reservation_id": 32,
    "room_name": "ห้องประชุม IT Lab",
    "department": "คอมพิวเตอร์",
    "start_at": "2025-08-15T00:00:00.000Z",
    "end_at": "2025-08-15T00:00:00.000Z",
    "start_time": "2025-08-15T09:00:00.000Z",
    "end_time": "2025-08-15T12:00:00.000Z",
    "details": "ประชุมทีมพัฒนา",
    "status": "pending",
    "created_at": "2025-08-05T10:30:00.000Z"
  }
}

Response Conflict: {
  "success": false,
  "message": "ช่วงเวลาที่เลือกมีการจองอยู่แล้ว กรุณาเลือกเวลาอื่น",
  "conflicts": [...]
}
```

### **4. ยกเลิกการจอง (ต้อง Authentication)**
```javascript
DELETE /api/protected/reservations/:id
Headers: {
  "Authorization": "Bearer JWT_TOKEN"
}

Response: {
  "success": true,
  "message": "ยกเลิกการจองสำเร็จ",
  "cancelled_reservation": {
    "reservation_id": 28,
    "room_name": "ห้องประชุม IT Lab",
    "start_at": "2025-08-05T00:00:00.000Z",
    "end_at": "2025-08-05T00:00:00.000Z",
    "previous_status": "pending"
  }
}
```

### **5. ดูรายการห้องประชุม**
```javascript
GET /api/rooms

Response: {
  "success": true,
  "message": "รายการห้องประชุม",
  "rooms": [
    {
      "room_id": 7,
      "room_name": "ห้องประชุม IT Lab",
      "capacity": 12,
      "location_m": "ชั้น 6 อาคาร IT",
      "department": "คอมพิวเตอร์",
      "equipment": ["โปรเจคเตอร์", "เครื่องเสียง", "WiFi"],
      "room_image": "/uploads/rooms/room_7.jpg"
    }
  ]
}
```

---

## 💻 **Frontend Implementation Guide**

### **การคำนวณสีวันใน JavaScript**
```javascript
function calculateDayColor(dayAvailability) {
  const { slots } = dayAvailability
  
  // นับ slots ที่ว่าง
  const availableSlots = slots.filter(slot => slot.available).length
  const totalSlots = slots.length
  
  if (availableSlots === totalSlots) {
    return { color: '#10B981', status: 'available', text: 'ว่างทั้งวัน' }
  } else if (availableSlots === 0) {
    return { color: '#EF4444', status: 'full', text: 'เต็มทั้งวัน' }
  } else {
    return { 
      color: '#F59E0B', 
      status: 'partial', 
      text: `ว่าง ${availableSlots}/${totalSlots} ช่วง` 
    }
  }
}
```

### **การแสดงผล Tooltip**
```javascript
function generateTooltip(dayAvailability) {
  const { date, slots } = dayAvailability
  const availableSlots = slots.filter(slot => slot.available)
  const bookedSlots = slots.filter(slot => !slot.available)
  
  let tooltip = `📅 ${new Date(date).toLocaleDateString('th-TH')}\n`
  
  if (availableSlots.length > 0) {
    tooltip += `✅ เวลาว่าง: ${availableSlots.map(s => s.time).join(', ')}\n`
  }
  
  if (bookedSlots.length > 0) {
    tooltip += `❌ เวลาที่จอง:\n`
    bookedSlots.forEach(slot => {
      slot.reservations.forEach(res => {
        tooltip += `   • ${res.time_range}: ${res.details} (${res.status})\n`
      })
    })
  }
  
  return tooltip
}
```

### **การจัดการ Real-time Updates**
```javascript
// เมื่อมีการยกเลิกการจอง
function handleReservationCancellation(reservationId, roomId) {
  // 1. อัพเดตข้อมูลปฏิทิน
  refreshCalendar(roomId)
  
  // 2. แสดงการแจ้งเตือน
  showNotification('ยกเลิกการจองสำเร็จ ปฏิทินได้รับการอัพเดตแล้ว', 'success')
  
  // 3. อัพเดต UI ทันที
  updateDayColor(reservationDate)
}

// การอัพเดตสีวันแบบ Real-time
function updateDayColor(date) {
  const dayElement = document.querySelector(`[data-date="${date}"]`)
  const newAvailability = fetchDayAvailability(date)
  const colorInfo = calculateDayColor(newAvailability)
  
  dayElement.style.backgroundColor = colorInfo.color
  dayElement.textContent = colorInfo.text
}
```

---

## 🔧 **การทดสอบระบบ**

### **ทดสอบ API**
```bash
# 1. ทดสอบปฏิทินรายละเอียด
curl "http://localhost:8000/api/reservations/calendar/7?detailed=true"

# 2. ทดสอบการจอง (ต้องมี JWT Token)
curl -X POST "http://localhost:8000/api/protected/reservations" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "room_id": 7,
    "start_at": "2025-08-15",
    "end_at": "2025-08-15", 
    "start_time": "2025-08-15T09:00:00.000Z",
    "end_time": "2025-08-15T12:00:00.000Z",
    "details_r": "ทดสอบการจอง"
  }'

# 3. ทดสอบการยกเลิก
curl -X DELETE "http://localhost:8000/api/protected/reservations/32" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🎨 **CSS Color Codes**

### **Flow การใช้งาน**
1. **เลือกห้องประชุม** → ไปหน้าปฏิทิน
2. **ดูสถานะในปฏิทิน** → เลือกวันที่ต้องการ
3. **คลิกวันที่ว่าง** → เลือกช่วงเวลา
4. **กรอกรายละเอียด** → ยืนยันการจอง
5. **รอการอนุมัติ** → ได้รับแจ้งเตือน

### **การแจ้งเตือน**
- **สีเปลี่ยน Real-time** เมื่อมีการจอง/ยกเลิก
- **แจ้งเตือนเมื่อห้องว่าง** สำหรับวันที่ต้องการ
- **แสดงสถานะการอนุมัติ** (รออนุมัติ/อนุมัติแล้ว/ปฏิเสธ)

---

## 🎯 **เป้าหมาย**
ให้ผู้ใช้สามารถ **เห็นภาพรวมการว่าง/ไม่ว่าง** ได้อย่างชัดเจนในหนึ่งหน้าจอ และสามารถ **จองได้ทันที** โดยไม่ต้องเปิดหลายหน้า

---

## � **Debugging & Troubleshooting**

### **การตรวจสอบปัญหาการแสดงสี**
```javascript
// 1. ตรวจสอบ API Response
console.log('Calendar Data:', response.calendar.daily_availability)

// 2. ตรวจสอบการคำนวณสี
response.calendar.daily_availability.forEach(day => {
  const availableSlots = day.slots.filter(slot => slot.available).length
  const totalSlots = day.slots.length
  console.log(`${day.date}: ${availableSlots}/${totalSlots} slots available`)
})

// 3. ตรวจสอบ day_of_week
// 0 = อาทิตย์, 1 = จันทร์, 2 = อังคาร, ..., 6 = เสาร์
```

### **ปัญหาที่อาจเกิดขึ้น**

1. **ปฏิทินแสดงสีผิด**
   - เช็ค `day_of_week` ถูกต้องไหม
   - เช็ค `slots.available` นับถูกไหม
   - เช็คการคำนวณ availableSlots/totalSlots

2. **การจองไม่ผ่าน**
   - เช็ค JWT Token หมดอายุไหม
   - เช็ค Content-Type เป็น application/json ไหม
   - เช็ค timezone ของ start_time/end_time

3. **Real-time Update ไม่ทำงาน**
   - เช็คการ refresh calendar หลังยกเลิก
   - เช็คการอัพเดต localStorage/state

### **การทดสอบ Edge Cases**
```javascript
// ทดสอบวันที่สำคัญ
testCases = [
  { date: '2025-08-09', expect: 'เสาร์ → จองได้ตามปกติ' },
  { date: '2025-08-10', expect: 'อาทิตย์ → จองได้ตามปกติ' },
  { date: '2025-08-11', expect: 'จันทร์ → จองได้ตามปกติ' },
  { date: '2025-08-05', expect: 'วันปัจจุบัน → จองได้' },
  { date: '2025-08-04', expect: 'วันที่ผ่านแล้ว → จองไม่ได้' }
]
```

---

## 📋 **Checklist สำหรับ AI Frontend**

### **✅ Must Have Features**
- [ ] แสดงปฏิทิน Grid 7x6 (Desktop) หรือ List (Mobile)
- [ ] สีพื้นหลังตามสถานะ: เขียว/เหลือง/แดง/เทา
- [ ] คลิกวันได้ → แสดง Modal จองหรือรายละเอียด
- [ ] Tooltip/Hover แสดงช่วงเวลาว่าง
- [ ] Loading state ขณะดึงข้อมูล
- [ ] Error handling เมื่อ API ล้มเหลว

### **✅ Good to Have Features**  
- [ ] เปลี่ยนเดือน/ปี Navigation
- [ ] Filter แสดงเฉพาะวันที่ว่าง
- [ ] เลือกหลายวันสำหรับการจองยาว
- [ ] Animation เมื่อสีเปลี่ยน
- [ ] Keyboard navigation (arrow keys)
- [ ] Print view สำหรับปฏิทิน

### **✅ Technical Requirements**
- [ ] Support API endpoint /api/reservations/calendar/:roomId?detailed=true
- [ ] Handle JWT Authentication สำหรับการจอง
- [ ] Responsive Design (Desktop + Mobile)
- [ ] Cross-browser compatibility
- [ ] Performance optimization (Virtual scrolling สำหรับปียาว)

---

## 📞 **สำหรับ AI Frontend**

**ไฟล์นี้คือเอกสารสมบูรณ์สำหรับการพัฒนา Frontend Calendar** 

🎯 **สิ่งที่ต้องทำ:**
1. อ่านและทำความเข้าใจ API structure
2. ใช้ sample response เป็น Mock data ในระหว่างพัฒนา
3. Implement ระบบสีตาม logic ที่อธิบาย
4. ทดสอบ Edge cases ที่ระบุไว้
5. ดูตัวอย่าง CSS และ JavaScript functions

🚨 **ข้อสำคัญ:**
- **ระบบสีขึ้นอยู่กับจำนวน available slots** ไม่ใช่แค่มี/ไม่มีการจอง
- **วันหยุดคือ เสาร์-อาทิตย์** (day_of_week 0, 6)
- **การจองต้องผ่าน Authentication** (JWT Token)
- **Real-time update** จำเป็นเมื่อมีการยกเลิก

---

## 🎨 **CSS Color Codes**

```css
/* สีสถานะห้อง */
.available { background-color: #10B981; }      /* เขียว - ว่างทั้งวัน */
.partial { background-color: #F59E0B; }        /* เหลือง - ว่างบางช่วง */
.full { background-color: #EF4444; }           /* แดง - เต็มทั้งวัน */
.past-date { background-color: #6B7280; }      /* เทา - วันที่ผ่านแล้ว */

/* สีสถานะการจอง */
.pending { background-color: #FEF3C7; }        /* เหลืองอ่อน - รออนุมัติ */
.approved { background-color: #FECACA; }       /* แดงอ่อน - อนุมัติแล้ว */
.current-day { border: 3px solid #3B82F6; }   /* น้ำเงิน - วันปัจจุบัน */
```
