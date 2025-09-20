// เช็คตารางที่มีในฐานข้อมูล
import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()

async function checkTables() {
  try {
    console.log('🔍 กำลังเช็คตารางในฐานข้อมูล...')
    
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `
    
    console.log('\n📊 ตารางที่มีในฐานข้อมูล:')
    tables.forEach(t => console.log(`  ✅ ${t.table_name}`))
    
    // เช็คข้อมูลในตารางที่สำคัญ
    console.log('\n📈 จำนวนข้อมูลในแต่ละตาราง:')
    
    // เช็คตารางหลัก
    const userCount = await prisma.users.count()
    console.log(`  👥 users: ${userCount} คน`)
    
    const roomCount = await prisma.meeting_room.count()
    console.log(`  🏢 meeting_room: ${roomCount} ห้อง`)
    
    const reservationCount = await prisma.reservation.count()
    console.log(`  📅 reservation: ${reservationCount} การจอง`)
    
    // เช็คตารางใหม่
    try {
      const provinceCount = await prisma.province.count()
      console.log(`  🗺️ province: ${provinceCount} จังหวัด`)
    } catch (e) {
      console.log(`  ❌ province: ยังไม่มีตาราง`)
    }
    
    try {
      const districtCount = await prisma.district.count()
      console.log(`  🏘️ district: ${districtCount} อำเภอ`)
    } catch (e) {
      console.log(`  ❌ district: ยังไม่มีตาราง`)
    }
    
    try {
      const subdistrictCount = await prisma.subdistrict.count()
      console.log(`  🏘️ subdistrict: ${subdistrictCount} ตำบล`)
    } catch (e) {
      console.log(`  ❌ subdistrict: ยังไม่มีตาราง`)
    }
    
    try {
      const executiveCount = await prisma.executive.count()
      console.log(`  👔 executive: ${executiveCount} คน`)
    } catch (e) {
      console.log(`  ❌ executive: ยังไม่มีตาราง`)
    }
    
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkTables()