import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clearOldReservations() {
  try {
    console.log('=== ล้างการจองเก่าที่ไม่ต้องการ ===')
    
    // ลบการจองในห้อง 10, 12
    const roomIds = [10, 12]
    
    for (const roomId of roomIds) {
      const deleted = await prisma.reservation.deleteMany({
        where: { room_id: roomId }
      })
      
      console.log(`✅ ลบการจองในห้อง ${roomId}: ${deleted.count} รายการ`)
    }
    
    console.log('\n🎉 ล้างการจองเสร็จแล้ว! ตอนนี้ห้อง 10, 12 ลบได้แล้ว')
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

clearOldReservations()
