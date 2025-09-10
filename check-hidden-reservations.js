import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkHiddenReservations() {
  try {
    console.log('=== เช็คการจองที่ซ่อนอยู่ ===')
    
    // เช็คการจองของห้อง 10, 12
    const rooms = [10, 12]
    
    for (const roomId of rooms) {
      console.log(`\n🏢 ห้อง ID ${roomId}:`)
      
      const reservations = await prisma.reservation.findMany({
        where: { room_id: roomId },
        include: {
          users: {
            select: {
              user_id: true,
              first_name: true,
              last_name: true,
              email: true,
              department: true
            }
          },
          officer: {
            select: {
              officer_id: true,
              first_name: true,
              last_name: true,
              department: true
            }
          },
          meeting_room: {
            select: {
              room_name: true,
              department: true
            }
          }
        }
      })
      
      if (reservations.length === 0) {
        console.log('  ✅ ไม่มีการจอง')
      } else {
        console.log(`  ❌ มีการจอง ${reservations.length} รายการ:`)
        reservations.forEach((res, i) => {
          console.log(`    ${i+1}. Reservation ID: ${res.reservation_id}`)
          console.log(`       จองโดย: ${res.users?.first_name || 'N/A'} ${res.users?.last_name || 'N/A'} (${res.users?.email || 'N/A'})`)
          console.log(`       วันที่เริ่ม: ${res.start_at}`)
          console.log(`       วันที่สิ้นสุด: ${res.end_at}`)
          console.log(`       เวลา: ${res.start_time} - ${res.end_time}`)
          console.log(`       สถานะ: ${res.status_r}`)
          console.log(`       อนุมัติโดย Officer: ${res.officer?.first_name || 'ยังไม่อนุมัติ'} ${res.officer?.last_name || ''}`)
          console.log(`       ห้อง: ${res.meeting_room?.room_name || 'N/A'}`)
          console.log(`       Multi-day: ${res.is_multi_day}`)
          console.log(`       Booking dates: ${res.booking_dates}`)
          console.log('       ---')
        })
      }
    }
    
    // เช็คการจองทั้งหมดที่ active
    console.log('\n=== การจองทั้งหมดที่ยัง active ===')
    const allActiveReservations = await prisma.reservation.findMany({
      where: {
        status_r: { not: 'cancelled' }
      },
      include: {
        users: {
          select: {
            first_name: true,
            last_name: true
          }
        },
        meeting_room: {
          select: {
            room_name: true
          }
        }
      }
    })
    
    console.log(`📊 มีการจอง active ทั้งหมด: ${allActiveReservations.length} รายการ`)
    allActiveReservations.forEach((res, i) => {
      console.log(`${i+1}. ห้อง ${res.room_id} (${res.meeting_room?.room_name || 'N/A'}) - ${res.users?.first_name || 'N/A'} ${res.users?.last_name || 'N/A'} - ${res.status_r}`)
    })
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkHiddenReservations()
