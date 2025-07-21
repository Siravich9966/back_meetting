// ===================================================================
// Department Constants & Validation
// ===================================================================
// จัดการ department ทั้งหมดในระบบ
// ===================================================================

// รายการ Department ที่อนุญาต
export const DEPARTMENTS = {
  // คณะวิทยาศาสตร์และเทคโนโลยี
  IT: 'IT',
  COMPUTER_SCIENCE: 'Computer Science',
  ENGINEERING: 'Engineering',
  
  // คณะธุรกิจ
  FINANCE: 'Finance',
  ACCOUNTING: 'Accounting',
  MARKETING: 'Marketing',
  SALES: 'Sales',
  
  // คณะศิลปศาสตร์
  HR: 'HR',
  ADMIN: 'Administration',
  
  // คณะแพทยศาสตร์ (ถ้ามี)
  MEDICAL: 'Medical',
  NURSING: 'Nursing'
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
  TECHNOLOGY: ['IT', 'Computer Science', 'Engineering'],
  BUSINESS: ['Finance', 'Accounting', 'Marketing', 'Sales'],
  ADMINISTRATION: ['HR', 'Administration'],
  MEDICAL: ['Medical', 'Nursing']
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
