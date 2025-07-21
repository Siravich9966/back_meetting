// ===================================================================
// Role Checking Functions
// ===================================================================
// ฟังก์ชันสำหรับตรวจสอบ Role ของผู้ใช้
// ===================================================================

// Basic Role Checking Functions
export const isAdmin = (user) => user?.role === 'admin'

export const isOfficer = (user) => user?.role === 'officer' || user?.role === 'admin'

export const isUser = (user) => ['user', 'officer', 'admin'].includes(user?.role)

// Advanced Role Checking
export const hasRole = (user, role) => user?.role === role

export const hasAnyRole = (user, roles) => roles.includes(user?.role)

export const isActiveUser = (user) => user?.roles?.role_status === 'active'
