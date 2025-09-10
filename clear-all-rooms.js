import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clearAllRooms() {
  try {
    console.log('=== เริ่มลบข้อมูลห้องประชุมทั้งหมด ===')
    
    // นับห้องประชุมทั้งหมดก่อน
    const totalRooms = await prisma.meeting_room.count()
    console.log(`📊 พบห้องประชุมทั้งหมด: ${totalRooms} ห้อง`)
    
    if (totalRooms === 0) {
      console.log('✅ ไม่มีห้องประชุมใน database อยู่แล้ว')
      return
    }
    
    // ลบข้อมูลที่เกี่ยวข้องก่อน (เพื่อหลีกเลี่ยง foreign key constraint)
    
    // 1. ลบ equipment ทั้งหมด
    const deletedEquipment = await prisma.equipment.deleteMany({})
    console.log(`🛠️ ลบอุปกรณ์: ${deletedEquipment.count} รายการ`)
    
    // 2. ลบ review ทั้งหมด
    const deletedReviews = await prisma.review.deleteMany({})
    console.log(`⭐ ลบรีวิว: ${deletedReviews.count} รายการ`)
    
    // 3. ลบ reservation ทั้งหมด (ถ้ายังมีเหลือ)
    const deletedReservations = await prisma.reservation.deleteMany({})
    console.log(`📅 ลบการจอง: ${deletedReservations.count} รายการ`)
    
    // 4. สุดท้าย ลบห้องประชุมทั้งหมด
    const deletedRooms = await prisma.meeting_room.deleteMany({})
    console.log(`🏢 ลบห้องประชุม: ${deletedRooms.count} ห้อง`)
    
    // ตรวจสอบอีกครั้งว่าลบหมดแล้ว
    const remainingRooms = await prisma.meeting_room.count()
    
    if (remainingRooms === 0) {
      console.log('🎉 ลบข้อมูลห้องประชุมทั้งหมดเสร็จสิ้น! Database สะอาดแล้ว')
    } else {
      console.log(`⚠️ ยังเหลือห้องประชุม: ${remainingRooms} ห้อง`)
    }
    
    console.log('\n📋 สรุปการลบ:')
    console.log(`   🛠️ อุปกรณ์: ${deletedEquipment.count} รายการ`)
    console.log(`   ⭐ รีวิว: ${deletedReviews.count} รายการ`)
    console.log(`   📅 การจอง: ${deletedReservations.count} รายการ`)
    console.log(`   🏢 ห้องประชุม: ${deletedRooms.count} ห้อง`)
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

clearAllRooms()
