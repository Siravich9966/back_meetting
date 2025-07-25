// ===================================================================
// Department-based Access Control
// ===================================================================
// ฟังก์ชันสำหรับตรวจสอบสิทธิ์การเข้าถึงตาม Department
// ===================================================================

import { isSameDepartment as compareDepartments } from '../utils/departments.js'

// Room Management Permissions
export const canManageRoom = (user, roomDepartment) => {
  // Admin ไม่สามารถจัดการห้องได้ (ตามกฎหมายที่อาจารย์กำหนด)
  if (user?.role === 'admin') return false
  
  // Officer สามารถจัดการได้เฉพาะห้องใน department ตัวเอง
  if (user?.role === 'officer') {
    return compareDepartments(user?.department, roomDepartment)
  }
  
  return false
}

// Review Viewing Permissions
export const canViewRoomReviews = (user, roomDepartment) => {
  // Admin ดูรีวิวได้ทุกห้อง
  if (user?.role === 'admin') return true
  
  // Executive ดูรีวิวได้ตามระดับ
  if (user?.role === 'executive') {
    if (user?.position === 'university_executive') return true // ดูได้ทุกห้อง
    if (user?.position === 'faculty_executive') return user?.department === roomDepartment // ดูได้เฉพาะคณะตัวเอง
  }
  
  // Officer ดูรีวิวได้เฉพาะห้องใน department ตัวเอง
  if (user?.role === 'officer') {
    return user?.department === roomDepartment
  }
  
  // User ดูรีวิวได้ทุกห้อง
  return true
}

// Reservation Management Permissions
export const canManageReservation = (user, reservation) => {
  // Admin สามารถดูสถิติได้ แต่ไม่จัดการจอง
  if (user?.role === 'admin') return false
  
  // Officer สามารถจัดการการจองในห้องของ department ตัวเอง
  if (user?.role === 'officer') {
    return user?.department === reservation.meeting_room?.department
  }
  
  // User สามารถจัดการการจองของตัวเองเท่านั้น
  if (user?.role === 'user') {
    return user?.user_id === reservation.user_id
  }
  
  return false
}

// Department Access Helpers
export const isSameDepartment = (user, targetDepartment) => {
  return user?.department === targetDepartment
}

export const canAccessDepartmentData = (user, targetDepartment) => {
  // Admin เข้าถึงข้อมูลทุก department ได้
  if (user?.role === 'admin') return true
  
  // Executive เข้าถึงข้อมูลตามระดับ
  if (user?.role === 'executive') {
    if (user?.position === 'university_executive') return true // เข้าถึงได้ทุก department
    if (user?.position === 'faculty_executive') return user?.department === targetDepartment // เฉพาะคณะตัวเอง
  }
  
  // Officer เข้าถึงข้อมูลใน department ตัวเองได้
  if (user?.role === 'officer') {
    return user?.department === targetDepartment
  }
  
  // User เข้าถึงข้อมูลใน department ตัวเองได้
  return user?.department === targetDepartment
}
