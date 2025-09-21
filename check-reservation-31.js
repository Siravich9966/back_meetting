// เช็คข้อมูลการจอง ID 31
import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()

async function checkReservation31() {
  try {
    console.log('🔍 กำลังเช็คข้อมูลการจอง ID 31...')
    
    const reservation = await prisma.reservation.findUnique({
      where: {
        reservation_id: 31
      },
      include: {
        meeting_room: {
          select: {
            room_name: true,
            location_m: true,
            capacity: true,
            department: true
          }
        },
        users: {
          select: {
            first_name: true,
            last_name: true,
            department: true
          }
        },
        officer: {
          select: {
            officer_id: true,
            first_name: true,
            last_name: true
          }
        }
      }
    })

    if (reservation) {
      console.log('\n📋 ข้อมูลการจอง ID 31:')
      console.log('  🆔 reservation_id:', reservation.reservation_id)
      console.log('  🏢 room_name:', reservation.meeting_room?.room_name)
      console.log('  📊 status_r:', reservation.status_r)
      console.log('  📝 details_r:', reservation.details_r)
      console.log('  👤 user_id:', reservation.user_id)
      console.log('  👮 officer_id:', reservation.officer_id)
      console.log('  🗓️ created_at:', reservation.created_at)
      console.log('  🔄 updated_at:', reservation.updated_at)
      
      console.log('\n👤 ข้อมูลผู้จอง:')
      console.log('  📛 ชื่อ:', reservation.users?.first_name, reservation.users?.last_name)
      console.log('  🏛️ แผนก:', reservation.users?.department)
      
      console.log('\n👮 ข้อมูลเจ้าหน้าที่:')
      if (reservation.officer) {
        console.log('  🆔 officer_id:', reservation.officer.officer_id)
        console.log('  📛 ชื่อ:', reservation.officer.first_name, reservation.officer.last_name)
      } else {
        console.log('  ❌ ไม่มีข้อมูลเจ้าหน้าที่ (officer_id เป็น null)')
      }
      
    } else {
      console.log('  ❌ ไม่พบการจอง ID 31')
    }

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkReservation31()