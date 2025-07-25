// ===================================================================
// Test Advanced Multi-day Booking Logic - ทดสอบ logic การจองหลายวันขั้นสูง
// ===================================================================
// ทดสอบกรณีที่คุณอธิบาย:
// การจองเก่า: วันที่ 1/1/68 ถึง 5/2/68, เวลาเริ่ม 07:00-17:00, เวลาสิ้นสุด 07:00-12:00
// การจองใหม่: วันที่ 5/2/68, เวลา 13:00-17:00 (ควรจองได้เพราะไม่ทับกับ 07:00-12:00)

console.log('🧪 Testing Advanced Multi-day Booking Logic...\n')

// ปัญหาปัจจุบันใน logic: 
// ระบบปัจจุบันไม่รองรับ "เวลาต่างกันในวันสุดท้าย"
// ระบบถือว่า multi-day booking = ใช้เวลาเดียวกันทุกวัน

function analyzeCurrentLogic(existingBooking, newBooking) {
  console.log('📊 การวิเคราะห์ Logic ปัจจุบัน:')
  console.log('=' .repeat(50))
  
  const existing = {
    start_at: new Date(existingBooking.start_at),
    end_at: new Date(existingBooking.end_at),
    start_time: new Date(existingBooking.start_time),
    end_time: new Date(existingBooking.end_time)
  }
  
  const newReq = {
    start_at: new Date(newBooking.start_at),
    end_at: new Date(newBooking.end_at),
    start_time: new Date(newBooking.start_time),
    end_time: new Date(newBooking.end_time)
  }
  
  console.log('📅 การจองเก่า:')
  console.log(`  วันที่: ${existing.start_at.toDateString()} ถึง ${existing.end_at.toDateString()}`)
  console.log(`  เวลา: ${existing.start_time.toTimeString().slice(0,5)} - ${existing.end_time.toTimeString().slice(0,5)}`)
  console.log(`  ⚠️  ปัญหา: ระบบไม่รู้ว่าวันสุดท้าย (5/2/68) ใช้เวลา 07:00-12:00`)
  
  console.log('\n🆕 การจองใหม่:')
  console.log(`  วันที่: ${newReq.start_at.toDateString()} ถึง ${newReq.end_at.toDateString()}`)
  console.log(`  เวลา: ${newReq.start_time.toTimeString().slice(0,5)} - ${newReq.end_time.toTimeString().slice(0,5)}`)
  
  // ตรวจสอบตาม logic ปัจจุบัน
  const hasDateOverlap = (newReq.start_at <= existing.end_at) && (existing.start_at <= newReq.end_at)
  console.log(`\n🔍 การตรวจสอบตาม Logic ปัจจุบัน:`)
  console.log(`  1. วันที่ซ้อนทับ: ${hasDateOverlap}`)
  
  const isMultiDayExisting = existing.start_at.getTime() !== existing.end_at.getTime()
  const isMultiDayNew = newReq.start_at.getTime() !== newReq.end_at.getTime()
  
  console.log(`  2. การจองเก่าเป็นหลายวัน: ${isMultiDayExisting}`)
  console.log(`  3. การจองใหม่เป็นหลายวัน: ${isMultiDayNew}`)
  
  if (isMultiDayExisting || isMultiDayNew) {
    console.log('  4. ❌ Logic ปัจจุบัน: Multi-day = conflict โดยอัตโนมัติ')
    console.log('     (ไม่เช็คเวลาละเอียด)')
    return true
  }
  
  // Same day logic
  const isSameDay = (
    newReq.start_at.getFullYear() === existing.start_at.getFullYear() &&
    newReq.start_at.getMonth() === existing.start_at.getMonth() &&
    newReq.start_at.getDate() === existing.start_at.getDate()
  )
  
  if (isSameDay) {
    const newStartMinutes = newReq.start_time.getHours() * 60 + newReq.start_time.getMinutes()
    const newEndMinutes = newReq.end_time.getHours() * 60 + newReq.end_time.getMinutes()
    const existingStartMinutes = existing.start_time.getHours() * 60 + existing.start_time.getMinutes()
    const existingEndMinutes = existing.end_time.getHours() * 60 + existing.end_time.getMinutes()
    
    const hasTimeConflict = (newStartMinutes < existingEndMinutes) && (existingStartMinutes < newEndMinutes)
    console.log(`  4. เช็คเวลาในวันเดียวกัน: ${hasTimeConflict}`)
    return hasTimeConflict
  }
  
  return false
}

