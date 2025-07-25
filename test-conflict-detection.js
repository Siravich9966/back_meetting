// ===================================================================
// ทดสอบ Conflict Detection Logic แบบเฉพาะเจาะจง
// ===================================================================

const API_BASE = 'http://localhost:8000/api'

async function testConflictDetection() {
  console.log('🧪 ทดสอบ Conflict Detection Logic')
  console.log('='.repeat(60))

  // 1. Login เป็น user
  console.log('\n📝 Step 1: Login เป็น user')
  const loginResponse = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'student.test@example.com',
      password: 'password123'
    })
  })
  
  const loginData = await loginResponse.json()
  
  if (!loginData.success) {
    console.log('❌ Login ล้มเหลว:', loginData.message)
    return
  }
  
  const token = loginData.token
  console.log('✅ Login สำเร็จ')
  
  // 2. ดูรายการห้องประชุม
  console.log('\n📝 Step 2: ดูรายการห้องประชุม')
  const roomsResponse = await fetch(`${API_BASE}/rooms`)
  const roomsData = await roomsResponse.json()
  
  if (!roomsData.success || !roomsData.rooms.length) {
    console.log('❌ ไม่พบห้องประชุม')
    return
  }
  
  const testRoom = roomsData.rooms[0]
  console.log(`✅ พบห้องทดสอบ: ${testRoom.room_name} (ID: ${testRoom.room_id})`)
  
  // 3. ทดสอบการจองในเดือนต่างกัน
  console.log('\n📝 Step 3: ทดสอบการจองในเดือนต่างกัน')
  
  // การจองที่ 1: 1-3 มกราคม 2025
  console.log('\n🎯 Test Case 1: จอง 1-3 มกราคม 2025')
  const booking1 = await fetch(`${API_BASE}/protected/reservations`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      room_id: testRoom.room_id,
      start_at: '2025-01-01',
      end_at: '2025-01-03', 
      start_time: '2025-01-01T09:00:00.000Z',
      end_time: '2025-01-01T17:00:00.000Z',
      details_r: 'ทดสอบการจองช่วง 1-3 มกราคม 2025'
    })
  })
  
  const booking1Data = await booking1.json()
  console.log(`   ${booking1Data.success ? '✅' : '❌'} Status: ${booking1.status}`)
  console.log(`   📄 Message: ${booking1Data.message}`)
  
  if (booking1Data.success) {
    console.log(`   📝 Reservation ID: ${booking1Data.reservation?.reservation_id}`)
  }
  
  // การจองที่ 2: 1-3 กุมภาพันธ์ 2025 (ควรจองได้)
  console.log('\n🎯 Test Case 2: จอง 1-3 กุมภาพันธ์ 2025 (ควรจองได้)')
  const booking2 = await fetch(`${API_BASE}/protected/reservations`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      room_id: testRoom.room_id,
      start_at: '2025-02-01',
      end_at: '2025-02-03',
      start_time: '2025-02-01T09:00:00.000Z', 
      end_time: '2025-02-01T17:00:00.000Z',
      details_r: 'ทดสอบการจองช่วง 1-3 กุมภาพันธ์ 2025'
    })
  })
  
  const booking2Data = await booking2.json()
  console.log(`   ${booking2Data.success ? '✅' : '❌'} Status: ${booking2.status}`)
  console.log(`   📄 Message: ${booking2Data.message}`)
  
  if (booking2Data.success) {
    console.log(`   📝 Reservation ID: ${booking2Data.reservation?.reservation_id}`)
    console.log('   🎉 การจองในเดือนต่างกันทำงานได้ถูกต้อง!')
  } else {
    console.log('   ❌ BUG: การจองในเดือนต่างกันไม่ควรขัดแย้งกัน!')
    if (booking2Data.conflicts) {
      console.log('   🔍 Conflicts found:')
      booking2Data.conflicts.forEach(conflict => {
        console.log(`      - ID ${conflict.reservation_id}: ${conflict.start_at} to ${conflict.end_at}`)
      })
    }
  }
  
  // การจองที่ 3: 2-4 มกราคม 2025 (ควรขัดแย้ง)
  console.log('\n🎯 Test Case 3: จอง 2-4 มกราคม 2025 (ควรขัดแย้ง)')
  const booking3 = await fetch(`${API_BASE}/protected/reservations`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      room_id: testRoom.room_id,
      start_at: '2025-01-02',
      end_at: '2025-01-04',
      start_time: '2025-01-02T10:00:00.000Z',
      end_time: '2025-01-02T16:00:00.000Z', 
      details_r: 'ทดสอบการจองที่ควรขัดแย้ง 2-4 มกราคม 2025'
    })
  })
  
  const booking3Data = await booking3.json()
  console.log(`   ${!booking3Data.success ? '✅' : '❌'} Status: ${booking3.status}`)
  console.log(`   📄 Message: ${booking3Data.message}`)
  
  if (!booking3Data.success && booking3.status === 409) {
    console.log('   🎉 Conflict detection ทำงานถูกต้อง!')
  } else {
    console.log('   ❌ BUG: ควรตรวจพบ conflict!')
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('🎯 สรุปการทดสอบ Conflict Detection')
  console.log('='.repeat(60))
  
  const test1Pass = booking1Data.success
  const test2Pass = booking2Data.success // ควรจองได้
  const test3Pass = !booking3Data.success && booking3.status === 409 // ควรขัดแย้ง
  
  console.log(`📊 Test 1 (จอง มกราคม): ${test1Pass ? 'PASS' : 'FAIL'}`)
  console.log(`📊 Test 2 (จอง กุมภา): ${test2Pass ? 'PASS' : 'FAIL'} - คนต่างเดือนควรจองได้`)
  console.log(`📊 Test 3 (ซ้อนทับ): ${test3Pass ? 'PASS' : 'FAIL'} - ควรขัดแย้ง`)
  
  const overallPass = test1Pass && test2Pass && test3Pass
  console.log(`\n🏆 Overall: ${overallPass ? 'PASS' : 'FAIL'}`)
  
  if (!test2Pass) {
    console.log('\n🔧 แนะนำการแก้ไข:')
    console.log('   - ตรวจสอบ conflict detection logic')
    console.log('   - ตรวจสอบ date comparison')
    console.log('   - ตรวจสอบ timezone handling')
  }
}

// รันการทดสอบ
testConflictDetection().catch(console.error)
