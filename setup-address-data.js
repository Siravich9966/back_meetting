// ===================================================================
// Setup Address Data - สคริปต์สำหรับสร้างข้อมูลที่อยู่ไทยครบทั้งประเทศ
// ===================================================================
// วิธีรัน: bun setup-address-data.js
// ===================================================================

import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

// สร้าง Prisma client จาก generated folder
const prisma = new PrismaClient()

console.log('🏗️  เริ่มต้นการสร้างข้อมูลที่อยู่ไทย...')

async function setupAddressData() {
  try {
    // ตรวจสอบการเชื่อมต่อฐานข้อมูล
    await prisma.$connect()
    console.log('✅ เชื่อมต่อฐานข้อมูลสำเร็จ')
    
    // เช็คว่ามีข้อมูลแล้วหรือยัง
    const existingProvinces = await prisma.province.count()
    if (existingProvinces > 0) {
      console.log(`📋 พบข้อมูลจังหวัดอยู่แล้ว ${existingProvinces} จังหวัด`)
      console.log('❓ ต้องการเขียนทับข้อมูลเดิมหรือไม่? (กด Ctrl+C เพื่อยกเลิก)')
      
      // รอ 5 วินาที ก่อนดำเนินการ
      await new Promise(resolve => setTimeout(resolve, 5000))
      
      // ลบข้อมูลเดิม
      console.log('🗑️  กำลังลบข้อมูลเดิม...')
      await prisma.subdistrict.deleteMany()
      await prisma.district.deleteMany()
      await prisma.province.deleteMany()
      console.log('✅ ลบข้อมูลเดิมเรียบร้อย')
    }
    
    console.log('📡 กำลังดึงข้อมูลจาก API...')
    
    // ดึงข้อมูลจาก kongvut API
    const response = await fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log(`📊 ได้รับข้อมูล ${data.length} จังหวัด`)
    
    // เริ่มการบันทึกข้อมูล
    let provinceCount = 0
    let districtCount = 0
    let subdistrictCount = 0
    
    for (const provinceData of data) {
      console.log(`🏛️  กำลังสร้าง: ${provinceData.name_th}`)
      
      // สร้างจังหวัด
      const province = await prisma.province.create({
        data: {
          province_id: parseInt(provinceData.id),
          province_name: provinceData.name_th,
        },
      })
      provinceCount++
      
      // สร้างอำเภอ
      for (const districtData of provinceData.amphure) {
        const district = await prisma.district.create({
          data: {
            district_id: parseInt(districtData.id),
            district_name: districtData.name_th,
            province_id: province.province_id,
          },
        })
        districtCount++
        
        // สร้างตำบล
        for (const subdistrictData of districtData.tambon) {
          await prisma.subdistrict.create({
            data: {
              subdistrict_id: parseInt(subdistrictData.id),
              subdistrict_name: subdistrictData.name_th,
              district_id: district.district_id,
              zip_code: parseInt(subdistrictData.zip_code),
            },
          })
          subdistrictCount++
        }
      }
    }
    
    console.log('\n🎉 สร้างข้อมูลเสร็จสิ้น!')
    console.log(`📊 สถิติ:`)
    console.log(`   - จังหวัด: ${provinceCount} จังหวัด`)
    console.log(`   - อำเภอ: ${districtCount} อำเภอ`)
    console.log(`   - ตำบล: ${subdistrictCount} ตำบล`)
    
    // ตรวจสอบข้อมูลบางส่วน
    console.log('\n🔍 ตรวจสอบข้อมูลตัวอย่าง:')
    const sampleProvince = await prisma.province.findFirst({
      include: {
        districts: {
          take: 2,
          include: {
            subdistricts: {
              take: 2,
            },
          },
        },
      },
    })
    
    if (sampleProvince) {
      console.log(`   📍 จังหวัด: ${sampleProvince.province_name}`)
      if (sampleProvince.districts[0]) {
        console.log(`   📍 อำเภอ: ${sampleProvince.districts[0].district_name}`)
        if (sampleProvince.districts[0].subdistricts[0]) {
          console.log(`   📍 ตำบล: ${sampleProvince.districts[0].subdistricts[0].subdistrict_name} (${sampleProvince.districts[0].subdistricts[0].zip_code})`)
        }
      }
    }
    
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error.message)
    throw error
  } finally {
    await prisma.$disconnect()
    console.log('🔚 ปิดการเชื่อมต่อฐานข้อมูล')
  }
}

// รันสคริปต์
setupAddressData()
  .then(() => {
    console.log('\n✅ Setup เสร็จสิ้นเรียบร้อย!')
    console.log('🚀 ตอนนี้สามารถใช้งาน Address Selection ได้แล้ว')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Setup ล้มเหลว:', error)
    process.exit(1)
  })