function proposeNewLogic(existingBooking, newBooking) {
  console.log('\n💡 Logic ใหม่ที่เสนอ:')
  console.log('=' .repeat(50))
  
  const existing = {
    start_at: new Date(existingBooking.start_at),
    end_at: new Date(existingBooking.end_at),
    start_time: new Date(existingBooking.start_time),
    end_time: new Date(existingBooking.end_time)
  }
  
  const newReq = {
    start_at: new Date(newBooking.start_at),
    end_at: new Date(newBooking.end_at),
    start_time: new Date(newBooking.start_time),
    end_time: new Date(newBooking.end_time)
  }
  
  // เพิ่มข้อมูลเวลาสำหรับวันสุดท้าย
  console.log('📋 ข้อมูลการจองเก่า (รูปแบบใหม่):')
  console.log(`  วันที่: ${existing.start_at.toDateString()} ถึง ${existing.end_at.toDateString()}`)
  console.log(`  เวลาปกติ (วันที่ 1-4): ${existing.start_time.toTimeString().slice(0,5)} - ${existing.end_time.toTimeString().slice(0,5)}`)
  console.log(`  เวลาวันสุดท้าย (วันที่ 5): 07:00 - 12:00`)
  
  console.log('\n🔍 การตรวจสอบแบบใหม่:')
  
  // 1. เช็ควันที่ซ้อนทับ
  const hasDateOverlap = (newReq.start_at <= existing.end_at) && (existing.start_at <= newReq.end_at)
  console.log(`  1. วันที่ซ้อนทับ: ${hasDateOverlap}`)
  
  if (!hasDateOverlap) {
    console.log('  ✅ ไม่มี conflict - วันที่ไม่ซ้อนทับ')
    return false
  }
  
  // 2. เช็คว่าการจองใหม่ตรงกับวันสุดท้ายหรือไม่
  const isLastDay = newReq.start_at.getTime() === existing.end_at.getTime()
  console.log(`  2. การจองใหม่อยู่ในวันสุดท้าย: ${isLastDay}`)
  
  if (isLastDay) {
    // ใช้เวลาพิเศษสำหรับวันสุดท้าย
    const lastDayEndMinutes = 12 * 60 // 12:00 = 720 นาที
    const newStartMinutes = newReq.start_time.getHours() * 60 + newReq.start_time.getMinutes()
    const newEndMinutes = newReq.end_time.getHours() * 60 + newReq.end_time.getMinutes()
    
    console.log(`  3. เวลาที่ใช้ในวันสุดท้าย: 07:00 - 12:00 (420-720 นาที)`)
    console.log(`  4. การจองใหม่: ${newReq.start_time.toTimeString().slice(0,5)} - ${newReq.end_time.toTimeString().slice(0,5)} (${newStartMinutes}-${newEndMinutes} นาที)`)
    
    // เช็คการทับกัน: (start1 < end2) AND (start2 < end1)
    const hasTimeConflict = (newStartMinutes < lastDayEndMinutes) && (420 < newEndMinutes)
    console.log(`  5. มี time conflict: ${hasTimeConflict}`)
    
    if (!hasTimeConflict) {
      console.log('  ✅ ไม่มี conflict - เวลาไม่ทับกัน (ช่วงบ่ายว่าง)')
    } else {
      console.log('  ❌ มี conflict - เวลาทับกัน')
    }
    
    return hasTimeConflict
  } else {
    // การจองใหม่อยู่ในช่วงกลาง ใช้เวลาปกติ
    console.log(`  3. การจองใหม่อยู่ในช่วงกลาง - ใช้เวลาปกติ 07:00-17:00`)
    
    const newStartMinutes = newReq.start_time.getHours() * 60 + newReq.start_time.getMinutes()
    const newEndMinutes = newReq.end_time.getHours() * 60 + newReq.end_time.getMinutes()
    
    // เช็คกับเวลาปกติ 07:00-17:00 (420-1020 นาที)
    const hasTimeConflict = (newStartMinutes < 1020) && (420 < newEndMinutes)
    console.log(`  4. มี time conflict: ${hasTimeConflict}`)
    return hasTimeConflict
  }
}

