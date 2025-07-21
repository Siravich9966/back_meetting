// ===================================================================
// Update User Role Script
// ===================================================================
// สคริปต์สำหรับเปลี่ยน role ของ user เป็น officer หรือ admin
// ===================================================================

import prisma from './lib/prisma.js'

async function updateUserRole() {
  console.log('🔄 เปลี่ยน role ของ user...')
  
  try {
    // แสดงรายการ users ปัจจุบัน
    const users = await prisma.users.findMany({
      select: {
        user_id: true,
        email: true,
        first_name: true,
        last_name: true,
        department: true,
        role_id: true,
        roles: {
          select: {
            role_name: true
          }
        }
      }
    })
    
    console.log('\n👥 รายการ Users ปัจจุบัน:')
    users.forEach(user => {
      console.log(`   ID: ${user.user_id} | ${user.first_name} ${user.last_name} | ${user.email} | ${user.department} | Role: ${user.roles.role_name}`)
    })
    
    // ตัวอย่าง: เปลี่ยน user ที่มี email เฉพาะเป็น officer
    const emailsToPromote = [
      'officer.it1@company.com',  // user ที่เพิ่งสมัครไป
      'testuser@company.com',     // user ตัวแรก
      'officer.finance@company.com', 
      'officer.sales@company.com',
      'officer.hr@company.com'
    ]
    
    for (const email of emailsToPromote) {
      const user = await prisma.users.findUnique({
        where: { email }
      })
      
      if (user) {
        // เปลี่ยนเป็น officer (role_id = 2)
        await prisma.users.update({
          where: { email },
          data: { role_id: 2 }
        })
        console.log(`✅ เปลี่ยน ${email} เป็น Officer สำเร็จ`)
      } else {
        console.log(`⚠️  ไม่พบ user: ${email}`)
      }
    }
    
    // แสดงผลลัพธ์หลังการเปลี่ยน
    console.log('\n🎉 ผลลัพธ์หลังการเปลี่ยน role:')
    const updatedUsers = await prisma.users.findMany({
      select: {
        user_id: true,
        email: true,
        first_name: true,
        last_name: true,
        department: true,
        role_id: true,
        roles: {
          select: {
            role_name: true
          }
        }
      }
    })
    
    updatedUsers.forEach(user => {
      console.log(`   ID: ${user.user_id} | ${user.first_name} ${user.last_name} | ${user.email} | ${user.department} | Role: ${user.roles.role_name}`)
    })
    
    // สรุปจำนวนตาม role
    const roleCounts = await prisma.users.groupBy({
      by: ['role_id'],
      _count: {
        user_id: true
      }
    })
    
    console.log('\n📊 สรุปจำนวน Users ตาม Role:')
    for (const count of roleCounts) {
      const role = await prisma.roles.findUnique({
        where: { role_id: count.role_id }
      })
      console.log(`   ${role.role_name}: ${count._count.user_id} คน`)
    }
    
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateUserRole()
