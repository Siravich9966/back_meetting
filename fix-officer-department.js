#!/usr/bin/env bun
// ===================================================================
// Fix Officer Department Mismatch
// ===================================================================
// แก้ไขปัญหา department ไม่ตรงกับ position_department
// ===================================================================

import { PrismaClient } from './generated/prisma/index.js'
import { getDepartmentFromPosition } from './utils/positions.js'

const prisma = new PrismaClient()

console.log('🔧 เริ่มแก้ไขปัญหา Officer Department Mismatch...\n')

try {
  // ดึง Officer ที่มีปัญหา
  const officers = await prisma.officer.findMany({
    select: {
      officer_id: true,
      email: true,
      first_name: true,
      last_name: true,
      position: true,
      department: true
    }
  })

  console.log(`📊 พบ Officer ทั้งหมด: ${officers.length} คน\n`)

  let updatedCount = 0
  let checkedCount = 0

  for (const officer of officers) {
    if (!officer.position) {
      console.log(`⚠️ Officer ID ${officer.officer_id}: ไม่มี position ข้าม...`)
      continue
    }

    checkedCount++
    
    const positionDepartment = getDepartmentFromPosition(officer.position)
    
    console.log(`🔍 Officer ID ${officer.officer_id} (${officer.first_name} ${officer.last_name}):`)
    console.log(`   ตำแหน่ง: "${officer.position}"`)
    console.log(`   Department (ปัจจุบัน): "${officer.department}"`)
    console.log(`   Position Department: "${positionDepartment}"`)
    
    if (officer.department !== positionDepartment) {
      console.log(`   🔧 ต้องอัปเดต: ${officer.department} → ${positionDepartment}`)
      
      // อัปเดต department ให้ตรงกับ position
      const updated = await prisma.officer.update({
        where: {
          officer_id: officer.officer_id
        },
        data: {
          department: positionDepartment
        }
      })
      
      console.log(`   ✅ อัปเดตเรียบร้อย!`)
      updatedCount++
    } else {
      console.log(`   ✅ ถูกต้องแล้ว`)
    }
    
    console.log('')
  }

  console.log('=' .repeat(80))
  console.log('📊 สรุปผลการแก้ไข:')
  console.log('=' .repeat(80))
  console.log(`👥 Officer ที่ตรวจสอบ: ${checkedCount} คน`)
  console.log(`🔧 Officer ที่อัปเดต: ${updatedCount} คน`)
  console.log(`✅ Officer ที่ถูกต้องอยู่แล้ว: ${checkedCount - updatedCount} คน`)
  
  if (updatedCount > 0) {
    console.log(`\n🎉 แก้ไขเรียบร้อย! ตอนนี้ department จะตรงกับ position แล้ว`)
  } else {
    console.log(`\n✨ ไม่มีปัญหา! Officer ทุกคนมี department ตรงกับ position อยู่แล้ว`)
  }

} catch (error) {
  console.error('❌ เกิดข้อผิดพลาด:', error.message)
  console.error(error.stack)
} finally {
  await prisma.$disconnect()
}