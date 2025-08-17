// ทดสอบระบบ conflict detection
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConflictBooking() {
  try {
    console.log('🧪 ทดสอบระบบ conflict detection')
    console.log('=' * 50)

    // ดูข้อมูลการจองในวันที่ 17 สิงหาคม 2568 (2025)
    const testDate = new Date('2025-08-17')
    
    console.log('\n1. ดูการจองที่มีอยู่ในวันที่ 17 สิงหาคม 2568:')
    const existingBookings = await prisma.reservation.findMany({
      where: {
        start_at: {
          gte: new Date('2025-08-17T00:00:00.000Z'),
          lt: new Date('2025-08-18T00:00:00.000Z')
        },
        room_id: 7, // IT Lab
        status_r: {
          in: ['pending', 'approved']
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
        start_time: 'asc'
      }
    })

    console.log(`พบการจอง ${existingBookings.length} รายการ:`)
    existingBookings.forEach((booking, i) => {
      console.log(`${i+1}. ${booking.users?.first_name || 'N/A'} ${booking.users?.last_name || 'N/A'}`)
      console.log(`   ห้อง: ${booking.meeting_room?.room_name || 'N/A'}`)
      console.log(`   วันที่: ${booking.start_at.toISOString().split('T')[0]} ถึง ${booking.end_at.toISOString().split('T')[0]}`)
      console.log(`   เวลา: ${booking.start_time.toTimeString().slice(0,5)} - ${booking.end_time.toTimeString().slice(0,5)}`)
      console.log(`   สถานะ: ${booking.status_r}`)
      console.log(`   รายละเอียด: ${booking.details_r}`)
      console.log(`   ID: ${booking.reservation_id}`)
      console.log('')
    })

    console.log('\n2. ทดสอบการสร้างการจองที่ทับซ้อน:')
    
    // สมมติเรามีการจองอยู่แล้ว 08:00-09:00
    // ทดสอบจองใหม่ 08:00-09:00 (ซ้อนทับเต็มช่วง)
    console.log('กรณีที่ 1: ทดสอบจอง 08:00-09:00 (ซ้อนทับเต็มช่วง)')
    await testBookingConflict({
      room_id: 7, // ใช้ room_id 7 ตาม IT Lab
      start_at: '2025-08-17',
      end_at: '2025-08-17', 
      start_time: '08:00',
      end_time: '09:00'
    })

    console.log('\nกรณีที่ 2: ทดสอบจอง 08:00-10:00 (ซ้อนทับ 2 ชั่วโมง)')
    await testBookingConflict({
      room_id: 7, // ใช้ room_id 7 ตาม IT Lab
      start_at: '2025-08-17',
      end_at: '2025-08-17',
      start_time: '08:00', 
      end_time: '10:00'
    })

    console.log('\nกรณีที่ 3: ทดสอบจอง 09:00-10:00 (ซ้อนทับช่วงต่อ)')
    await testBookingConflict({
      room_id: 7, // ใช้ room_id 7 ตาม IT Lab
      start_at: '2025-08-17',
      end_at: '2025-08-17',
      start_time: '09:00',
      end_time: '10:00'
    })

    console.log('\nกรณีที่ 4: ทดสอบจอง 11:00-12:00 (ไม่ซ้อนทับ)')
    await testBookingConflict({
      room_id: 7, // ใช้ room_id 7 ตาม IT Lab
      start_at: '2025-08-17',
      end_at: '2025-08-17',
      start_time: '11:00',
      end_time: '12:00'
    })

  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error)
  } finally {
    await prisma.$disconnect()
  }
}

