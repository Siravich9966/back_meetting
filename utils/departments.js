// ===================================================================
// Department Constants & Validation
// ===================================================================
// จัดการ department ทั้งหมดในระบบ
// ===================================================================

// รายการ Department ที่อนุญาต - มหาวิทยาลัยราชภัฏมหาสารคาม (9 คณะตามข้อมูลจริง)
export const DEPARTMENTS = {
  // 9 คณะหลัก ตามข้อมูลจริงที่ผู้ใช้ให้มา
  SCIENCE_TECH: 'คณะวิทยาศาสตร์และเทคโนโลยี',
  EDUCATION: 'คณะครุศาสตร์', 
  MANAGEMENT: 'คณะวิทยาการจัดการ',
  HUMANITIES_SOCIAL: 'คณะมนุษยศาสตร์และสังคมศาสตร์',
  AGRI_TECH: 'คณะเทคโนโลยีการเกษตร',
  INFO_TECH: 'คณะเทคโนโลยีสารสนเทศ',
  POLITICAL_ADMIN: 'คณะรัฐศาสตร์และรัฐประศาสนศาสตร์',
  LAW: 'คณะนิติศาสตร์',
  ENGINEERING: 'คณะวิศวกรรมศาสตร์',
  
  // อาคาร/หอประชุมพิเศษ
  BUILDING_72: 'อาคารประชุม 72 พรรษา มหาราชินี',
  AUDITORIUM: 'หอประชุมใหญ่ / หอประชุมเฉลิมพระเกียรติ 80 พรรษา',
  BUILDING_34: 'อาคาร 34 อาคารเฉลิมพระเกียรติฉลองสิริราชสมบัติครบ 60 ปี(อาคาร 34 คณะวิทยาการจัดการ)'
}

// แปลงเป็น Array สำหรับ validation
export const DEPARTMENT_LIST = Object.values(DEPARTMENTS)

// ฟังก์ชันตรวจสอบ department ที่ถูกต้อง
export const isValidDepartment = (department) => {
  return DEPARTMENT_LIST.includes(department)
}

// ฟังก์ชันดึงรายการ department
export const getAllDepartments = () => {
  return DEPARTMENT_LIST
}

// ฟังก์ชันเปรียบเทียบ department (case insensitive)
export const isSameDepartment = (dept1, dept2) => {
  if (!dept1 || !dept2) return false
  return dept1.toLowerCase().trim() === dept2.toLowerCase().trim()
}

// ฟังก์ชันหา department จากชื่อคล้ายๆ
export const findDepartmentByName = (searchTerm) => {
  const search = searchTerm.toLowerCase().trim()
  return DEPARTMENT_LIST.find(dept => 
    dept.toLowerCase().includes(search) || 
    search.includes(dept.toLowerCase())
  )
}

// แมปกลุ่ม department (ถ้าต้องการจัดกลุ่ม)
export const DEPARTMENT_GROUPS = {
  SCIENCE_TECHNOLOGY: [
    'คณะวิทยาศาสตร์และเทคโนโลยี', 
    'คณะเทคโนโลยีการเกษตร',
    'คณะเทคโนโลยีสารสนเทศ', 
    'คณะวิศวกรรมศาสตร์'
  ],
  HUMANITIES_SOCIAL: [
    'คณะครุศาสตร์', 
    'คณะมนุษยศาสตร์และสังคมศาสตร์', 
    'คณะวิทยาการจัดการ',
    'คณะนิติศาสตร์',
    'คณะรัฐศาสตร์และรัฐประศาสนศาสตร์'
  ]
}

// ฟังก์ชันหากลุ่มของ department
export const getDepartmentGroup = (department) => {
  for (const [groupName, departments] of Object.entries(DEPARTMENT_GROUPS)) {
    if (departments.includes(department)) {
      return groupName
    }
  }
  return null
}
