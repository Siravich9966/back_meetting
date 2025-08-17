// ตรวจสอบข้อมูลการจองในฐานข้อมูล
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkDatabase() {
  try {
    console.log('🔍 ตรวจสอบข้อมูลในฐานข้อมูล')
    console.log('=' * 40)

    console.log('\n1. ตรวจสอบการจองทั้งหมด:')
    const allBookings = await prisma.reservation.findMany({
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
      },
      orderBy: {
        created_at: 'desc'
      },
      take: 10 // แสดงล่าสุด 10 รายการ
    })

    console.log(`พบการจองทั้งหมด: ${allBookings.length} รายการ`)
    allBookings.forEach((booking, i) => {
      console.log(`\n${i+1}. ID: ${booking.reservation_id}`)
      console.log(`   ผู้จอง: ${booking.users?.first_name || 'N/A'} ${booking.users?.last_name || 'N/A'}`)
      console.log(`   ห้อง: ${booking.meeting_room?.room_name || 'N/A'} (ID: ${booking.room_id})`)
      console.log(`   วันที่: ${booking.start_at?.toISOString().split('T')[0]} ถึง ${booking.end_at?.toISOString().split('T')[0]}`)
      console.log(`   เวลา: ${booking.start_time?.toTimeString().slice(0,5)} - ${booking.end_time?.toTimeString().slice(0,5)}`)
      console.log(`   สถานะ: ${booking.status_r}`)
      console.log(`   รายละเอียด: ${booking.details_r}`)
      console.log(`   สร้างเมื่อ: ${booking.created_at?.toISOString()}`)
    })

    console.log('\n2. ตรวจสอบการจองในเดือนสิงหาคม 2025:')
    const augustBookings = await prisma.reservation.findMany({
      where: {
        start_at: {
          gte: new Date('2025-08-01T00:00:00.000Z'),
          lt: new Date('2025-09-01T00:00:00.000Z')
        }
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
      },
      orderBy: {
        start_at: 'asc'
      }
    })

    console.log(`พบการจองในเดือนสิงหาคม 2025: ${augustBookings.length} รายการ`)
    augustBookings.forEach((booking, i) => {
      console.log(`\n${i+1}. ID: ${booking.reservation_id}`)
      console.log(`   ผู้จอง: ${booking.users?.first_name || 'N/A'} ${booking.users?.last_name || 'N/A'}`)
      console.log(`   ห้อง: ${booking.meeting_room?.room_name || 'N/A'} (ID: ${booking.room_id})`)
      console.log(`   วันที่: ${booking.start_at?.toISOString().split('T')[0]} ถึง ${booking.end_at?.toISOString().split('T')[0]}`)
      console.log(`   เวลา: ${booking.start_time?.toTimeString().slice(0,5)} - ${booking.end_time?.toTimeString().slice(0,5)}`)
      console.log(`   สถานะ: ${booking.status_r}`)
    })

    console.log('\n3. ตรวจสอบห้องประชุม:')
    const rooms = await prisma.meeting_room.findMany({
      orderBy: {
        room_id: 'asc'
      }
    })

    console.log(`พบห้องประชุมทั้งหมด: ${rooms.length} ห้อง`)
    rooms.forEach((room, i) => {
      console.log(`${i+1}. ID: ${room.room_id} - ${room.room_name}`)
    })

  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// เรียกใช้งาน
checkDatabase()
