// ทดสอบ API การจองจริงผ่าน HTTP
import fetch from 'node-fetch'

const BASE_URL = 'http://localhost:8000'

// ข้อมูล login
const testUser = {
  email: 'sirawit@test.com',
  password: 'password123'
}

async function testRealBookingAPI() {
  try {
    console.log('🧪 ทดสอบ API การจองจริง')
    console.log('=' * 50)

    // 1. Login เพื่อเอา token
    console.log('\n1. เข้าสู่ระบบ...')
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUser)
    })

    if (!loginResponse.ok) {
      console.log('❌ Login ไม่สำเร็จ')
      return
    }

    const loginData = await loginResponse.json()
    const token = loginData.token
    console.log('✅ Login สำเร็จ')

    // 2. ดูการจองที่มีอยู่
    console.log('\n2. ดูการจองที่มีอยู่ในวันที่ 17 สิงหาคม...')
    const calendarResponse = await fetch(`${BASE_URL}/reservations/calendar/7?detailed=true`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (calendarResponse.ok) {
      const calendarData = await calendarResponse.json()
      const Aug17Data = calendarData.data.availability?.['2025-08-17']
      
      if (Aug17Data) {
        console.log(`📊 วันที่ 17 สิงหาคม มีการจอง ${Aug17Data.total_reservations} ครั้ง`)
        const bookedSlots = Aug17Data.slots.filter(slot => !slot.available)
        console.log(`❌ ช่วงที่จองแล้ว: ${bookedSlots.length} ช่วง`)
        bookedSlots.forEach(slot => {
          console.log(`   ${slot.time} - ${slot.reservations.length} การจอง`)
        })
      }
    }

    // 3. ทดสอบการจองซ้ำ
    console.log('\n3. ทดสอบการจองในช่วงที่มีการจองแล้ว (08:00-09:00)...')
    
    const conflictBooking = {
      room_id: 7,
      start_at: '2025-08-17',
      end_at: '2025-08-17',
      start_time: '2025-08-17T08:00:00.000Z',
      end_time: '2025-08-17T09:00:00.000Z',
      details_r: 'ทดสอบ conflict detection'
    }

    const bookingResponse = await fetch(`${BASE_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(conflictBooking)
    })

    const bookingData = await bookingResponse.json()
    
    if (bookingResponse.status === 409) {
      console.log('✅ Conflict detection ทำงานถูกต้อง!')
      console.log(`📝 ข้อความ: ${bookingData.message}`)
      if (bookingData.conflicts) {
        console.log(`⚠️  พบ conflict ${bookingData.conflicts.length} รายการ:`)
        bookingData.conflicts.forEach((conflict, i) => {
          console.log(`   ${i+1}. ID: ${conflict.reservation_id}, เวลา: ${new Date(conflict.start_time).toTimeString().slice(0,5)}-${new Date(conflict.end_time).toTimeString().slice(0,5)}`)
        })
      }
    } else if (bookingResponse.ok) {
      console.log('❌ Conflict detection ไม่ทำงาน! การจองสำเร็จแม้จะมี conflict')
      console.log(`📝 การจองใหม่ ID: ${bookingData.data?.reservation_id}`)
    } else {
      console.log(`❌ API Error: ${bookingResponse.status}`)
      console.log(`📝 ข้อความ: ${bookingData.message}`)
    }

    // 4. ทดสอบการจองในช่วงที่ว่าง
    console.log('\n4. ทดสอบการจองในช่วงที่ว่าง (14:00-15:00)...')
    
    const validBooking = {
      room_id: 7,
      start_at: '2025-08-17',
      end_at: '2025-08-17',
      start_time: '2025-08-17T14:00:00.000Z',
      end_time: '2025-08-17T15:00:00.000Z',
      details_r: 'ทดสอบการจองปกติ'
    }

    const validResponse = await fetch(`${BASE_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(validBooking)
    })

    const validData = await validResponse.json()
    
    if (validResponse.ok) {
      console.log('✅ การจองในช่วงที่ว่างสำเร็จ!')
      console.log(`📝 การจองใหม่ ID: ${validData.data?.reservation_id}`)
    } else {
      console.log(`❌ การจองไม่สำเร็จ: ${validResponse.status}`)
      console.log(`📝 ข้อความ: ${validData.message}`)
    }

  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error.message)
  }
}

// เรียกใช้งาน
testRealBookingAPI()
