// ===================================================================
// Admin APIs - จัดการสมาชิกและสถิติระบบ
// ===================================================================
// ไฟล์นี้จัดการ:
// - GET /api/protected/admin/users - ดูรายการสมาชิกทั้งหมด
// - PUT /api/protected/admin/users/:id/role - เปลี่ยน role ของสมาชิก
// - PUT /api/protected/admin/users/:id/status - เปลี่ยนสถานะสมาชิก
// - DELETE /api/protected/admin/users/:id - ลบสมาชิก
// - GET /api/protected/admin/stats - ดูสถิติการใช้งานระบบ
// - GET /api/protected/admin/reviews - ดูรีวิวทั้งระบบ
// ===================================================================

import { Elysia } from 'elysia'
import prisma from '../lib/prisma.js'
import { authMiddleware, isAdmin } from '../middleware/index.js'

export const adminUserRoutes = new Elysia({ prefix: '/protected/admin' })
  // จัดการสมาชิก
  .group('/users', app =>
    app
      // ดูรายการสมาชิกทั้งหมด
      .get('/', async ({ request, query, set }) => {
        // ตรวจสอบสิทธิ์ admin
        const user = await authMiddleware(request, set)
        if (user.success === false) return user
        
        if (!isAdmin(user)) {
          set.status = 403
          return {
            success: false,
            message: 'การเข้าถึงจำกัดเฉพาะผู้ดูแลระบบเท่านั้น'
          }
        }

        try {
          const { role, department, search, page = 1, limit = 20 } = query
          
          // สร้าง filter conditions
          const where = {}
          
          if (role) {
            where.roles = { role_name: role }
          }
          
          if (department) {
            where.department = department
          }
          
          if (search) {
            where.OR = [
              { first_name: { contains: search, mode: 'insensitive' } },
              { last_name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
              { position: { contains: search, mode: 'insensitive' } }
            ]
          }

          const skip = (parseInt(page) - 1) * parseInt(limit)

          const [users, total] = await Promise.all([
            prisma.users.findMany({
              where,
              select: {
                user_id: true,
                first_name: true,
                last_name: true,
                email: true,
                citizen_id: true,
                position: true,
                department: true,
                zip_code: true,
                created_at: true,
                updated_at: true,
                roles: {
                  select: {
                    role_name: true,
                    role_status: true
                  }
                },
                _count: {
                  select: {
                    reservation: true,
                    review: true
                  }
                }
              },
              orderBy: { created_at: 'desc' },
              skip,
              take: parseInt(limit)
            }),
            prisma.users.count({ where })
          ])

          return {
            success: true,
            message: 'รายการสมาชิกทั้งหมด',
            users: users,
            pagination: {
              total,
              page: parseInt(page),
              limit: parseInt(limit),
              totalPages: Math.ceil(total / parseInt(limit))
            }
          }

        } catch (error) {
          console.error('❌ Error fetching users:', error)
          set.status = 500
          return {
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสมาชิก'
          }
        }
      })

      // เปลี่ยน role ของสมาชิก
      .put('/:id/role', async ({ request, params, body, set }) => {
        // ตรวจสอบสิทธิ์ admin
        const user = await authMiddleware(request, set)
        if (user.success === false) return user
        
        if (!isAdmin(user)) {
          set.status = 403
          return {
            success: false,
            message: 'การเข้าถึงจำกัดเฉพาะผู้ดูแลระบบเท่านั้น'
          }
        }

        try {
          const userId = parseInt(params.id)
          const { role_id } = body

          if (isNaN(userId) || !role_id) {
            set.status = 400
            return {
              success: false,
              message: 'ID ผู้ใช้หรือ role_id ไม่ถูกต้อง'
            }
          }

          // ตรวจสอบว่า role มีอยู่จริง
          const role = await prisma.roles.findUnique({
            where: { role_id: parseInt(role_id) }
          })

          if (!role) {
            set.status = 404
            return {
              success: false,
              message: 'ไม่พบ role ที่ระบุ'
            }
          }

          // อัปเดต role ของผู้ใช้
          const updatedUser = await prisma.users.update({
            where: { user_id: userId },
            data: { 
              role_id: parseInt(role_id),
              updated_at: new Date()
            },
            select: {
              user_id: true,
              first_name: true,
              last_name: true,
              email: true,
              department: true,
              roles: {
                select: {
                  role_name: true,
                  role_status: true
                }
              }
            }
          })

          return {
            success: true,
            message: 'เปลี่ยน role ของสมาชิกสำเร็จ',
            user: updatedUser
          }

        } catch (error) {
          console.error('❌ Error updating user role:', error)
          set.status = 500
          return {
            success: false,
            message: 'เกิดข้อผิดพลาดในการเปลี่ยน role'
          }
        }
      })

      // ลบสมาชิก
      .delete('/:id', async ({ request, params, set }) => {
        // ตรวจสอบสิทธิ์ admin
        const user = await authMiddleware(request, set)
        if (user.success === false) return user
        
        if (!isAdmin(user)) {
          set.status = 403
          return {
            success: false,
            message: 'การเข้าถึงจำกัดเฉพาะผู้ดูแลระบบเท่านั้น'
          }
        }

        try {
          const userId = parseInt(params.id)
          
          if (isNaN(userId)) {
            set.status = 400
            return {
              success: false,
              message: 'ID ผู้ใช้ไม่ถูกต้อง'
            }
          }

          // ตรวจสอบว่าไม่ใช่การลบตัวเอง
          if (userId === user.user_id) {
            set.status = 400
            return {
              success: false,
              message: 'ไม่สามารถลบบัญชีตัวเองได้'
            }
          }

          // ตรวจสอบว่ามีการจองที่ยังไม่เสร็จสิ้น
          const activeReservations = await prisma.reservation.findMany({
            where: { 
              user_id: userId,
              status_r: { notIn: ['completed', 'cancelled'] }
            }
          })

          if (activeReservations.length > 0) {
            set.status = 400
            return {
              success: false,
              message: 'ไม่สามารถลบผู้ใช้ที่มีการจองที่ยังไม่เสร็จสิ้นได้'
            }
          }

          // ลบข้อมูลที่เกี่ยวข้องก่อน
          await prisma.review.deleteMany({
            where: { user_id: userId }
          })

          await prisma.reservation.deleteMany({
            where: { user_id: userId }
          })

          // ลบผู้ใช้
          await prisma.users.delete({
            where: { user_id: userId }
          })

          return {
            success: true,
            message: 'ลบสมาชิกสำเร็จ'
          }

        } catch (error) {
          console.error('❌ Error deleting user:', error)
          set.status = 500
          return {
            success: false,
            message: 'เกิดข้อผิดพลาดในการลบสมาชิก'
          }
        }
      })
  )

  // สถิติการใช้งานระบบ
  .get('/stats', async ({ request, set }) => {
    // ตรวจสอบสิทธิ์ admin
    const user = await authMiddleware(request, set)
    if (user.success === false) return user
    
    if (!isAdmin(user)) {
      set.status = 403
      return {
        success: false,
        message: 'การเข้าถึงจำกัดเฉพาะผู้ดูแลระบบเท่านั้น'
      }
    }

    try {
      // ดึงสถิติต่างๆ
      const [
        totalUsers,
        totalRooms,
        totalReservations,
        totalReviews,
        usersByRole,
        roomsByDepartment,
        reservationsByStatus,
        monthlyReservations
      ] = await Promise.all([
        // จำนวนสมาชิกทั้งหมด
        prisma.users.count(),
        
        // จำนวนห้องประชุมทั้งหมด
        prisma.meeting_room.count(),
        
        // จำนวนการจองทั้งหมด
        prisma.reservation.count(),
        
        // จำนวนรีวิวทั้งหมด
        prisma.review.count(),
        
        // จำนวนสมาชิกแยกตาม role
        prisma.users.groupBy({
          by: ['role_id'],
          _count: { role_id: true },
          include: {
            roles: {
              select: { role_name: true }
            }
          }
        }),
        
        // จำนวนห้องแยกตาม department
        prisma.meeting_room.groupBy({
          by: ['department'],
          _count: { department: true }
        }),
        
        // จำนวนการจองแยกตาม status
        prisma.reservation.groupBy({
          by: ['status_r'],
          _count: { status_r: true }
        }),
        
        // การจองใน 12 เดือนที่ผ่านมา
        prisma.$queryRaw`
          SELECT 
            DATE_TRUNC('month', created_at) as month,
            COUNT(*) as count
          FROM reservation 
          WHERE created_at >= NOW() - INTERVAL '12 months'
          GROUP BY DATE_TRUNC('month', created_at)
          ORDER BY month
        `
      ])

      return {
        success: true,
        message: 'สถิติการใช้งานระบบ',
        stats: {
          overview: {
            total_users: totalUsers,
            total_rooms: totalRooms,
            total_reservations: totalReservations,
            total_reviews: totalReviews
          },
          users_by_role: usersByRole,
          rooms_by_department: roomsByDepartment,
          reservations_by_status: reservationsByStatus,
          monthly_reservations: monthlyReservations
        }
      }

    } catch (error) {
      console.error('❌ Error fetching stats:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงสถิติ'
      }
    }
  })

  // ดูรีวิวทั้งระบบ
  .get('/reviews', async ({ request, query, set }) => {
    // ตรวจสอบสิทธิ์ admin
    const user = await authMiddleware(request, set)
    if (user.success === false) return user
    
    if (!isAdmin(user)) {
      set.status = 403
      return {
        success: false,
        message: 'การเข้าถึงจำกัดเฉพาะผู้ดูแลระบบเท่านั้น'
      }
    }

    try {
      const { department, rating, page = 1, limit = 20 } = query
      
      // สร้าง filter conditions
      const where = {}
      
      if (department) {
        where.meeting_room = { department }
      }
      
      if (rating) {
        where.rating = parseInt(rating)
      }

      const skip = (parseInt(page) - 1) * parseInt(limit)

      const [reviews, total] = await Promise.all([
        prisma.review.findMany({
          where,
          select: {
            review_id: true,
            comment: true,
            rating: true,
            created_at: true,
            users: {
              select: {
                first_name: true,
                last_name: true,
                department: true
              }
            },
            meeting_room: {
              select: {
                room_name: true,
                department: true
              }
            }
          },
          orderBy: { created_at: 'desc' },
          skip,
          take: parseInt(limit)
        }),
        prisma.review.count({ where })
      ])

      // คำนวณคะแนนเฉลี่ย
      const averageRating = await prisma.review.aggregate({
        where,
        _avg: { rating: true }
      })

      return {
        success: true,
        message: 'รีวิวทั้งระบบ',
        reviews: reviews,
        average_rating: parseFloat((averageRating._avg.rating || 0).toFixed(1)),
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit))
        }
      }

    } catch (error) {
      console.error('❌ Error fetching reviews:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงรีวิว'
      }
    }
  })