// Test Case ที่คุณยกตัวอย่าง
console.log('🎯 Test Case: การจองที่คุณอธิบาย')
console.log('=' .repeat(60))

const existingBooking = {
  start_at: '2068-01-01',
  end_at: '2068-02-05',
  start_time: '2068-01-01T07:00:00.000Z',
  end_time: '2068-01-01T17:00:00.000Z'
  // หมายเหตุ: ไม่มีการระบุเวลาพิเศษสำหรับวันสุดท้าย
}

const newBooking = {
  start_at: '2068-02-05',
  end_at: '2068-02-05',
  start_time: '2068-02-05T13:00:00.000Z',
  end_time: '2068-02-05T17:00:00.000Z'
}

// ทดสอบ logic ปัจจุบัน
const currentResult = analyzeCurrentLogic(existingBooking, newBooking)
console.log(`\n📊 ผลลัพธ์ Logic ปัจจุบัน: ${currentResult ? '❌ Conflict' : '✅ No Conflict'}`)

// ทดสอบ logic ใหม่
const newResult = proposeNewLogic(existingBooking, newBooking)
console.log(`\n📊 ผลลัพธ์ Logic ใหม่: ${newResult ? '❌ Conflict' : '✅ No Conflict'}`)

console.log('\n' + '=' .repeat(60))
console.log('📋 สรุปปัญหา:')
console.log('❌ Logic ปัจจุบัน: ถือว่า multi-day booking ทุกกรณี = conflict')
console.log('✅ Logic ที่ควรเป็น: เช็คเวลาละเอียดในแต่ละวัน โดยเฉพาะวันสุดท้าย')
console.log('')
console.log('💡 ข้อเสนอแนะ:')
console.log('1. เพิ่มฟิลด์ end_time_final ในฐานข้อมูลสำหรับเวลาสิ้นสุดในวันสุดท้าย')
console.log('2. แก้ไข logic ใน routes/reservations.js ให้เช็คเวลาละเอียดมากขึ้น')
console.log('3. ทดสอบกับกรณีต่างๆ เพื่อให้แน่ใจว่าทำงานถูกต้อง')

console.log('\n🔧 สำหรับการแก้ไข:')
console.log('ปัจจุบันระบบจะ block การจองนี้ แม้ว่าจริงๆ แล้วควรให้จองได้')
console.log('เพราะเวลา 13:00-17:00 ไม่ทับกับ 07:00-12:00 ในวันสุดท้าย')
console.log('=' .repeat(60))

// Test การจองข้ามเดือน
console.log('\n🗓️  Test Case 2: การจองข้ามเดือน')
console.log('=' .repeat(60))

const crossMonthExisting = {
  start_at: '2025-01-25',
  end_at: '2025-02-05',
  start_time: '2025-01-25T08:00:00.000Z',
  end_time: '2025-01-25T16:00:00.000Z'
}

const crossMonthNew = {
  start_at: '2025-03-01',
  end_at: '2025-03-01',
  start_time: '2025-03-01T10:00:00.000Z',
  end_time: '2025-03-01T14:00:00.000Z'
}

console.log('📅 การจองเก่า: 25 ม.ค. - 5 ก.พ.')
console.log('📅 การจองใหม่: 1 มี.ค.')
console.log('🔍 ควรจองได้เพราะไม่ทับกัน')

const crossMonthResult = analyzeCurrentLogic(crossMonthExisting, crossMonthNew)
console.log(`\n📊 ผลลัพธ์: ${crossMonthResult ? '❌ Conflict (ผิด)' : '✅ No Conflict (ถูก)'}`)

console.log('\n✨ การทดสอบเสร็จสิ้น!')
