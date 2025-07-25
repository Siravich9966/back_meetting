// ===================================================================
// Role Checking Functions - Updated Hierarchy
// ===================================================================
// ฟังก์ชันสำหรับตรวจสอบ Role ของผู้ใช้
// ADMIN = ระดับสูงสุด เห็นทุกอย่าง แต่จัดการได้เฉพาะสมาชิก ไม่สามารถจัดการห้องประชุมได้
// OFFICER = จัดการห้องประชุมในคณะ/ตึกตัวเองเท่านั้น
// EXECUTIVE = ผู้บริหาร ดูได้อย่างเดียว แก้ไขไม่ได้
// ===================================================================

// Basic Role Checking Functions
export const isAdmin = (user) => user?.role === 'admin'

// Officer เท่านั้น - Admin ไม่สามารถทำงานระดับ officer ได้ (ไม่สามารถจัดการห้องประชุมได้)
export const isOfficer = (user) => user?.role === 'officer'

// ทุกคนเข้าได้ (basic user access)
export const isUser = (user) => ['user', 'officer', 'admin', 'executive'].includes(user?.role)

// Executive - สำหรับดู report เท่านั้น (READ ONLY)
export const isExecutive = (user) => user?.role === 'executive' 

export const isUniversityExecutive = (user) => 
  user?.role === 'executive' && user?.position === 'university_executive'

export const isFacultyExecutive = (user) => 
  user?.role === 'executive' && user?.position === 'faculty_executive'

// ใน 3-table system ไม่ใช้ role_status แล้ว - ลบออก
