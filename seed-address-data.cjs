const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

// API endpoints from kongvut/thai-province-data
const BASE_URL = 'https://raw.githubusercontent.com/kongvut/thai-province-data/master';

async function fetchData(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

async function seedAddressData() {
  console.log('🌱 Starting address data seeding...');

  try {
    // 1. ดึงข้อมูลจังหวัด
    console.log('📍 Fetching provinces...');
    const provinces = await fetchData(`${BASE_URL}/api_province.json`);
    console.log(`Found ${provinces.length} provinces`);

    // 2. เคลียร์ข้อมูลเดิม (ถ้ามี)
    console.log('🗑️  Clearing existing address data...');
    await prisma.subdistrict.deleteMany({});
    await prisma.district.deleteMany({});
    await prisma.province.deleteMany({});

    // 3. Seed จังหวัด
    console.log('🏛️  Seeding provinces...');
    for (const province of provinces) {
      await prisma.province.create({
        data: {
          province_id: province.id,
          province_name: province.name_th,
        },
      });
    }
    console.log(`✅ Seeded ${provinces.length} provinces`);

    // 4. ดึงและ Seed อำเภอ
    console.log('🏘️  Fetching and seeding districts...');
    const amphures = await fetchData(`${BASE_URL}/api_amphure.json`);
    
    for (const amphure of amphures) {
      await prisma.district.create({
        data: {
          district_id: amphure.id,
          province_id: amphure.province_id,
          district_name: amphure.name_th,
        },
      });
    }
    console.log(`✅ Seeded ${amphures.length} districts`);

    // 5. ดึงและ Seed ตำบล
    console.log('🏠 Fetching and seeding subdistricts...');
    const tambons = await fetchData(`${BASE_URL}/api_tambon.json`);
    
    let seededCount = 0;
    let skippedCount = 0;
    
    for (const tambon of tambons) {
      try {
        // ตรวจสอบว่า district_id มีอยู่จริงหรือไม่
        const existingDistrict = await prisma.district.findUnique({
          where: { district_id: tambon.amphure_id }
        });
        
        if (existingDistrict) {
          await prisma.subdistrict.create({
            data: {
              subdistrict_id: tambon.id,
              district_id: tambon.amphure_id, // ใช้ amphure_id แทน district_id
              subdistrict_name: tambon.name_th,
              zip_code: tambon.zip_code?.toString() || null,
            },
          });
          seededCount++;
        } else {
          console.log(`⚠️ Skipping tambon ${tambon.id} - district ${tambon.amphure_id} not found`);
          skippedCount++;
        }
        
        // แสดง progress ทุก 1000 records
        if ((seededCount + skippedCount) % 1000 === 0) {
          console.log(`Progress: ${seededCount + skippedCount}/${tambons.length} - Seeded: ${seededCount}, Skipped: ${skippedCount}`);
        }
        
      } catch (error) {
        console.error(`❌ Error creating tambon ${tambon.id}:`, error.message);
        skippedCount++;
      }
    }
    
    console.log(`✅ Seeded ${seededCount} subdistricts, Skipped ${skippedCount}`);

    console.log('🎉 Address data seeding completed successfully!');
    
    // สถิติ
    const stats = {
      provinces: await prisma.province.count(),
      districts: await prisma.district.count(), 
      subdistricts: await prisma.subdistrict.count(),
    };
    console.log('📊 Final stats:', stats);

  } catch (error) {
    console.error('❌ Error seeding address data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding
if (require.main === module) {
  seedAddressData()
    .then(() => {
      console.log('✨ Seeding script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding script failed:', error);
      process.exit(1);
    });
}

module.exports = { seedAddressData };