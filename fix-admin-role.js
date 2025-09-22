import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()

async function fixAdminRole() {
  try {
    console.log('🔧 กำลังแก้ไข role_id ของ Admin...')
    
    // Update Admin role_id จาก 1 (user) เป็น 3 (admin)
    const updatedAdmin = await prisma.admin.update({
      where: { email: 'admin@gmail.com' },
      data: { role_id: 3 },  // เปลี่ยนเป็น admin role
      include: { roles: true }
    })
    
    console.log('✅ แก้ไขเรียบร้อย:')
    console.log(updatedAdmin)
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

fixAdminRole()