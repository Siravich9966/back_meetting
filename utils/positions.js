// ===================================================================
// Position Constants & Validation
// ===================================================================
// จัดการ positions ทั้งหมดในระบบ สำหรับ Registration
// ===================================================================

import { DEPARTMENTS } from './departments.js'

// รายการ Position หลักสำหรับ Registration
export const POSITIONS = {
  // บุคลากรทั่วไป → จะไปตาราง users
  GENERAL_STAFF: 'บุคลากร/อาจารย์ มหาวิทยาลัยราชภัฏมหาสารคาม',
  
  // ผู้บริหาร → จะไปตาราง executive
  UNIVERSITY_EXECUTIVE: 'ผู้บริหารระดับมหาวิทยาลัย',
  
  // เจ้าหน้าที่แต่ละคณะ → จะไปตาราง officer (ต้องระบุคณะที่ดูแล)
  UNIVERSITY_OFFICER_72: 'เจ้าหน้าที่ดูแลห้องประชุมอาคาร 72 พรรษา',
  UNIVERSITY_OFFICER_HALL: 'เจ้าหน้าที่ดูแลห้องประชุมหอประชุมเฉลิมพระเกียรติ 80 พรรษา',
  UNIVERSITY_OFFICER_34: 'เจ้าหน้าที่ดูแลห้องประชุมอาคาร 34 เฉลิมพระเกียรติ 60 ปี',
  
  // เจ้าหน้าที่คณะอื่นๆ → จะ generate ตาม DEPARTMENTS
}

// สร้าง Position สำหรับผู้บริหารคณะ (Faculty Executive)
export const FACULTY_EXECUTIVE_POSITIONS = Object.values(DEPARTMENTS)
  .filter(dept => !dept.includes('อาคาร') && !dept.includes('หอประชุม')) // ไม่รวมอาคาร
  .map(dept => `ผู้บริหาร${dept}`)

// สร้าง Position สำหรับเจ้าหน้าที่ (Officer) ระดับคณะ
export const OFFICER_POSITIONS = Object.values(DEPARTMENTS)
  .map(dept => `เจ้าหน้าที่ดูแลห้องประชุม${dept}`)

// เจ้าหน้าที่ทั้งหมด (ทุกคนต้องมี department)
export const UNIVERSITY_OFFICER_POSITIONS = [
  POSITIONS.UNIVERSITY_OFFICER_72,
  POSITIONS.UNIVERSITY_OFFICER_HALL,
  POSITIONS.UNIVERSITY_OFFICER_34
]

// รวม Position เจ้าหน้าที่ทั้งหมด
export const ALL_OFFICER_POSITIONS = [
  ...UNIVERSITY_OFFICER_POSITIONS,
  ...OFFICER_POSITIONS
]

// รวม Position ทั้งหมด
export const ALL_POSITIONS = [
  POSITIONS.GENERAL_STAFF,
  POSITIONS.UNIVERSITY_EXECUTIVE,
  ...FACULTY_EXECUTIVE_POSITIONS,
  ...ALL_OFFICER_POSITIONS
]

// ฟังก์ชันตรวจสอบ position ที่ถูกต้อง
export const isValidPosition = (position) => {
  return ALL_POSITIONS.includes(position)
}

// ฟังก์ชันกำหนดว่า position จะไปตารางไหน
export const getTableFromPosition = (position) => {
  if (position === POSITIONS.GENERAL_STAFF) {
    return 'users'
  }
  
  if (position === POSITIONS.UNIVERSITY_EXECUTIVE || 
      FACULTY_EXECUTIVE_POSITIONS.includes(position)) {
    return 'executive'
  }
  
  if (ALL_OFFICER_POSITIONS.includes(position)) {
    return 'officer'
  }
  
  return null // ไม่รู้จัก position
}

// ฟังก์ชันแปลง position เป็น role_id
export const getRoleIdFromPosition = (position) => {
  const table = getTableFromPosition(position)
  
  switch(table) {
    case 'users': return 1 // user role
    case 'officer': return 2 // officer role  
    case 'admin': return 3 // admin role
    case 'executive': return 4 // executive role
    default: return 1 // default เป็น user
  }
}

// ฟังก์ชันแยกคณะจาก position
export const getDepartmentFromPosition = (position) => {
  // สำหรับผู้บริหารคณะ
  if (position.startsWith('ผู้บริหาร') && position !== POSITIONS.UNIVERSITY_EXECUTIVE) {
    return position.replace('ผู้บริหาร', '')
  }
  
  // สำหรับเจ้าหน้าที่ทั้งหมด - ลบ prefix แล้วจะได้ department/location
  if (position.startsWith('เจ้าหน้าที่ดูแลห้องประชุม')) {
    const department = position.replace('เจ้าหน้าที่ดูแลห้องประชุม', '')
    
    // แมปตำแหน่งพิเศษกับคณะ
    if (department === 'อาคาร 72 พรรษา') return 'สำนักงานอธิการบดี'
    if (department === 'หอประชุมเฉลิมพระเกียรติ 80 พรรษา') return 'สำนักงานอธิการบดี'
    if (department === 'อาคาร 34 เฉลิมพระเกียรติ 60 ปี') return 'สำนักงานอธิการบดี'
    
    // สำหรับคณะอื่นๆ ให้ return department ตรงๆ
    return department
  }
  
  return null
}

// ฟังก์ชันกำหนด executive position type
export const getExecutivePositionType = (position) => {
  if (position === POSITIONS.UNIVERSITY_EXECUTIVE) {
    return 'university_executive'
  }
  
  if (FACULTY_EXECUTIVE_POSITIONS.includes(position)) {
    return 'faculty_executive'
  }
  
  return null
}

// ฟังก์ชันจัดกลุ่ม positions สำหรับ UI
export const getPositionGroups = () => {
  return {
    general: {
      label: 'บุคลากรทั่วไป',
      positions: [POSITIONS.GENERAL_STAFF]
    },
    executives: {
      label: 'ผู้บริหาร',
      positions: [
        POSITIONS.UNIVERSITY_EXECUTIVE,
        ...FACULTY_EXECUTIVE_POSITIONS
      ]
    },
    officers: {
      label: 'เจ้าหน้าที่ดูแลห้องประชุม',
      positions: ALL_OFFICER_POSITIONS
    }
  }
}

export default {
  POSITIONS,
  ALL_POSITIONS,
  FACULTY_EXECUTIVE_POSITIONS,
  OFFICER_POSITIONS,
  UNIVERSITY_OFFICER_POSITIONS,
  ALL_OFFICER_POSITIONS,
  isValidPosition,
  getTableFromPosition,
  getRoleIdFromPosition,
  getDepartmentFromPosition,
  getExecutivePositionType,
  getPositionGroups
}
