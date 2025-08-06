// ===================================================================
// สคริปต์สร้างข้อมูลทดสอบการจอง
// ===================================================================
// สร้างการจองตัวอย่างเพื่อทดสอบระบบสีในปฏิทิน
// ===================================================================

const baseURL = 'http://localhost:8000/api'

async function createTestReservations() {
  console.log('🚀 เริ่มสร้างข้อมูลทดสอบการจอง')
  console.log('=' .repeat(60))
  
  // ข้อมูลการจองทดสอบ
  const testReservations = [
    {
      room_id: 7,
      start_at: '2025-08-05', // วันนี้
      end_at: '2025-08-05',
      start_time: '2025-08-05T09:00:00',
      end_time: '2025-08-05T12:00:00',
      details_r: 'ประชุมคณะกรรมการ IT (ทดสอบ)'
    },
    {
      room_id: 7,
      start_at: '2025-08-06', // พรุ่งนี้ - เต็มวัน
      end_at: '2025-08-06',
      start_time: '2025-08-06T06:00:00',
      end_time: '2025-08-06T12:00:00',
      details_r: 'อบรมพนักงาน เช้า (ทดสอบ)'
    },
    {
      room_id: 7,
      start_at: '2025-08-06', // พรุ่งนี้ - เต็มวัน
      end_at: '2025-08-06',
      start_time: '2025-08-06T13:00:00',
      end_time: '2025-08-06T18:00:00',
      details_r: 'อบรมพนักงาน บ่าย (ทดสอบ)'
    },
    {
      room_id: 7,
      start_at: '2025-08-07', // มะรืนนี้ - บางช่วง
      end_at: '2025-08-07',
      start_time: '2025-08-07T15:00:00',
      end_time: '2025-08-07T18:00:00',
      details_r: 'ประชุมแผนกคอมพิวเตอร์ (ทดสอบ)'
    }
  ]
  
  // จำลองการล็อกอินเพื่อรับ JWT token
  // (ในการทดสอบจริง จะต้องมี token)
  console.log('📝 หมายเหตุ: การจองต้องผ่าน authentication')
  console.log('   ในการทดสอบจริง จะต้องล็อกอินก่อน')
  console.log('   ตอนนี้เราจะสร้างข้อมูลใน database โดยตรง')
  
  // แสดงข้อมูลการจองที่จะสร้าง
  console.log('\n📋 การจองที่จะสร้าง:')
  testReservations.forEach((reservation, index) => {
    const date = new Date(reservation.start_at).toLocaleDateString('th-TH')
    const startTime = new Date(reservation.start_time).toLocaleTimeString('th-TH', {hour: '2-digit', minute: '2-digit'})
    const endTime = new Date(reservation.end_time).toLocaleTimeString('th-TH', {hour: '2-digit', minute: '2-digit'})
    
    console.log(`   ${index + 1}. ${date} ${startTime}-${endTime}: ${reservation.details_r}`)
  })
  
  console.log('\n🎨 ผลลัพธ์ที่คาดหวังในปฏิทิน:')
  console.log('   📅 5/8/2568 (วันนี้): 🟡 เหลือง - ว่างบางช่วง (09:00-12:00 ถูกจอง)')
  console.log('   📅 6/8/2568 (พรุ่งนี้): 🔴 แดง - เต็มทั้งวัน (06:00-12:00, 13:00-18:00 ถูกจอง)')
  console.log('   📅 7/8/2568 (มะรืนนี้): 🟡 เหลือง - ว่างบางช่วง (15:00-18:00 ถูกจอง)')
  
  console.log('\n✅ ข้อมูลทดสอบพร้อมแล้ว')
  console.log('💡 คำแนะนำ: ใช้ SQL หรือ Prisma Studio เพื่อเพิ่มข้อมูลเหล่านี้')
}

// แสดง SQL statements สำหรับเพิ่มข้อมูลทดสอบ
function generateTestSQL() {
  console.log('\n📝 SQL Statements สำหรับเพิ่มข้อมูลทดสอบ:')
  console.log('-- คำเตือน: ใช้ user_id ที่มีอยู่จริงในระบบ')
  console.log("-- ตรวจสอบ user_id ด้วย: SELECT user_id, first_name FROM users LIMIT 5;")
  console.log('')
  
  const sqlStatements = [
    `INSERT INTO reservation (user_id, room_id, start_at, end_at, start_time, end_time, details_r, status_r) VALUES 
(1, 7, '2025-08-05', '2025-08-05', '2025-08-05 09:00:00', '2025-08-05 12:00:00', 'ประชุมคณะกรรมการ IT (ทดสอบ)', 'approved');`,
    
    `INSERT INTO reservation (user_id, room_id, start_at, end_at, start_time, end_time, details_r, status_r) VALUES 
(1, 7, '2025-08-06', '2025-08-06', '2025-08-06 06:00:00', '2025-08-06 12:00:00', 'อบรมพนักงาน เช้า (ทดสอบ)', 'approved');`,
    
    `INSERT INTO reservation (user_id, room_id, start_at, end_at, start_time, end_time, details_r, status_r) VALUES 
(1, 7, '2025-08-06', '2025-08-06', '2025-08-06 13:00:00', '2025-08-06 18:00:00', 'อบรมพนักงาน บ่าย (ทดสอบ)', 'approved');`,
    
    `INSERT INTO reservation (user_id, room_id, start_at, end_at, start_time, end_time, details_r, status_r) VALUES 
(1, 7, '2025-08-07', '2025-08-07', '2025-08-07 15:00:00', '2025-08-07 18:00:00', 'ประชุมแผนกคอมพิวเตอร์ (ทดสอบ)', 'approved');`
  ]
  
  sqlStatements.forEach((sql, index) => {
    console.log(`-- การจองที่ ${index + 1}`)
    console.log(sql)
    console.log('')
  })
  
  console.log('-- หลังจากเพิ่มข้อมูลแล้ว ให้รัน: bun test-calendar.js เพื่อดูผลลัพธ์')
}

// เริ่มทำงาน
createTestReservations()
generateTestSQL()
