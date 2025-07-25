// ===================================================================
// ทดสอบ Multi-day Booking Logic - ตรวจสอบการซ้อนทับเวลา
// ===================================================================
// Test Case ที่คุณยกตัวอย่าง:
// 1. จองข้ามหลายวัน: 1-3 เวลา 07:00-17:00 (วันที่ 1) และ 07:00-12:00 (วันที่ 3)
// 2. จองวันที่ 3 ตอนบ่าย 13:00-17:00 ควรจะได้ (เพราะไม่ซ้อนทับ)
// 3. ทดสอบข้ามเดือน

import prisma from './lib/prisma.js'

console.log('🔍 ทดสอบ Multi-day Booking Logic\n')

async function testMultiDayLogic() {
  try {
    // ล้างข้อมูลเก่า
    await prisma.reservation.deleteMany({
      where: {
        details_r: { contains: 'TEST_MULTIDAY' }
      }
    })
    console.log('✅ ล้างข้อมูลทดสอบเก่า\n')

    // ดึงห้องแรกมาใช้ทดสอบ
    const room = await prisma.meeting_room.findFirst()
    if (!room) {
      console.log('❌ ไม่มีห้องประชุมสำหรับทดสอบ')
      return
    }

    // ดึง user แรกมาใช้ทดสอบ
    const user = await prisma.users.findFirst({
      where: { role: 'user' }
    })
    if (!user) {
      console.log('❌ ไม่มี user สำหรับทดสอบ')
      return
    }

    console.log(`📍 ใช้ห้อง: ${room.room_name} (ID: ${room.room_id})`)
    console.log(`👤 ใช้ user: ${user.first_name} ${user.last_name}\n`)

    // ===================================================================
    // Test Case 1: สร้างการจองข้ามหลายวัน (1-3 มกราคม 2025)
    // ===================================================================
    console.log('📅 Test Case 1: การจองข้ามหลายวัน')
    
    const multiDayReservation = await prisma.reservation.create({
      data: {
        user_id: user.user_id,
        room_id: room.room_id,
        start_at: new Date('2025-01-01'), // 1 มกราคม
        end_at: new Date('2025-01-03'),   // 3 มกราคม
        start_time: new Date('2025-01-01T07:00:00'), // 07:00 วันที่ 1
        end_time: new Date('2025-01-03T12:00:00'),   // 12:00 วันที่ 3
        details_r: 'TEST_MULTIDAY - การประชุมข้ามหลายวัน',
        status_r: 'approved'
      }
    })

    console.log(`✅ สร้างการจองข้ามหลายวัน: ${multiDayReservation.reservation_id}`)
    console.log(`   วันที่: 1-3 มกราคม 2025`)
    console.log(`   เวลา: 07:00 (วันที่ 1) ถึง 12:00 (วันที่ 3)\n`)

    // ===================================================================
    // Test Case 2: ทดสอบการจองวันที่ 3 ตอนบ่าย (ควรจะได้)
    // ===================================================================
    console.log('📅 Test Case 2: จองวันที่ 3 ตอนบ่าย (13:00-17:00)')
    console.log('   ❓ ควรจะได้ เพราะไม่ซ้อนทับกับ 07:00-12:00\n')

    // ทดสอบ logic ปัจจุบัน
    const startDate = new Date('2025-01-03') // 3 มกราคม
    const endDate = new Date('2025-01-03')   // วันเดียวกัน
    const startTime = new Date('2025-01-03T13:00:00') // 13:00
    const endTime = new Date('2025-01-03T17:00:00')   // 17:00

    // Query เหมือนใน API
    const conflictReservations = await prisma.reservation.findMany({
      where: {
        room_id: room.room_id,
        status_r: {
          in: ['pending', 'approved']
        },
        AND: [
          { start_at: { lt: endDate } },   // startExisting < endNew
          { end_at: { gt: startDate } }    // endExisting > startNew
        ]
      }
    })

    console.log(`🔍 พบการจองที่อาจซ้อนทับ: ${conflictReservations.length} รายการ`)
    
    conflictReservations.forEach((existing, index) => {
      console.log(`   ${index + 1}. ID: ${existing.reservation_id}`)
      console.log(`      วันที่: ${existing.start_at.toISOString().split('T')[0]} ถึง ${existing.end_at.toISOString().split('T')[0]}`)
      console.log(`      เวลา: ${existing.start_time.toTimeString().slice(0,5)} ถึง ${existing.end_time.toTimeString().slice(0,5)}`)
    })

    // ทดสอบ logic ปัจจุบัน
    const hasTimeConflict = conflictReservations.some(existing => {
      const existingStartDate = new Date(existing.start_at)
      const existingEndDate = new Date(existing.end_at)
      const existingStartTime = new Date(existing.start_time)
      const existingEndTime = new Date(existing.end_time)

      console.log(`\n🧮 ตรวจสอบ conflict กับการจอง ID: ${existing.reservation_id}`)

      // Case 1: Multi-day booking 
      const isMultiDayNew = startDate.getTime() !== endDate.getTime()
      const isMultiDayExisting = existingStartDate.getTime() !== existingEndDate.getTime()

      console.log(`   📊 Multi-day check:`)
      console.log(`      การจองใหม่เป็น multi-day: ${isMultiDayNew}`)
      console.log(`      การจองเก่าเป็น multi-day: ${isMultiDayExisting}`)

      if (isMultiDayNew || isMultiDayExisting) {
        console.log(`   ❌ Logic ปัจจุบัน: Multi-day = conflict ทันที (ผิด!)`)
        return true // ❌ ปัญหาอยู่ตรงนี้!
      }

      // Case 2: Same-day booking
      const isSameDay = (
        startDate.getFullYear() === existingStartDate.getFullYear() &&
        startDate.getMonth() === existingStartDate.getMonth() &&
        startDate.getDate() === existingStartDate.getDate()
      )

      console.log(`   📊 Same-day check: ${isSameDay}`)

      if (isSameDay) {
        const newStartMinutes = startTime.getHours() * 60 + startTime.getMinutes()
        const newEndMinutes = endTime.getHours() * 60 + endTime.getMinutes()
        const existingStartMinutes = existingStartTime.getHours() * 60 + existingStartTime.getMinutes()
        const existingEndMinutes = existingEndTime.getHours() * 60 + existingEndTime.getMinutes()

        console.log(`   ⏰ Time comparison:`)
        console.log(`      การจองใหม่: ${newStartMinutes} - ${newEndMinutes} นาที`)
        console.log(`      การจองเก่า: ${existingStartMinutes} - ${existingEndMinutes} นาที`)

        const timeOverlap = (newStartMinutes < existingEndMinutes) && (existingStartMinutes < newEndMinutes)
        console.log(`      Time overlap: ${timeOverlap}`)
        
        return timeOverlap
      }

      console.log(`   ✅ Different days - no conflict`)
      return false
    })

    console.log(`\n🎯 ผลการทดสอบ: ${hasTimeConflict ? 'CONFLICT ❌' : 'NO CONFLICT ✅'}`)
    console.log(`   Expected: NO CONFLICT ✅ (เพราะ 13:00-17:00 ไม่ซ้อนทับกับ 07:00-12:00)`)
    console.log(`   Actual: ${hasTimeConflict ? 'CONFLICT ❌' : 'NO CONFLICT ✅'}`)

    if (hasTimeConflict) {
      console.log(`\n🐛 BUG CONFIRMED: Logic ปัจจุบันผิด!`)
      console.log(`   ปัญหา: Multi-day booking ถูก assume ว่าใช้ห้องทั้งวัน`)
      console.log(`   แก้ไข: ต้องเช็คเวลาละเอียดแม้จะเป็น multi-day`)
    } else {
      console.log(`\n✅ Logic ถูกต้อง`)
    }

    // ===================================================================
    // Test Case 3: ทดสอบข้ามเดือน
    // ===================================================================
    console.log(`\n📅 Test Case 3: ทดสอบการจองข้ามเดือน`)
    
    // สร้างการจองข้ามเดือน: 30 มกราคม - 2 กุมภาพันธ์
    const crossMonthReservation = await prisma.reservation.create({
      data: {
        user_id: user.user_id,
        room_id: room.room_id,
        start_at: new Date('2025-01-30'), // 30 มกราคม
        end_at: new Date('2025-02-02'),   // 2 กุมภาพันธ์
        start_time: new Date('2025-01-30T09:00:00'), // 09:00 วันที่ 30
        end_time: new Date('2025-02-02T15:00:00'),   // 15:00 วันที่ 2
        details_r: 'TEST_MULTIDAY - การประชุมข้ามเดือน',
        status_r: 'approved'
      }
    })

    console.log(`✅ สร้างการจองข้ามเดือน: ${crossMonthReservation.reservation_id}`)
    console.log(`   วันที่: 30 มกราคม - 2 กุมภาพันธ์ 2025`)
    console.log(`   เวลา: 09:00 (วันที่ 30) ถึง 15:00 (วันที่ 2)`)

    // ทดสอบการจองวันที่ 1 กุมภาพันธ์ ตอนเย็น (ควรไม่ได้)
    console.log(`\n🔍 ทดสอบ: จองวันที่ 1 กุมภาพันธ์ เวลา 16:00-18:00`)
    console.log(`   ❓ ควรไม่ได้ เพราะวันที่ 1 กุมภาพันธ์ อยู่ในช่วงการจองข้ามเดือน`)

    // Logic test สำหรับข้ามเดือน
    const crossMonthTestDate = new Date('2025-02-01')
    const crossMonthTestTime1 = new Date('2025-02-01T16:00:00')
    const crossMonthTestTime2 = new Date('2025-02-01T18:00:00')

    const crossMonthConflicts = await prisma.reservation.findMany({
      where: {
        room_id: room.room_id,
        status_r: { in: ['pending', 'approved'] },
        AND: [
          { start_at: { lt: crossMonthTestDate } },
          { end_at: { gt: crossMonthTestDate } }
        ]
      }
    })

    console.log(`   🔍 พบการจองที่อาจซ้อนทับ: ${crossMonthConflicts.length} รายการ`)
    console.log(`   📊 ระบบควรตรวจพบการจองข้ามเดือนและ reject การจองใหม่`)

    // ===================================================================
    // ล้างข้อมูลทดสอบ
    // ===================================================================
    await prisma.reservation.deleteMany({
      where: {
        details_r: { contains: 'TEST_MULTIDAY' }
      }
    })
    console.log(`\n🧹 ล้างข้อมูลทดสอบเรียบร้อย`)

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// รัน test
testMultiDayLogic()
