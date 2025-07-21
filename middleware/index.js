// ===================================================================
// Middleware Index - Export ทุกอย่างจากที่เดียว
// ===================================================================
// นำเข้าและ export middleware ทั้งหมดเพื่อให้เรียกใช้ง่าย
// ===================================================================

// JWT Authentication
export { authMiddleware } from './jwt.js'

// Role Checking Functions  
export { 
  isAdmin, 
  isOfficer, 
  isUser, 
  hasRole, 
  hasAnyRole, 
  isActiveUser 
} from './roles.js'

// Department-based Permissions
export { 
  canManageRoom, 
  canViewRoomReviews, 
  canManageReservation,
  isSameDepartment,
  canAccessDepartmentData
} from './permissions.js'
