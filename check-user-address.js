import prisma from './lib/prisma.js'

async function checkUserData() {
  try {
    console.log('🔍 Checking address data status...')
    
    // เช็คจำนวนข้อมูลในแต่ละตาราง
    const provinceCount = await prisma.province.count()
    const districtCount = await prisma.district.count() 
    const subdistrictCount = await prisma.subdistrict.count()
    
    console.log('📊 สถานะข้อมูลในฐานข้อมูล:')
    console.log(`- จังหวัด: ${provinceCount} รายการ`)
    console.log(`- อำเภอ: ${districtCount} รายการ`) 
    console.log(`- ตำบล: ${subdistrictCount} รایการ`)
    
    // เช็คข้อมูล user id 4
    const user = await prisma.users.findUnique({
      where: { user_id: 4 },
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        email: true,
        province_id: true,
        district_id: true,
        subdistrict_id: true,
        zip_code: true
      }
    })
    
    console.log('\n👤 User data:', user)
    
    if (user?.province_id) {
      const province = await prisma.province.findUnique({
        where: { province_id: user.province_id },
        select: { province_name: true }
      })
      console.log('🏛️ Province:', province)
    }
    
    if (user?.district_id) {
      const district = await prisma.district.findUnique({
        where: { district_id: user.district_id },
        select: { district_name: true }
      })
      console.log('🏢 District:', district)
    }
    
    if (user?.subdistrict_id) {
      const subdistrict = await prisma.subdistrict.findUnique({
        where: { subdistrict_id: user.subdistrict_id },
        select: { subdistrict_name: true }
      })
      console.log('🏘️ Subdistrict:', subdistrict)
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUserData()