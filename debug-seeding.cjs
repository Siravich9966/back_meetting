const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function debugSeeding() {
  try {
    console.log('🔍 Debugging seeding issue...');

    // ตรวจสอบข้อมูลใน districts
    const districts = await prisma.district.findMany({
      take: 5
    });
    console.log('Districts in DB:', districts.map(d => ({id: d.district_id, name: d.district_name})));

    // ตรวจสอบข้อมูล tambon จาก API
    const response = await fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json');
    const tambons = await response.json();
    
    console.log('First 5 tambons from API:', tambons.slice(0, 5).map(t => ({
      id: t.id,
      name: t.name_th,
      amphure_id: t.amphure_id
    })));

    // ตรวจสอบว่า amphure_id ของ tambon มีอยู่ใน districts หรือไม่
    const firstTambon = tambons[0];
    const existingDistrict = await prisma.district.findUnique({
      where: { district_id: firstTambon.amphure_id }
    });

    console.log(`Looking for district_id: ${firstTambon.amphure_id}`);
    console.log('Found district:', existingDistrict);

    if (!existingDistrict) {
      console.log('❌ District not found! This is the problem.');
      
      // ตรวจสอบว่า amphure_id ใน tambon ตรงกับ id ใน amphure หรือไม่
      const amphureResponse = await fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json');
      const amphures = await response.json();
      
      const matchingAmphure = amphures.find(a => a.id === firstTambon.amphure_id);
      console.log('Matching amphure:', matchingAmphure);
    }

  } catch (error) {
    console.error('Debug error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugSeeding();