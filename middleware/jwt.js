// ===================================================================
// JWT Authentication Middleware
// ===================================================================
// ตรวจสอบ JWT Token และดึงข้อมูลผู้ใช้จาก Database
// ===================================================================

import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'

// JWT Authentication Middleware
export const authMiddleware = async (request, set) => {
  // แปลง Headers object เป็น plain object ผ่าน JSON
  const headersString = JSON.stringify(request.headers)
  const headersObj = JSON.parse(headersString)
  const authHeader = headersObj.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    set.status = 401
    return { success: false, message: 'ต้องเข้าสู่ระบบก่อน' }
  }

  try {
    // แยก token
    const token = authHeader.substring(7)

    // ตรวจสอบ token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Log token verification details
    const timeLeft = decoded.exp * 1000 - Date.now()
    const minutesLeft = Math.round(timeLeft / (1000 * 60))
    console.log(`🔍 Token Verification - Role: ${decoded.role}, Time left: ${minutesLeft} minutes`)

    if (timeLeft <= 0) {
      console.log('⏰ Token หมดอายุแล้ว')
      set.status = 401
      return {
        success: false,
        message: 'Token หมดอายุแล้ว',
        expired: true
      }
    }

    // ดึงข้อมูลผู้ใช้จาก table ที่ระบุใน token
    let user = null
    const userTable = decoded.userTable // ใช้ข้อมูลจาก token

    // Query ข้อมูลจาก table ที่ถูกต้องตาม token
    if (userTable === 'users') {
      user = await prisma.users.findUnique({
        where: { user_id: decoded.userId },
        select: {
          user_id: true,
          email: true,
          first_name: true,
          last_name: true,
          citizen_id: true,
          position: true,
          department: true,
          zip_code: true,
          profile_image: true,
          created_at: true,
          updated_at: true,
          // เพิ่มข้อมูล address
          province_id: true,
          district_id: true,
          subdistrict_id: true,
          roles: {
            select: {
              role_name: true
            }
          }
        }
      })

      // ถ้ามีข้อมูล address ให้ดึงชื่อจริงๆ มาด้วย
      if (user && (user.province_id || user.district_id || user.subdistrict_id)) {
        // ดึงชื่อจังหวัด
        if (user.province_id) {
          const province = await prisma.province.findUnique({
            where: { province_id: user.province_id },
            select: { province_name: true }
          })
          user.province_name = province?.province_name || null
        }

        // ดึงชื่ออำเภอ
        if (user.district_id) {
          const district = await prisma.district.findUnique({
            where: { district_id: user.district_id },
            select: { district_name: true }
          })
          user.district_name = district?.district_name || null
        }

        // ดึงชื่อตำบล
        if (user.subdistrict_id) {
          const subdistrict = await prisma.subdistrict.findUnique({
            where: { subdistrict_id: user.subdistrict_id },
            select: { subdistrict_name: true }
          })
          user.subdistrict_name = subdistrict?.subdistrict_name || null
        }
      }
    } else if (userTable === 'officer') {
      user = await prisma.officer.findUnique({
        where: { officer_id: decoded.userId },
        select: {
          officer_id: true,
          email: true,
          first_name: true,
          last_name: true,
          citizen_id: true,
          position: true,
          department: true,
          zip_code: true,
          profile_image: true,
          created_at: true,
          updated_at: true,
          // เพิ่มข้อมูล address
          province_id: true,
          district_id: true,
          subdistrict_id: true,
          roles: {
            select: {
              role_name: true
            }
          }
        }
      })

      if (user) {
        // เปลี่ยน officer_id เป็น user_id เพื่อให้ consistent
        user.user_id = user.officer_id
        delete user.officer_id

        // ถ้ามีข้อมูล address ให้ดึงชื่อจริงๆ มาด้วย
        if (user.province_id || user.district_id || user.subdistrict_id) {
          // ดึงชื่อจังหวัด
          if (user.province_id) {
            const province = await prisma.province.findUnique({
              where: { province_id: user.province_id },
              select: { province_name: true }
            })
            user.province_name = province?.province_name || null
          }

          // ดึงชื่ออำเภอ
          if (user.district_id) {
            const district = await prisma.district.findUnique({
              where: { district_id: user.district_id },
              select: { district_name: true }
            })
            user.district_name = district?.district_name || null
          }

          // ดึงชื่อตำบล
          if (user.subdistrict_id) {
            const subdistrict = await prisma.subdistrict.findUnique({
              where: { subdistrict_id: user.subdistrict_id },
              select: { subdistrict_name: true }
            })
            user.subdistrict_name = subdistrict?.subdistrict_name || null
          }
        }
      }
    } else if (userTable === 'admin') {
      user = await prisma.admin.findUnique({
        where: { admin_id: decoded.userId },
        select: {
          admin_id: true,
          email: true,
          first_name: true,
          last_name: true,
          citizen_id: true,
          position: true,
          department: true,
          zip_code: true,
          profile_image: true,
          created_at: true,
          updated_at: true,
          // เพิ่มข้อมูล address
          province_id: true,
          district_id: true,
          subdistrict_id: true,
          roles: {
            select: {
              role_name: true
            }
          }
        }
      })

      if (user) {
        // เปลี่ยน admin_id เป็น user_id เพื่อให้ consistent
        user.user_id = user.admin_id
        delete user.admin_id
        
        // ถ้ามีข้อมูล address ให้ดึงชื่อจริงๆ มาด้วย
        if (user.province_id || user.district_id || user.subdistrict_id) {
          // ดึงชื่อจังหวัด
          if (user.province_id) {
            const province = await prisma.province.findUnique({
              where: { province_id: user.province_id },
              select: { province_name: true }
            })
            user.province_name = province?.province_name || null
          }
          
          // ดึงชื่ออำเภอ
          if (user.district_id) {
            const district = await prisma.district.findUnique({
              where: { district_id: user.district_id },
              select: { district_name: true }
            })
            user.district_name = district?.district_name || null
          }
          
          // ดึงชื่อตำบล
          if (user.subdistrict_id) {
            const subdistrict = await prisma.subdistrict.findUnique({
              where: { subdistrict_id: user.subdistrict_id },
              select: { subdistrict_name: true }
            })
            user.subdistrict_name = subdistrict?.subdistrict_name || null
          }
        }
      }
    } else if (userTable === 'executive') {
      user = await prisma.executive.findUnique({
        where: { executive_id: decoded.userId },
        select: {
          executive_id: true,
          email: true,
          first_name: true,
          last_name: true,
          citizen_id: true,
          position: true,
          department: true,
          zip_code: true,
          profile_image: true,
          created_at: true,
          updated_at: true,
          // เพิ่มข้อมูล address
          province_id: true,
          district_id: true,
          subdistrict_id: true,
          roles: {
            select: {
              role_name: true
            }
          }
        }
      })

      if (user) {
        // เปลี่ยน executive_id เป็น user_id เพื่อให้ consistent
        user.user_id = user.executive_id
        delete user.executive_id
        
        // ถ้ามีข้อมูล address ให้ดึงชื่อจริงๆ มาด้วย
        if (user.province_id || user.district_id || user.subdistrict_id) {
          // ดึงชื่อจังหวัด
          if (user.province_id) {
            const province = await prisma.province.findUnique({
              where: { province_id: user.province_id },
              select: { province_name: true }
            })
            user.province_name = province?.province_name || null
          }
          
          // ดึงชื่ออำเภอ
          if (user.district_id) {
            const district = await prisma.district.findUnique({
              where: { district_id: user.district_id },
              select: { district_name: true }
            })
            user.district_name = district?.district_name || null
          }
          
          // ดึงชื่อตำบล
          if (user.subdistrict_id) {
            const subdistrict = await prisma.subdistrict.findUnique({
              where: { subdistrict_id: user.subdistrict_id },
              select: { subdistrict_name: true }
            })
            user.subdistrict_name = subdistrict?.subdistrict_name || null
          }
        }
      }
    }

    if (!user) {
      set.status = 401
      return { success: false, message: 'ผู้ใช้ไม่ถูกต้อง' }
    }

    // เพิ่ม role เข้าไปใน user object
    const userWithRole = {
      ...user,
      role: decoded.role || user.roles?.role_name || 'user', // ใช้ role จาก token ก่อน
      userTable: userTable // เพิ่มข้อมูลว่ามาจาก table ไหน
    }

    // แปลง profile_image binary data เป็น URL
    if (userWithRole.profile_image) {
      const userId = userWithRole.user_id || userWithRole.officer_id || userWithRole.admin_id || userWithRole.executive_id
      userWithRole.profile_image = `/api/upload/profile-image/${userId}`
    }

    // คืนค่า user กลับไป
    return userWithRole

  } catch (error) {
    console.log('❌ JWT Error:', error.name, error.message)

    // ตรวจสอบประเภท error เฉพาะเจาะจง
    if (error.name === 'TokenExpiredError') {
      set.status = 401
      return {
        success: false,
        message: 'Token หมดอายุแล้ว',
        expired: true
      }
    } else if (error.name === 'JsonWebTokenError') {
      set.status = 401
      return {
        success: false,
        message: 'Token ไม่ถูกต้อง',
        invalid: true
      }
    } else if (error.name === 'NotBeforeError') {
      set.status = 401
      return {
        success: false,
        message: 'Token ยังไม่สามารถใช้งานได้',
        notActive: true
      }
    }

    // กรณี error อื่นๆ
    set.status = 401
    return { success: false, message: 'การยืนยันตัวตนล้มเหลว' }
  }
}
