#!/usr/bin/env bun
// ===================================================================
// Check All Officers - Detailed Analysis  
// ===================================================================
// ตรวจสอบข้อมูล Officer ทุกคนในฐานข้อมูลให้ละเอียด
// ===================================================================

import { PrismaClient } from './generated/prisma/index.js'
import { getDepartmentFromPosition } from './utils/positions.js'

const prisma = new PrismaClient()

console.log('🔍 เริ่มตรวจสอบข้อมูล Officer ทุกคนในฐานข้อมูล...\n')

try {
  // ดึงข้อมูล Officer ทั้งหมด
  const officers = await prisma.officer.findMany({
    select: {
      officer_id: true,
      email: true,
      first_name: true,
      last_name: true,
      position: true,
      department: true,
      role_id: true,
      created_at: true
    },
    orderBy: {
      officer_id: 'asc'
    }
  })

  console.log(`📊 พบ Officer ทั้งหมด: ${officers.length} คน\n`)
  
  // ดึงข้อมูลห้องทั้งหมดเพื่อเปรียบเทียบ department
  const rooms = await prisma.meeting_room.findMany({
    select: {
      room_id: true,
      room_name: true,
      department: true
    }
  })

  console.log(`🏢 ห้องประชุมทั้งหมด: ${rooms.length} ห้อง`)
  const uniqueDepartments = [...new Set(rooms.map(room => room.department))].sort()
  console.log(`📋 Department ที่มีห้องประชุม: ${uniqueDepartments.join(', ')}\n`)

  // วิเคราะห์แต่ละคน
  let activeOfficers = 0
  let hasRoomAccess = 0
  let noRoomAccess = 0
  
  console.log('=' .repeat(100))
  console.log('📋 รายละเอียด Officer แต่ละคน:')
  console.log('=' .repeat(100))

  for (const officer of officers) {
    activeOfficers++
    
    // คำนวณ position_department จาก position
    const positionDepartment = getDepartmentFromPosition(officer.position)
    
    // หาห้องที่ officer คนนี้สามารถจัดการได้
    const managableRooms = rooms.filter(room => room.department === positionDepartment)
    
    // สถานะการเข้าถึงห้อง
    const accessStatus = managableRooms.length > 0 ? '✅' : '❌'
    if (managableRooms.length > 0) {
      hasRoomAccess++
    } else {
      noRoomAccess++
    }
    
    console.log(`👤 Officer ID: ${officer.officer_id}`)
    console.log(`   📧 Email: ${officer.email}`)
    console.log(`   👨‍💼 ชื่อ: ${officer.first_name} ${officer.last_name}`)
    console.log(`   🏛️ ตำแหน่ง: "${officer.position}"`)
    console.log(`   🏢 Department (DB): "${officer.department || 'ไม่ระบุ'}"`)
    console.log(`   🎯 Position Department: "${positionDepartment || 'ไม่สามารถคำนวณได้'}"`)
    console.log(`   👥 Role ID: ${officer.role_id}`)
    console.log(`   ${accessStatus} สิทธิ์เข้าถึงห้อง: ${managableRooms.length} ห้อง`)
    
    if (managableRooms.length > 0) {
      console.log(`   📍 ห้องที่จัดการได้:`)
      managableRooms.forEach(room => {
        console.log(`      - ${room.room_name} (ID: ${room.room_id})`)
      })
    }
    
    // แสดงปัญหาถ้ามี
    const issues = []
    
    if (!positionDepartment) {
      issues.push('❌ ไม่สามารถคำนวณ position_department ได้')
    }
    
    if (officer.department !== positionDepartment && positionDepartment) {
      issues.push(`⚠️ department (${officer.department}) ≠ position_department (${positionDepartment})`)
    }
    
    if (managableRooms.length === 0 && positionDepartment) {
      issues.push(`❌ ไม่มีห้องใน department "${positionDepartment}"`)
    }
    
    if (issues.length > 0) {
      console.log(`   🚨 ปัญหาที่พบ:`)
      issues.forEach(issue => console.log(`      ${issue}`))
    }
    
    console.log(`   📅 สร้างเมื่อ: ${new Date(officer.created_at).toLocaleString('th-TH')}`)
    console.log('-'.repeat(80))
  }

  // สรุปผล
  console.log('\n' + '=' .repeat(100))
  console.log('📊 สรุปผลการตรวจสอบ:')
  console.log('=' .repeat(100))
  console.log(`👥 Officer ทั้งหมด: ${officers.length} คน`)
  console.log(`✅ Officer ที่แสดงข้อมูล: ${activeOfficers} คน`)
  console.log(`🏢 Officer ที่มีสิทธิ์เข้าถึงห้อง: ${hasRoomAccess} คน`)
  console.log(`🚫 Officer ที่ไม่มีสิทธิ์เข้าถึงห้อง: ${noRoomAccess} คน`)
  
  // แสดง Department ทั้งหมดที่มี Officer
  const officerDepartments = [...new Set(officers
    .filter(o => o.position)
    .map(o => getDepartmentFromPosition(o.position))
    .filter(Boolean)
  )].sort()
  
  console.log(`\n📋 Department ที่มี Officer: ${officerDepartments.join(', ')}`)
  console.log(`🏢 Department ที่มีห้องประชุม: ${uniqueDepartments.join(', ')}`)
  
  // หา Department ที่ไม่ตรงกัน
  const missingRoomDepts = officerDepartments.filter(dept => !uniqueDepartments.includes(dept))
  const missingOfficerDepts = uniqueDepartments.filter(dept => !officerDepartments.includes(dept))
  
  if (missingRoomDepts.length > 0) {
    console.log(`\n⚠️ Department ที่มี Officer แต่ไม่มีห้อง: ${missingRoomDepts.join(', ')}`)
  }
  
  if (missingOfficerDepts.length > 0) {
    console.log(`\n⚠️ Department ที่มีห้อง แต่ไม่มี Officer: ${missingOfficerDepts.join(', ')}`)
  }

} catch (error) {
  console.error('❌ เกิดข้อผิดพลาด:', error.message)
  console.error(error.stack)
} finally {
  await prisma.$disconnect()
}