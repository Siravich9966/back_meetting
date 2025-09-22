import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()

async function checkRoles() {
  try {
    console.log('📋 Roles ที่มีในฐานข้อมูล:')
    const roles = await prisma.roles.findMany()
    console.table(roles)
    
    console.log('\n👤 Admin ที่สร้างไว้:')
    const admin = await prisma.admin.findUnique({
      where: { email: 'admin@gmail.com' },
      include: { roles: true }
    })
    console.log(admin)
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkRoles()