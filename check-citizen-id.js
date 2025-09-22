import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()

async function checkCitizenId() {
  try {
    const citizenId = '1469900651442'
    console.log(`🔍 เช็คเลขบัตรประชาชน: ${citizenId}`)
    
    const inUsers = await prisma.users.findUnique({
      where: { citizen_id: citizenId },
      select: { user_id: true, email: true, first_name: true, last_name: true }
    })
    
    const inOfficer = await prisma.officer.findUnique({
      where: { citizen_id: citizenId },
      select: { officer_id: true, email: true, first_name: true, last_name: true }
    })
    
    const inAdmin = await prisma.admin.findUnique({
      where: { citizen_id: citizenId },
      select: { admin_id: true, email: true, first_name: true, last_name: true }
    })
    
    const inExecutive = await prisma.executive.findUnique({
      where: { citizen_id: citizenId },
      select: { executive_id: true, email: true, first_name: true, last_name: true }
    })
    
    console.log('📋 ผลการค้นหา:')
    console.log('Users:', inUsers)
    console.log('Officer:', inOfficer)
    console.log('Admin:', inAdmin)
    console.log('Executive:', inExecutive)
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkCitizenId()