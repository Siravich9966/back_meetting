import prisma from './lib/prisma.js'

async function testJWT() {
  try {
    console.log('🔍 Testing JWT middleware position_department logic:')
    
    // Test getDepartmentFromPosition function
    const { getDepartmentFromPosition } = await import('./utils/positions.js')
    
    const testPosition = "เจ้าหน้าที่ดูแลห้องประชุมคณะเทคโนโลยีสารสนเทศ"
    const result = getDepartmentFromPosition(testPosition)
    
    console.log('📋 Position parsing test:')
    console.log(`Input: ${testPosition}`)
    console.log(`Output: ${result}`)
    
    // Test with actual officer data
    const officers = await prisma.officer.findMany({
      select: {
        officer_id: true,
        email: true,
        position: true,
        department: true
      }
    })

    console.log('\n📊 Officers position_department mapping:')
    officers.forEach(officer => {
      const positionDepartment = getDepartmentFromPosition(officer.position)
      console.log(`Officer ID: ${officer.officer_id}`)
      console.log(`Email: ${officer.email}`)
      console.log(`Current Department: ${officer.department}`)
      console.log(`Position: ${officer.position}`)
      console.log(`Position Department: ${positionDepartment}`)
      console.log(`Match: ${officer.department === positionDepartment}`)
      console.log('---')
    })
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
    process.exit(0)
  }
}

testJWT()