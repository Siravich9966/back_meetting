// 🔍 ตรวจสอบข้อมูล capacity ในตาราง meeting_room
import { PrismaClient } from './generated/prisma/index.js'
const prisma = new PrismaClient()

async function checkRoomsCapacity() {
  try {
    console.log('🏢 กำลังตรวจสอบข้อมูล meeting_room...')
    
    const rooms = await prisma.meeting_room.findMany({
      select: {
        room_id: true,
        room_name: true,
        capacity: true,
        location_m: true,
        department: true,
        status_m: true
      }
    })
    
    console.log(`📊 พบห้องประชุมทั้งหมด: ${rooms.length} ห้อง`)
    console.log('')
    
    rooms.forEach((room, index) => {
      console.log(`${index + 1}. ${room.room_name}`)
      console.log(`   - ความจุ: ${room.capacity || 'ไม่ระบุ'} คน`)
      console.log(`   - สถานที่: ${room.location_m}`)
      console.log(`   - แผนก: ${room.department}`)
      console.log(`   - สถานะ: ${room.status_m}`)
      console.log('')
    })
    
    // เช็คว่ามีห้องไหนที่ capacity เป็น null หรือ undefined
    const roomsWithoutCapacity = rooms.filter(room => !room.capacity)
    if (roomsWithoutCapacity.length > 0) {
      console.log('⚠️ ห้องที่ไม่มี capacity:')
      roomsWithoutCapacity.forEach(room => {
        console.log(`   - ${room.room_name} (ID: ${room.room_id})`)
      })
    } else {
      console.log('✅ ทุกห้องมีข้อมูล capacity แล้ว')
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkRoomsCapacity()