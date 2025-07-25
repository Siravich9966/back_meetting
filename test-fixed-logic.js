// ===================================================================
// Test Fixed Multi-day Booking Logic - ทดสอบ logic ที่แก้ไขแล้ว
// ===================================================================

import { Elysia } from 'elysia'

const app = new Elysia()
  .get('/', () => 'Fixed Multi-day booking logic test')
  .listen(3000)

console.log('🧪 Testing Fixed Multi-day Booking Logic...\n')

// Base URL for API calls
const BASE_URL = 'http://localhost:3001'

// Test data - จำลองตัวอย่างที่คุณให้
const testCases = [
  {
    name: '🎯 Test 1: การจองตามตัวอย่างที่คุณให้',
    description: 'จองวันที่ 5 ช่วงบ่าย (13:00-17:00) ขณะที่มีการจองอยู่วันที่ 1-5 แต่วันที่ 5 จบเวลา 12:00',
    existing: 'การจองเก่า: 1/1/25 ถึง 5/1/25, เวลา 07:00-17:00 (สมมติวันสุดท้ายจบ 12:00)',
    booking: {
      room_id: 1,
      start_at: '2025-01-05',
      end_at: '2025-01-05',
      start_time: '2025-01-05T13:00:00.000Z',
      end_time: '2025-01-05T17:00:00.000Z',
      details_r: 'การประชุมช่วงบ่าย - ควรจองได้'
    },
    expectedResult: 'ควรจองได้เพราะไม่ทับกับช่วงเช้า'
  },
  {
    name: '🔴 Test 2: การจองที่ทับกับการจองเก่าในวันสุดท้าย',
    description: 'จองวันที่ 5 ช่วงเช้า (10:00-14:00) ซึ่งทับกับการจองเก่า',
    booking: {
      room_id: 1,
      start_at: '2025-01-05',
      end_at: '2025-01-05',
      start_time: '2025-01-05T10:00:00.000Z',
      end_time: '2025-01-05T14:00:00.000Z',
      details_r: 'การประชุมช่วงเช้า - ควรถูกปฏิเสธ'
    },
    expectedResult: 'ควรถูกปฏิเสธเพราะทับกัน'
  },
  {
    name: '🟡 Test 3: การจองในช่วงกลางของการจองหลายวัน',
    description: 'จองวันที่ 3 ซึ่งอยู่ในช่วงกลางของการจองเก่า',
    booking: {
      room_id: 1,
      start_at: '2025-01-03',
      end_at: '2025-01-03',
      start_time: '2025-01-03T10:00:00.000Z',
      end_time: '2025-01-03T14:00:00.000Z',
      details_r: 'การประชุมในช่วงกลาง - ควรถูกปฏิเสธ'
    },
    expectedResult: 'ควรถูกปฏิเสธเพราะทับกัน'
  },
  {
    name: '🟢 Test 4: การจองที่ไม่ทับกับการจองเก่า',
    description: 'จองวันที่ 10 ซึ่งไม่ทับกับการจองเก่า',
    booking: {
      room_id: 1,
      start_at: '2025-01-10',
      end_at: '2025-01-10',
      start_time: '2025-01-10T09:00:00.000Z',
      end_time: '2025-01-10T17:00:00.000Z',
      details_r: 'การประชุมในวันที่ไม่ทับกัน - ควรจองได้'
    },
    expectedResult: 'ควรจองได้เพราะไม่ทับกัน'
  },
  {
    name: '🔵 Test 5: การจองข้ามเดือน',
    description: 'จองเดือนกุมภาพันธ์ ซึ่งไม่ทับกับการจองในเดือนมกราคม',
    booking: {
      room_id: 1,
      start_at: '2025-02-15',
      end_at: '2025-02-15',
      start_time: '2025-02-15T10:00:00.000Z',
      end_time: '2025-02-15T16:00:00.000Z',
      details_r: 'การประชุมข้ามเดือน - ควรจองได้'
    },
    expectedResult: 'ควรจองได้เพราะข้ามเดือน'
  }
]

async function makeReservation(booking) {
  try {
    // หมายเหตุ: ต้องมี valid JWT token จริง
    // ใน test นี้จะแสดงผลการเรียก API เท่านั้น
    
    console.log('📤 API Call:')
    console.log(`POST ${BASE_URL}/protected/reservations`)
    console.log('📦 Request Body:')
    console.log(JSON.stringify(booking, null, 2))
    
    // จำลองการเรียก API (ถ้าไม่มี server จริง)
    console.log('⚠️  หมายเหตุ: ต้องรัน server ด้วย bun index.js และมี JWT token จริง')
    
    return {
      status: 'SIMULATED',
      success: true,
      message: 'This is a simulated test - please run actual API calls with real server'
    }
    
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: error.message
    }
  }
}

async function runTests() {
  console.log('📝 การทดสอบ Logic การจองที่แก้ไขแล้ว')
  console.log('=' .repeat(60))
  
  // ข้อมูลการจองเก่าที่สมมติไว้
  console.log('📋 การจองเก่าที่สมมติ:')
  console.log('  ห้อง: 1')
  console.log('  วันที่: 1 ม.ค. 2025 ถึง 5 ม.ค. 2025')
  console.log('  เวลา: 07:00-17:00 (วันที่ 1-4)')
  console.log('  เวลาวันสุดท้าย: 07:00-12:00 (วันที่ 5)')
  console.log('  สถานะ: approved')
  console.log('')
  
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i]
    console.log(`${testCase.name}`)
    console.log(`📝 ${testCase.description}`)
    console.log('📅 ข้อมูลการจอง:')
    console.log(`  วันที่: ${testCase.booking.start_at} ถึง ${testCase.booking.end_at}`)
    console.log(`  เวลา: ${new Date(testCase.booking.start_time).toTimeString().slice(0,5)} - ${new Date(testCase.booking.end_time).toTimeString().slice(0,5)}`)
    console.log(`  รายละเอียด: ${testCase.booking.details_r}`)
    console.log(`🎯 ผลลัพธ์ที่คาดหวัง: ${testCase.expectedResult}`)
    
    console.log('\n⏳ จำลองการส่งคำขอ...')
    const result = await makeReservation(testCase.booking)
    
    console.log('📊 ผลลัพธ์จำลอง:')
    console.log(`  Status: ${result.status}`)
    console.log(`  Message: ${result.message}`)
    
    console.log('\n' + '-'.repeat(60) + '\n')
    
    // หน่วงเวลา
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  console.log('🔧 การทดสอบจริง:')
  console.log('1. รัน server: bun index.js')
  console.log('2. Login เพื่อรับ JWT token')
  console.log('3. สร้างการจองเก่าในฐานข้อมูล')
  console.log('4. ทดสอบ API calls จริงด้วย token')
  console.log('')
  console.log('📋 สิ่งที่แก้ไข:')
  console.log('✅ Logic ใหม่เช็คทุกวันที่ทับซ้อนแยกกัน')
  console.log('✅ ไม่ถือว่า multi-day = conflict อัตโนมัติ')
  console.log('✅ เช็คเวลาละเอียดในแต่ละวัน')
  console.log('⏳ ยังต้องเพิ่ม end_time_final field สำหรับเวลาวันสุดท้าย')
}

// เริ่มการทดสอบ
runTests().then(() => {
  console.log('\n✨ Test simulation completed!')
  console.log('🚀 ระบบพร้อมทดสอบการจองจริง!')
  process.exit(0)
}).catch(error => {
  console.error('❌ Test failed:', error)
  process.exit(1)
})
