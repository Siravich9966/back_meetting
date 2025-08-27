// ===================================================================
// สร้างข้อมูลผู้ใช้ทดสอบสำหรับระบบจองห้องใหม่
// ===================================================================

import { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createTestUser() {
  try {
    console.log('🔄 กำลังสร้างผู้ใช้ทดสอบ...')
    
    // ตรวจสอบว่ามีผู้ใช้ทดสอบแล้วหรือไม่
    const existingUser = await prisma.users.findUnique({
      where: { email: 'user@test.com' }
    })
    
    if (existingUser) {
      console.log('✅ ผู้ใช้ทดสอบมีอยู่แล้ว:', existingUser.email)
      return existingUser
    }
    
    // สร้างผู้ใช้ใหม่
    const hashedPassword = await bcrypt.hash('password123', 10)
    
    const newUser = await prisma.users.create({
      data: {
        role_id: 1, // User role
        first_name: 'ผู้ใช้',
        last_name: 'ทดสอบ',
        email: 'user@test.com',
        password: hashedPassword,
        citizen_id: '1234567890123',
        department: 'คณะเทคโนโลยีสารสนเทศ',
        position: 'นักศึกษา',
        profile_image: null
      }
    })
    
    console.log('✅ สร้างผู้ใช้ทดสอบสำเร็จ:', newUser.email)
    return newUser
    
  } catch (error) {
    console.error('❌ ข้อผิดพลาดในการสร้างผู้ใช้ทดสอบ:', error.message)
    throw error
  }
}

async function createTestOfficer() {
  try {
    console.log('🔄 กำลังสร้างเจ้าหน้าที่ทดสอบ...')
    
    // ตรวจสอบว่ามีเจ้าหน้าที่ทดสอบแล้วหรือไม่
    const existingOfficer = await prisma.officer.findUnique({
      where: { email: 'officer@test.com' }
    })
    
    if (existingOfficer) {
      console.log('✅ เจ้าหน้าที่ทดสอบมีอยู่แล้ว:', existingOfficer.email)
      return existingOfficer
    }
    
    // สร้างเจ้าหน้าที่ใหม่
    const hashedPassword = await bcrypt.hash('password123', 10)
    
    const newOfficer = await prisma.officer.create({
      data: {
        role_id: 2, // Officer role
        first_name: 'เจ้าหน้าที่',
        last_name: 'ทดสอบ',
        email: 'officer@test.com',
        password: hashedPassword,
        citizen_id: '1234567890124',
        phone: '0812345679',
        department: 'คณะเทคโนโลยีสารสนเทศ',
        position: 'เจ้าหน้าที่'
      }
    })
    
    console.log('✅ สร้างเจ้าหน้าที่ทดสอบสำเร็จ:', newOfficer.email)
    return newOfficer
    
  } catch (error) {
    console.error('❌ ข้อผิดพลาดในการสร้างเจ้าหน้าที่ทดสอบ:', error.message)
    throw error
  }
}

async function ensureTestRooms() {
  try {
    console.log('🔄 ตรวจสอบห้องทดสอบ...')
    
    const rooms = await prisma.meeting_room.findMany()
    
    if (rooms.length === 0) {
      console.log('🏢 สร้างห้องทดสอบ...')
      
      await prisma.meeting_room.createMany({
        data: [
          {
            room_name: 'ห้องประชุมทดสอบ A',
            room_capacity: 20,
            department: 'คณะเทคโนโลยีสารสนเทศ',
            location_m: 'ชั้น 1 อาคาร IT',
            status_m: 'available',
            equipment_m: 'Projector, Whiteboard, Air Conditioning',
            details_m: 'ห้องประชุมสำหรับทดสอบระบบ'
          },
          {
            room_name: 'ห้องประชุมทดสอบ B',
            room_capacity: 15,
            department: 'คณะเทคโนโลยีสารสนเทศ',
            location_m: 'ชั้น 2 อาคาร IT',
            status_m: 'available',
            equipment_m: 'Smart TV, Sound System, Air Conditioning',
            details_m: 'ห้องประชุมขนาดกลางสำหรับทดสอบ'
          }
        ]
      })
      
      console.log('✅ สร้างห้องทดสอบเรียบร้อยแล้ว')
    } else {
      console.log(`✅ มีห้องทดสอบ ${rooms.length} ห้องแล้ว`)
    }
    
  } catch (error) {
    console.error('❌ ข้อผิดพลาดในการสร้างห้องทดสอบ:', error.message)
    throw error
  }
}

async function main() {
  try {
    console.log('🚀 เริ่มสร้างข้อมูลทดสอบสำหรับระบบจองห้องใหม่')
    console.log('=' .repeat(60))
    
    await createTestUser()
    await createTestOfficer()
    await ensureTestRooms()
    
    console.log('\n🎉 สร้างข้อมูลทดสอบเสร็จสิ้น!')
    console.log('📋 ข้อมูลสำหรับทดสอบ:')
    console.log('   User: user@test.com / password123')
    console.log('   Officer: officer@test.com / password123')
    console.log('=' .repeat(60))
    
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
