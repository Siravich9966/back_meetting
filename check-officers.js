import prisma from './lib/prisma.js'

async function checkOfficers() {
  try {
    console.log('🔍 ตรวจสอบข้อมูล Officer accounts:')
    
    const officers = await prisma.officer.findMany({
      select: {
        officer_id: true,
        email: true,
        position: true,
        department: true,
        first_name: true,
        last_name: true
      }
    })

    officers.forEach((officer, index) => {
      console.log(`\n📋 Officer ${index + 1}:`)
      console.log(`ID: ${officer.officer_id}`)
      console.log(`Name: ${officer.first_name} ${officer.last_name}`)
      console.log(`Email: ${officer.email}`)
      console.log(`Position: ${officer.position}`)
      console.log(`Department: ${officer.department}`)
      
      // ตรวจสอบว่าควรดูแลห้องของคณะไหน
      if (officer.position && officer.position.includes('ดูแลห้องประชุม')) {
        const match = officer.position.match(/คณะ([ก-ฮะ-ี]+)/);
        if (match) {
          console.log(`🎯 Should manage rooms for: คณะ${match[1]}`)
        }
      }
    })
    
    console.log(`\n📊 Total officers: ${officers.length}`)
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
    process.exit(0)
  }
}

checkOfficers()