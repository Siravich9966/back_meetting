// ===================================================================
// สคริปต์ทดสอบ API ปฏิทินการจอง
// ===================================================================
// ทดสอบว่าระบบปฏิทินแสดงสถานะตามที่คุยกันหรือไม่:
// - สีเขียว: ว่างทั้งวัน
// - สีเหลือง: ว่างบางช่วง  
// - สีแดง: เต็มทั้งวัน
// - สีเทา: ไม่สามารถจอง
// ===================================================================

const baseURL = 'http://localhost:8000/api'

// ฟังก์ชันทดสอบ API
async function testAPI(endpoint, description) {
  try {
    console.log(`\n🔍 ${description}`)
    console.log(`📡 GET ${endpoint}`)
    
    const response = await fetch(`${baseURL}${endpoint}`)
    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ สำเร็จ:', JSON.stringify(data, null, 2))
    } else {
      console.log('❌ ผิดพลาด:', JSON.stringify(data, null, 2))
    }
  } catch (error) {
    console.log('💥 Error:', error.message)
  }
}

async function main() {
  console.log('🚀 เริ่มทดสอบระบบปฏิทินการจอง')
  console.log('=' .repeat(60))
  
  // 1. ทดสอบ Database Connection
  await testAPI('/test-db', 'ทดสอบฐานข้อมูล')
  
  // 2. ดูรายการห้องประชุม (แค่บางส่วน)
  try {
    console.log(`\n🔍 ดูรายการห้องประชุม`)
    console.log(`📡 GET ${baseURL}/rooms`)
    
    const response = await fetch(`${baseURL}/rooms`)
    const data = await response.json()
    
    if (response.ok && data.rooms) {
      console.log('✅ พบห้องประชุม:')
      data.rooms.slice(0, 3).forEach(room => {
        console.log(`   - ID: ${room.room_id}, ชื่อ: ${room.room_name}, ความจุ: ${room.capacity} คน`)
      })
      
      // เลือกห้องแรกมาทดสอบปฏิทิน
      if (data.rooms.length > 0) {
        const testRoom = data.rooms[0]
        console.log(`\n📅 ทดสอบปฏิทินห้อง: ${testRoom.room_name} (ID: ${testRoom.room_id})`)
        
        // 3. ปฏิทินแบบพื้นฐาน
        await testCalendarBasic(testRoom.room_id)
        
        // 4. ปฏิทินแบบรายละเอียด  
        await testCalendarDetailed(testRoom.room_id)
      }
    }
  } catch (error) {
    console.log('💥 Error:', error.message)
  }
}

// ทดสอบปฏิทินแบบพื้นฐาน
async function testCalendarBasic(roomId) {
  try {
    console.log(`\n🔍 ปฏิทินแบบพื้นฐาน (ห้อง ${roomId})`)
    console.log(`📡 GET ${baseURL}/reservations/calendar/${roomId}`)
    
    const response = await fetch(`${baseURL}/reservations/calendar/${roomId}`)
    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ ข้อมูลปฏิทิน:')
      console.log(`   - ห้อง: ${data.room?.room_name}`)
      console.log(`   - เดือน/ปี: ${data.calendar?.month}/${data.calendar?.year}`)
      console.log(`   - การจองที่มี: ${data.calendar?.reservations?.length || 0} รายการ`)
      
      if (data.calendar?.reservations?.length > 0) {
        console.log(`   📋 การจองล่าสุด:`)
        data.calendar.reservations.slice(0, 2).forEach(reservation => {
          const startDate = new Date(reservation.start_at).toLocaleDateString('th-TH')
          const startTime = new Date(reservation.start_time).toLocaleTimeString('th-TH', {hour: '2-digit', minute: '2-digit'})
          const endTime = new Date(reservation.end_time).toLocaleTimeString('th-TH', {hour: '2-digit', minute: '2-digit'})
          console.log(`      - ${startDate} ${startTime}-${endTime}: ${reservation.details_r} (${reservation.status_r})`)
        })
      }
    } else {
      console.log('❌ ผิดพลาด:', JSON.stringify(data, null, 2))
    }
  } catch (error) {
    console.log('💥 Error:', error.message)
  }
}

// ทดสอบปฏิทินแบบรายละเอียด
async function testCalendarDetailed(roomId) {
  try {
    console.log(`\n🔍 ปฏิทินแบบรายละเอียด (ห้อง ${roomId})`)
    console.log(`📡 GET ${baseURL}/reservations/calendar/${roomId}?detailed=true`)
    
    const response = await fetch(`${baseURL}/reservations/calendar/${roomId}?detailed=true`)
    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ ข้อมูลปฏิทินรายละเอียด:')
      console.log(`   - ห้อง: ${data.room?.room_name}`)
      console.log(`   - เดือน/ปี: ${data.calendar?.month}/${data.calendar?.year}`)
      console.log(`   - เวลาทำงาน: ${data.calendar?.working_hours?.start}:00-${data.calendar?.working_hours?.end}:00`)
      
      if (data.calendar?.daily_availability) {
        console.log(`\n📊 สถานะรายวัน (แสดง 10 วันแรก):`)
        
        data.calendar.daily_availability.slice(0, 10).forEach(day => {
          const date = new Date(day.date).toLocaleDateString('th-TH')
          const dayName = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์'][day.day_of_week]
          
          // คำนวณสถานะของวัน
          const availableSlots = day.slots.filter(slot => slot.available).length
          const totalSlots = day.slots.length
          const unavailableSlots = totalSlots - availableSlots
          
          let status = ''
          let color = ''
          
          if (availableSlots === totalSlots) {
            // ว่างทั้งวัน
            status = 'ว่างทั้งวัน'
            color = '🟢 เขียว'
          } else if (availableSlots === 0) {
            // เต็มทั้งวัน
            status = 'เต็มทั้งวัน'
            color = '🔴 แดง'
          } else {
            // ว่างบางช่วง
            status = `ว่าง ${availableSlots}/${totalSlots} ช่วง`
            color = '🟡 เหลือง'
          }
          
          console.log(`      ${date} (${dayName}): ${color} - ${status}`)
          
          // แสดงรายละเอียดการจองถ้ามี
          if (day.total_reservations > 0) {
            console.log(`         📋 การจอง: ${day.total_reservations} รายการ`)
            
            // แสดงช่วงเวลาที่ถูกจอง
            const bookedSlots = day.slots.filter(slot => !slot.available && slot.reservations.length > 0)
            if (bookedSlots.length > 0) {
              const bookedTimes = bookedSlots.map(slot => slot.time).join(', ')
              console.log(`         ⏰ เวลาที่ถูกจอง: ${bookedTimes}`)
            }
          }
        })
        
        console.log('\n🎨 สรุประบบสี:')
        console.log('   🟢 เขียว = ว่างทั้งวัน (จองได้ตลอด)')
        console.log('   🟡 เหลือง = ว่างบางช่วง (จองได้บางเวลา)')
        console.log('   🔴 แดง = เต็มทั้งวัน (จองไม่ได้)')
        console.log('   📝 หมายเหตุ: จองได้ทุกวัน รวมเสาร์-อาทิตย์')
      }
    } else {
      console.log('❌ ผิดพลาด:', JSON.stringify(data, null, 2))
    }
  } catch (error) {
    console.log('💥 Error:', error.message)
  }
}

// เริ่มทดสอบ
main().then(() => {
  console.log('\n✅ ทดสอบเสร็จสิ้น')
}).catch(error => {
  console.log('\n💥 ทดสอบล้มเหลว:', error.message)
})