async function testBookingConflict(bookingData) {
  try {
    // แปลงข้อมูลตามรูปแบบของ API
    const startDate = new Date(bookingData.start_at + 'T00:00:00.000Z')
    const endDate = new Date(bookingData.end_at + 'T23:59:59.999Z')
    
    const [startHour, startMinute] = bookingData.start_time.split(':').map(Number)
    const [endHour, endMinute] = bookingData.end_time.split(':').map(Number)
    
    const startTime = new Date()
    startTime.setHours(startHour, startMinute, 0, 0)
    
    const endTime = new Date()
    endTime.setHours(endHour, endMinute, 0, 0)

    console.log(`   📅 จองวันที่: ${startDate.toISOString().split('T')[0]}`)
    console.log(`   ⏰ เวลา: ${bookingData.start_time} - ${bookingData.end_time}`)
    console.log(`   🔎 startDate: ${startDate.toISOString()}`)
    console.log(`   🔎 endDate: ${endDate.toISOString()}`)

    // ตรวจสอบการจองที่ซ้อนทับ (คัดลอกจาก API จริง)
    const conflictReservations = await prisma.reservation.findMany({
      where: {
        room_id: parseInt(bookingData.room_id),
        status_r: {
          in: ['pending', 'approved'] // ไม่นับ rejected
        },
        AND: [
          // ช่วงวันที่ต้องซ้อนทับกัน: (startNew < endExisting) AND (startExisting < endNew)
          { start_at: { lt: endDate } },   // startExisting < endNew
          { end_at: { gt: startDate } }    // endExisting > startNew
        ]
      }
    })

    console.log(`   🔍 พบการจองที่อาจทับซ้อน: ${conflictReservations.length} รายการ`)

    // ตรวจสอบ time conflict ละเอียด
    const hasTimeConflict = conflictReservations.some(existing => {
      const existingStartDate = new Date(existing.start_at)
      const existingEndDate = new Date(existing.end_at)
      const existingStartTime = new Date(existing.start_time)
      const existingEndTime = new Date(existing.end_time)

      console.log(`     - การจองที่มีอยู่: ${existingStartTime.toTimeString().slice(0,5)}-${existingEndTime.toTimeString().slice(0,5)}`)

      // หาช่วงวันที่ที่ทับซ้อนกัน
      const overlapStart = new Date(Math.max(startDate.getTime(), existingStartDate.getTime()))
      const overlapEnd = new Date(Math.min(endDate.getTime(), existingEndDate.getTime()))

      // วนเช็คทุกวันที่ทับซ้อนกัน
      let currentDate = new Date(overlapStart)
      while (currentDate <= overlapEnd) {
        // เวลาที่ใช้สำหรับการจองเก่าในวันนี้
        let dayExistingStartTime, dayExistingEndTime
        
        if (currentDate.getTime() === existingStartDate.getTime() && currentDate.getTime() === existingEndDate.getTime()) {
          // Single day booking - ใช้เวลาตามที่ระบุ
          dayExistingStartTime = existingStartTime
          dayExistingEndTime = existingEndTime
        } else if (currentDate.getTime() === existingEndDate.getTime()) {
          // วันสุดท้ายของ multi-day booking
          dayExistingStartTime = existingStartTime
          dayExistingEndTime = existingEndTime
        } else {
          // วันแรกและวันกลางของ multi-day booking
          dayExistingStartTime = existingStartTime
          dayExistingEndTime = new Date(existingStartTime.getTime())
          dayExistingEndTime.setHours(22, 0, 0, 0)
        }

        // เวลาที่ใช้สำหรับการจองใหม่ในวันนี้
        let dayNewStartTime, dayNewEndTime
        
        if (currentDate.getTime() === startDate.getTime() && currentDate.getTime() === endDate.getTime()) {
          // Single day booking ใหม่
          dayNewStartTime = startTime
          dayNewEndTime = endTime
        } else if (currentDate.getTime() === endDate.getTime()) {
          // วันสุดท้ายของการจองใหม่
          dayNewStartTime = startTime
          dayNewEndTime = endTime
        } else {
          // วันแรกและวันกลางของการจองใหม่
          dayNewStartTime = startTime
          dayNewEndTime = new Date(startTime.getTime())
          dayNewEndTime.setHours(22, 0, 0, 0)
        }

        // เช็ค time overlap ในวันนี้
        const newStartMinutes = dayNewStartTime.getHours() * 60 + dayNewStartTime.getMinutes()
        const newEndMinutes = dayNewEndTime.getHours() * 60 + dayNewEndTime.getMinutes()
        const existingStartMinutes = dayExistingStartTime.getHours() * 60 + dayExistingStartTime.getMinutes()
        const existingEndMinutes = dayExistingEndTime.getHours() * 60 + dayExistingEndTime.getMinutes()

        console.log(`       - เปรียบเทียบเวลา: ใหม่ ${Math.floor(newStartMinutes/60).toString().padStart(2,'0')}:${(newStartMinutes%60).toString().padStart(2,'0')}-${Math.floor(newEndMinutes/60).toString().padStart(2,'0')}:${(newEndMinutes%60).toString().padStart(2,'0')} vs เก่า ${Math.floor(existingStartMinutes/60).toString().padStart(2,'0')}:${(existingStartMinutes%60).toString().padStart(2,'0')}-${Math.floor(existingEndMinutes/60).toString().padStart(2,'0')}:${(existingEndMinutes%60).toString().padStart(2,'0')}`)

        // Time slots overlap if: (start1 < end2) AND (start2 < end1)
        const hasTimeOverlapToday = (newStartMinutes < existingEndMinutes) && (existingStartMinutes < newEndMinutes)
        
        if (hasTimeOverlapToday) {
          console.log(`       ⚠️  ตรวจพบ conflict ในวันที่ ${currentDate.toDateString()}`)
          return true
        }

        // ไปวันถัดไป
        currentDate.setDate(currentDate.getDate() + 1)
      }

      return false
    })

    if (hasTimeConflict) {
      console.log('   ❌ ผลลัพธ์: ไม่สามารถจองได้ (มี conflict)')
    } else {
      console.log('   ✅ ผลลัพธ์: สามารถจองได้')
    }

  } catch (error) {
    console.error('   ❌ เกิดข้อผิดพลาดในการทดสอบ:', error)
  }
}

// เรียกใช้งาน
testConflictBooking()
