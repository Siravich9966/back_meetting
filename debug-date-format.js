// ตรวจสอบ date format ในฐานข้อมูล
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkDateFormat() {
  try {
    console.log('🔍 ตรวจสอบ date format ในฐานข้อมูล')
    console.log('=' * 50)

    // ดูการจองของ IT Lab ในวันที่ 17
    const bookings = await prisma.reservation.findMany({
      where: {
        room_id: 7,
        start_at: {
          gte: new Date('2025-08-17')
        }
      },
      orderBy: {
        created_at: 'desc'
      },
      take: 5
    })

    console.log(`พบการจอง ${bookings.length} รายการ:`)
    bookings.forEach((booking, i) => {
      console.log(`\n${i+1}. ID: ${booking.reservation_id}`)
      console.log(`   start_at: ${booking.start_at} (type: ${typeof booking.start_at})`)
      console.log(`   end_at: ${booking.end_at} (type: ${typeof booking.end_at})`)
      console.log(`   start_time: ${booking.start_time} (type: ${typeof booking.start_time})`)
      console.log(`   end_time: ${booking.end_time} (type: ${typeof booking.end_time})`)
      console.log(`   start_at ISO: ${booking.start_at.toISOString()}`)
      console.log(`   end_at ISO: ${booking.end_at.toISOString()}`)
      console.log(`   start_time ISO: ${booking.start_time.toISOString()}`)
      console.log(`   end_time ISO: ${booking.end_time.toISOString()}`)
    })

    // ทดสอบ query ต่างๆ
    console.log('\n📊 ทดสอบ query ต่างๆ:')
    
    // Query 1: ใช้ string date
    const query1 = await prisma.reservation.findMany({
      where: {
        room_id: 7,
        start_at: {
          gte: new Date('2025-08-17T00:00:00.000Z'),
          lt: new Date('2025-08-18T00:00:00.000Z')
        }
      }
    })
    console.log(`Query 1 (string date): ${query1.length} รายการ`)

    // Query 2: ใช้ date object
    const testDate = new Date('2025-08-17')
    console.log(`Test date: ${testDate.toISOString()}`)
    const query2 = await prisma.reservation.findMany({
      where: {
        room_id: 7,
        start_at: testDate
      }
    })
    console.log(`Query 2 (exact date): ${query2.length} รายการ`)

    // Query 3: ใช้ startDate และ endDate เหมือนใน conflict detection
    const startDate = new Date('2025-08-17T00:00:00.000Z')
    const endDate = new Date('2025-08-17T23:59:59.999Z')
    
    console.log(`startDate: ${startDate.toISOString()}`)
    console.log(`endDate: ${endDate.toISOString()}`)
    
    const query3 = await prisma.reservation.findMany({
      where: {
        room_id: 7,
        status_r: {
          in: ['pending', 'approved']
        },
        AND: [
          { start_at: { lt: endDate } },   // startExisting < endNew
          { end_at: { gt: startDate } }    // endExisting > startNew
        ]
      }
    })
    console.log(`Query 3 (conflict detection): ${query3.length} รายการ`)

    if (query3.length > 0) {
      console.log('\nรายการที่เจอ:')
      query3.forEach((booking, i) => {
        console.log(`${i+1}. ID: ${booking.reservation_id} - ${booking.start_at.toISOString()} ถึง ${booking.end_at.toISOString()}`)
        
        // เช็คเงื่อนไข
        const condition1 = booking.start_at < endDate
        const condition2 = booking.end_at > startDate
        console.log(`   start_at < endDate: ${condition1}`)
        console.log(`   end_at > startDate: ${condition2}`)
      })
    }

  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// เรียกใช้งาน
checkDateFormat()
