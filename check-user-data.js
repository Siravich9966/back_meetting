// ตรวจสอบข้อมูลผู้ใช้และการจองในระบบ
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkUserData() {
  try {
    console.log('🔍 ตรวจสอบข้อมูลผู้ใช้และการจอง...')
    console.log('=' .repeat(60))
    
    // 1. ตรวจสอบผู้ใช้ tonyou1234@gmail.com
    const targetUser = await prisma.users.findUnique({
      where: { email: 'tonyou1234@gmail.com' }
    })
    
    if (targetUser) {
      console.log('✅ พบผู้ใช้:', targetUser.email)
      console.log('   - ID:', targetUser.user_id)
      console.log('   - ชื่อ:', targetUser.first_name, targetUser.last_name)
      console.log('   - แผนก:', targetUser.department)
      console.log('   - ตำแหน่ง:', targetUser.position)
      console.log('   - สร้างเมื่อ:', targetUser.created_at)
      
      // ตรวจสอบการจองของผู้ใช้นี้
      const userReservations = await prisma.reservation.findMany({
        where: { user_id: targetUser.user_id },
        include: {
          meeting_room: {
            select: {
              room_name: true,
              location_m: true
            }
          }
        },
        orderBy: { created_at: 'desc' }
      })
      
      console.log(`\n📅 การจองทั้งหมด (${userReservations.length} รายการ):`)
      userReservations.forEach((reservation, index) => {
        console.log(`   ${index + 1}. ห้อง: ${reservation.meeting_room.room_name}`)
        console.log(`      วันที่: ${reservation.start_at.toISOString().split('T')[0]} - ${reservation.end_at.toISOString().split('T')[0]}`)
        console.log(`      เวลา: ${reservation.start_time.toISOString().slice(11, 16)} - ${reservation.end_time.toISOString().slice(11, 16)}`)
        console.log(`      สถานะ: ${reservation.status_r}`)
        console.log(`      รายละเอียด: ${reservation.details_r}`)
        console.log(`      สร้างเมื่อ: ${reservation.created_at}`)
        console.log('')
      })
      
    } else {
      console.log('❌ ไม่พบผู้ใช้ tonyou1234@gmail.com')
    }
    
    // 2. แสดงผู้ใช้ทั้งหมดในระบบ
    const allUsers = await prisma.users.findMany({
      select: {
        user_id: true,
        email: true,
        first_name: true,
        last_name: true,
        department: true,
        created_at: true
      },
      orderBy: { created_at: 'desc' }
    })
    
    console.log('\n👥 ผู้ใช้ทั้งหมดในระบบ:')
    allUsers.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.email} (${user.first_name} ${user.last_name}) - ${user.department}`)
    })
    
    // 3. ตรวจสอบการจองล่าสุดทั้งหมด (เพื่อดูปัญหาเวลา)
    const recentReservations = await prisma.reservation.findMany({
      include: {
        users: {
          select: {
            email: true,
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
      orderBy: { created_at: 'desc' },
      take: 10
    })
    
    console.log('\n🕐 การจอง 10 รายการล่าสุด (ตรวจสอบเวลา):')
    recentReservations.forEach((reservation, index) => {
      const startTime = new Date(reservation.start_time)
      const endTime = new Date(reservation.end_time)
      
      console.log(`   ${index + 1}. ผู้จอง: ${reservation.users.email}`)
      console.log(`      ห้อง: ${reservation.meeting_room.room_name}`)
      console.log(`      วันที่: ${reservation.start_at.toISOString().split('T')[0]}`)
      console.log(`      เวลาในฐานข้อมูล (UTC): ${startTime.toISOString()} - ${endTime.toISOString()}`)
      console.log(`      เวลาแปลงเป็นไทย (+7): ${startTime.toLocaleString('th-TH', {timeZone: 'Asia/Bangkok'})} - ${endTime.toLocaleString('th-TH', {timeZone: 'Asia/Bangkok'})}`)
      console.log(`      เวลาแสดงแบบ HH:MM: ${startTime.toTimeString().slice(0,5)} - ${endTime.toTimeString().slice(0,5)}`)
      console.log(`      สถานะ: ${reservation.status_r}`)
      console.log('')
    })
    
    // 4. ตรวจสอบ timezone ของระบบ
    console.log('\n⏰ ข้อมูล timezone:')
    const now = new Date()
    console.log('   - เวลาปัจจุบัน (local):', now.toString())
    console.log('   - เวลาปัจจุบัน (UTC):', now.toISOString())
    console.log('   - เวลาปัจจุบัน (ไทย):', now.toLocaleString('th-TH', {timeZone: 'Asia/Bangkok'}))
    console.log('   - Timezone offset:', now.getTimezoneOffset(), 'นาที')
    
  } catch (error) {
    console.error('❌ ข้อผิดพลาด:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkUserData()
