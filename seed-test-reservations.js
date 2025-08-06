// ===================================================================
// สคริปต์เพิ่มข้อมูลทดสอบการจองผ่าน Prisma
// ===================================================================
import prisma from './lib/prisma.js'

async function createTestReservations() {
  try {
    console.log('🚀 เริ่มเพิ่มข้อมูลทดสอบการจอง')
    console.log('=' .repeat(60))
    
    // ตรวจสอบ user_id ที่มีอยู่
    const users = await prisma.users.findMany({
      select: { user_id: true, first_name: true, last_name: true },
      take: 5
    })
    
    console.log('👥 ผู้ใช้ที่มีในระบบ:')
    users.forEach(user => {
      console.log(`   - ID: ${user.user_id}, ชื่อ: ${user.first_name} ${user.last_name}`)
    })
    
    if (users.length === 0) {
      console.log('❌ ไม่พบผู้ใช้ในระบบ')
      return
    }
    
    const testUserId = users[0].user_id
    console.log(`\n✅ จะใช้ user_id: ${testUserId} (${users[0].first_name} ${users[0].last_name})`)
    
    // ลบข้อมูลทดสอบเก่า (ถ้ามี)
    console.log('\n🧹 ลบข้อมูลทดสอบเก่า...')
    const deleted = await prisma.reservation.deleteMany({
      where: {
        details_r: {
          contains: '(ทดสอบ)'
        }
      }
    })
    console.log(`   ลบข้อมูลเก่า: ${deleted.count} รายการ`)
    
    // สร้างข้อมูลทดสอบใหม่
    console.log('\n📝 สร้างข้อมูลทดสอบใหม่...')
    
    const testReservations = [
      {
        user_id: testUserId,
        room_id: 7,
        start_at: new Date('2025-08-05'),
        end_at: new Date('2025-08-05'),
        start_time: new Date('2025-08-05T09:00:00'),
        end_time: new Date('2025-08-05T12:00:00'),
        details_r: 'ประชุมคณะกรรมการ IT (ทดสอบ)',
        status_r: 'approved'
      },
      {
        user_id: testUserId,
        room_id: 7,
        start_at: new Date('2025-08-06'),
        end_at: new Date('2025-08-06'),
        start_time: new Date('2025-08-06T06:00:00'),
        end_time: new Date('2025-08-06T12:00:00'),
        details_r: 'อบรมพนักงาน เช้า (ทดสอบ)',
        status_r: 'approved'
      },
      {
        user_id: testUserId,
        room_id: 7,
        start_at: new Date('2025-08-06'),
        end_at: new Date('2025-08-06'),
        start_time: new Date('2025-08-06T13:00:00'),
        end_time: new Date('2025-08-06T18:00:00'),
        details_r: 'อบรมพนักงาน บ่าย (ทดสอบ)',
        status_r: 'approved'
      },
      {
        user_id: testUserId,
        room_id: 7,
        start_at: new Date('2025-08-07'),
        end_at: new Date('2025-08-07'),
        start_time: new Date('2025-08-07T15:00:00'),
        end_time: new Date('2025-08-07T18:00:00'),
        details_r: 'ประชุมแผนกคอมพิวเตอร์ (ทดสอบ)',
        status_r: 'approved'
      }
    ]
    
    // เพิ่มข้อมูลทีละรายการ
    for (let i = 0; i < testReservations.length; i++) {
      const reservation = testReservations[i]
      const created = await prisma.reservation.create({
        data: reservation
      })
      
      const date = reservation.start_at.toLocaleDateString('th-TH')
      const startTime = reservation.start_time.toLocaleTimeString('th-TH', {hour: '2-digit', minute: '2-digit'})
      const endTime = reservation.end_time.toLocaleTimeString('th-TH', {hour: '2-digit', minute: '2-digit'})
      
      console.log(`   ✅ การจองที่ ${i + 1}: ID ${created.reservation_id} - ${date} ${startTime}-${endTime}`)
    }
    
    console.log('\n🎨 ผลลัพธ์ที่คาดหวังในปฏิทิน:')
    console.log('   📅 5/8/2568 (วันนี้): 🟡 เหลือง - ว่างบางช่วง (09:00-12:00 ถูกจอง)')
    console.log('   📅 6/8/2568 (พรุ่งนี้): 🔴 แดง - เต็มทั้งวัน (06:00-12:00, 13:00-18:00 ถูกจอง)')
    console.log('   📅 7/8/2568 (มะรืนนี้): 🟡 เหลือง - ว่างบางช่วง (15:00-18:00 ถูกจอง)')
    
    console.log('\n✅ เพิ่มข้อมูลทดสอบเสร็จสิ้น')
    console.log('💡 ทดสอบดูผลลัพธ์: bun test-calendar.js')
    
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// เรียกใช้ฟังก์ชัน
createTestReservations()
