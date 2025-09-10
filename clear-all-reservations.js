import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clearAllReservations() {
  try {
    console.log('=== เริ่มลบการจองทั้งหมดใน database ===')
    
    // นับการจองทั้งหมดก่อน
    const totalCount = await prisma.reservation.count()
    console.log(`📊 พบการจองทั้งหมด: ${totalCount} รายการ`)
    
    if (totalCount === 0) {
      console.log('✅ ไม่มีการจองใน database อยู่แล้ว')
      return
    }
    
    // ลบการจองทั้งหมด
    const deleted = await prisma.reservation.deleteMany({})
    
    console.log(`🗑️ ลบการจองสำเร็จ: ${deleted.count} รายการ`)
    
    // ตรวจสอบอีกครั้งว่าลบหมดแล้ว
    const remaining = await prisma.reservation.count()
    
    if (remaining === 0) {
      console.log('🎉 ลบการจองทั้งหมดเสร็จสิ้น! Database สะอาดแล้ว')
    } else {
      console.log(`⚠️ ยังเหลือการจอง: ${remaining} รายการ`)
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

clearAllReservations()
