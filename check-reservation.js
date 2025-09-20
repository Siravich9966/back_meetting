// เช็คโครงสร้างตาราง reservation เฉพาะ
import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()

async function checkReservationTable() {
  try {
    console.log('🔍 กำลังเช็คโครงสร้างตาราง reservation...')
    
    const columns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'reservation' 
      AND table_schema = 'public'
      ORDER BY ordinal_position
    `
    
    console.log('\n📊 โครงสร้างตาราง reservation:')
    columns.forEach(col => {
      console.log(`  📝 ${col.column_name} (${col.data_type}) ${col.is_nullable === 'YES' ? '- nullable' : '- not null'}`)
    })
    
    // เช็คว่ามี rejected_reason หรือไม่
    const hasRejectedReason = columns.some(col => col.column_name === 'rejected_reason')
    
    console.log('\n🔍 ตรวจสอบ rejected_reason:')
    if (hasRejectedReason) {
      console.log('  ✅ มี rejected_reason แล้ว!')
    } else {
      console.log('  ❌ ยังไม่มี rejected_reason')
    }
    
    // เช็คข้อมูลตัวอย่าง
    const sampleReservation = await prisma.reservation.findFirst({
      select: {
        reservation_id: true,
        status_r: true,
        details_r: true,
        booking_dates: true,
        is_multi_day: true
      }
    })
    
    if (sampleReservation) {
      console.log('\n📋 ข้อมูลตัวอย่าง:')
      console.log('  📅 reservation_id:', sampleReservation.reservation_id)
      console.log('  📊 status_r:', sampleReservation.status_r)
      console.log('  📝 details_r:', sampleReservation.details_r)
      console.log('  📅 booking_dates:', sampleReservation.booking_dates)
      console.log('  🗓️ is_multi_day:', sampleReservation.is_multi_day)
    }
    
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkReservationTable()