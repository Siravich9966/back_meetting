// ===================================================================
// Reservation APIs - ระบบจองห้องประชุม
// ===================================================================
// ไฟล์นี้จัดการ:
// - User APIs: จอง, ดู, แก้ไข, ยกเลิกการจอง
// - Calendar APIs: ดูปฏิทินการจอง
// - Status tracking: pending -> approved/rejected
// 
// ตามเอกสาร 4.2 บุคลากร (User):
// 4.2.4 ดูปฏิทินการจองเพื่อดูวันที่ว่าง
// 4.2.5 เลือกวันและเวลาเพื่อจองห้องประชุม
// 4.2.6 ยกเลิกการจองของตนเอง
// ===================================================================

import { Elysia } from 'elysia'
import prisma from '../lib/prisma.js'
import { authMiddleware, isUser, isOfficer } from '../middleware/index.js'

// ===================================================================
// Public Reservation APIs (ไม่ต้อง auth)
// ===================================================================
export const reservationRoutes = new Elysia({ prefix: '/reservations' })
  
  // ดูปฏิทินการจองเพื่อดูวันที่ว่าง (4.2.4) - Enhanced with detailed availability
  .get('/calendar/:roomId', async ({ params, query, set }) => {
    try {
      const { roomId } = params
      const { month, year, detailed = false } = query
      
      // ตรวจสอบห้องประชุมที่มีอยู่
      const room = await prisma.meeting_room.findUnique({
        where: { room_id: parseInt(roomId) }
      })
      
      if (!room) {
        set.status = 404
        return {
          success: false,
          message: 'ไม่พบห้องประชุมที่ต้องการ'
        }
      }
      
      // สร้าง date range สำหรับเดือนที่ต้องการ
      const startDate = month && year ? 
        new Date(parseInt(year), parseInt(month) - 1, 1) :
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      
      const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
      
      // ดึงการจองที่ approved และ pending ในช่วงเวลานั้น
      const reservations = await prisma.reservation.findMany({
        where: {
          room_id: parseInt(roomId),
          status_r: { in: ['approved', 'pending'] },
          start_at: {
            gte: startDate,
            lte: endDate
          }
        },
        select: {
          reservation_id: true,
          start_at: true,
          end_at: true,
          start_time: true,
          end_time: true,
          details_r: true,
          status_r: true
        },
        orderBy: { start_at: 'asc' }
      })

      // ถ้าต้องการ detailed view แสดง availability slots
      if (detailed === 'true') {
        // สร้าง daily availability map
        const dailyAvailability = {}
        const workingHours = { 
          start: 6, end: 18,           // 6:00-18:00
          morningEnd: 12,              // ช่วงเช้าสิ้นสุด 12:00
          afternoonStart: 13,          // ช่วงบ่ายเริ่ม 13:00
          lunchBreak: { start: 12, end: 13 } // พักเที่ยง 12:00-13:00
        }
        
        // สร้าง template สำหรับแต่ละวันในเดือน
        for (let day = 1; day <= endDate.getDate(); day++) {
          const currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), day)
          const dateKey = currentDate.toISOString().split('T')[0]
          
          // สร้าง hourly slots (8:00-18:00)
          const slots = []
          for (let hour = workingHours.start; hour < workingHours.end; hour++) {
            slots.push({
              time: `${hour.toString().padStart(2, '0')}:00`,
              available: true,
              reservations: []
            })
          }
          
          dailyAvailability[dateKey] = {
            date: dateKey,
            day_of_week: currentDate.getDay(),
            slots: slots,
            total_reservations: 0
          }
        }
        
        // อัพเดต availability จากการจองที่มีอยู่
        reservations.forEach(reservation => {
          const startDate = new Date(reservation.start_at)
          const endDate = new Date(reservation.end_at)
          const startTime = new Date(reservation.start_time)
          const endTime = new Date(reservation.end_time)
          
          // วนดูแต่ละวันที่การจองนี้ครอบคลุม
          const currentDate = new Date(startDate)
          while (currentDate <= endDate) {
            const dateKey = currentDate.toISOString().split('T')[0]
            
            if (dailyAvailability[dateKey]) {
              dailyAvailability[dateKey].total_reservations++
              
              // อัพเดต slots ที่ถูกจอง
              const startHour = startTime.getHours()
              const endHour = endTime.getHours()
              
              dailyAvailability[dateKey].slots.forEach(slot => {
                const slotHour = parseInt(slot.time.split(':')[0])
                if (slotHour >= startHour && slotHour < endHour) {
                  slot.available = false
                  slot.reservations.push({
                    reservation_id: reservation.reservation_id,
                    status: reservation.status_r,
                    details: reservation.details_r,
                    time_range: `${startTime.toTimeString().slice(0,5)}-${endTime.toTimeString().slice(0,5)}`
                  })
                }
              })
            }
            
            currentDate.setDate(currentDate.getDate() + 1)
          }
        })
        
        return {
          success: true,
          message: `ปฏิทินการจองห้อง ${room.room_name} (รายละเอียด)`,
          room: {
            room_id: room.room_id,
            room_name: room.room_name,
            department: room.department
          },
          calendar: {
            month: startDate.getMonth() + 1,
            year: startDate.getFullYear(),
            working_hours: workingHours,
            daily_availability: Object.values(dailyAvailability)
          }
        }
      }
      
      // Basic calendar view
      return {
        success: true,
        message: `ปฏิทินการจองห้อง ${room.room_name}`,
        room: {
          room_id: room.room_id,
          room_name: room.room_name,
          department: room.department
        },
        calendar: {
          month: startDate.getMonth() + 1,
          year: startDate.getFullYear(),
          reservations: reservations
        }
      }
      
    } catch (error) {
      console.error('❌ Error fetching calendar:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงปฏิทิน'
      }
    }
  })

// ===================================================================
// Protected User Reservation APIs (ต้อง auth)
// ===================================================================
export const userReservationRoutes = new Elysia({ prefix: '/protected/reservations' })
  
  // จองห้องประชุม (4.2.5)
  .post('/', async ({ request, body, set }) => {
    // ตรวจสอบสิทธิ์ user
    const user = await authMiddleware(request, set)
    if (user.success === false) return user
    
    if (!isUser(user)) {
      set.status = 403
      return {
        success: false,
        message: 'ไม่มีสิทธิ์ในการจองห้องประชุม'
      }
    }

    try {
      // ตรวจสอบข้อมูลที่จำเป็น
      const { room_id, start_at, end_at, start_time, end_time, details_r } = body

      if (!room_id || !start_at || !end_at || !start_time || !end_time || !details_r) {
        set.status = 400
        return {
          success: false,
          message: 'กรุณากรอกข้อมูลให้ครบถ้วน: ห้อง, วันที่, เวลา, รายละเอียด'
        }
      }

      // ตรวจสอบห้องประชุมที่มีอยู่
      const room = await prisma.meeting_room.findUnique({
        where: { room_id: parseInt(room_id) }
      })

      if (!room) {
        set.status = 404
        return {
          success: false,
          message: 'ไม่พบห้องประชุมที่ต้องการ'
        }
      }

      // แปลงวันที่และเวลา
      const startDate = new Date(start_at)
      const endDate = new Date(end_at)
      const startTime = new Date(start_time)
      const endTime = new Date(end_time)

      // ตรวจสอบ logic วันที่และเวลา
      if (startDate > endDate) {
        set.status = 400
        return {
          success: false,
          message: 'วันเริ่มต้องไม่เกินวันสิ้นสุด'
        }
      }

      if (startTime >= endTime) {
        set.status = 400
        return {
          success: false,
          message: 'เวลาเริ่มต้องน้อยกว่าเวลาสิ้นสุด'
        }
      }

      // ตรวจสอบช่วงเวลาทำงาน (หลีกเลี่ยงช่วงพักเที่ยง)
      const startHour = startTime.getHours()
      const endHour = endTime.getHours()
      
      if (startHour < 6 || endHour > 18) {
        set.status = 400
        return {
          success: false,
          message: 'เวลาทำการ: 06:00-18:00 เท่านั้น'
        }
      }

      // เช็คว่าไม่จองข้ามช่วงพักเที่ยง (12:00-13:00)
      if (startHour < 12 && endHour > 13) {
        set.status = 400
        return {
          success: false,
          message: 'ไม่สามารถจองข้ามช่วงพักเที่ยง (12:00-13:00) กรุณาแยกจองเป็นช่วงเช้าและบ่าย'
        }
      }

      // เช็คว่าไม่จองในช่วงพักเที่ยง
      if ((startHour >= 12 && startHour < 13) || (endHour > 12 && endHour <= 13)) {
        set.status = 400
        return {
          success: false,
          message: 'ช่วงเวลา 12:00-13:00 เป็นเวลาพักเที่ยง ไม่สามารถจองได้'
        }
      }

      // ตรวจสอบการจองที่ซ้อนทับ (Fixed Logic)
      // การซ้อนทับจะเกิดขึ้นเมื่อ: (start1 < end2) AND (start2 < end1)
      const conflictReservations = await prisma.reservation.findMany({
        where: {
          room_id: parseInt(room_id),
          status_r: {
            in: ['pending', 'approved'] // ไม่นับ rejected
          },
          AND: [
            // ช่วงวันที่ต้องซ้อนทับกัน: (startNew < endExisting) AND (startExisting < endNew)
            { start_at: { lt: endDate } },   // startExisting < endNew
            { end_at: { gt: startDate } }    // endExisting > startNew
          ]
        }
      })

      // ตรวจสอบ time conflict ละเอียดสำหรับการจองที่มีวันซ้อนทับ (Fixed Advanced Logic)
      const hasTimeConflict = conflictReservations.some(existing => {
        const existingStartDate = new Date(existing.start_at)
        const existingEndDate = new Date(existing.end_at)
        const existingStartTime = new Date(existing.start_time)
        const existingEndTime = new Date(existing.end_time)

        // หาช่วงวันที่ที่ทับซ้อนกัน
        const overlapStart = new Date(Math.max(startDate.getTime(), existingStartDate.getTime()))
        const overlapEnd = new Date(Math.min(endDate.getTime(), existingEndDate.getTime()))

        // วนเช็คทุกวันที่ทับซ้อนกัน
        let currentDate = new Date(overlapStart)
        while (currentDate <= overlapEnd) {
          // เวลาที่ใช้สำหรับการจองเก่าในวันนี้
          let dayExistingStartTime, dayExistingEndTime
          
          if (currentDate.getTime() === existingStartDate.getTime() && currentDate.getTime() === existingEndDate.getTime()) {
            // Single day booking - ใช้เวลาตามที่ระบุ
            dayExistingStartTime = existingStartTime
            dayExistingEndTime = existingEndTime
          } else if (currentDate.getTime() === existingEndDate.getTime()) {
            // วันสุดท้ายของ multi-day booking - ใช้ start_time ถึง end_time
            // ตามที่คุณอธิบาย: วันสุดท้ายใช้เวลาจาก start_time ถึง end_time เท่านั้น
            dayExistingStartTime = existingStartTime
            dayExistingEndTime = existingEndTime
          } else {
            // วันแรกและวันกลางของ multi-day booking - ใช้เต็มวัน
            // ตามที่คุณอธิบาย: วันแรกและวันกลางใช้ start_time ตลอดวัน (สมมติถึง 18:00)
            dayExistingStartTime = existingStartTime
            dayExistingEndTime = new Date(existingStartTime.getTime())
            dayExistingEndTime.setHours(18, 0, 0, 0) // สิ้นสุดวันทำงาน 18:00
          }

          // เวลาที่ใช้สำหรับการจองใหม่ในวันนี้
          let dayNewStartTime, dayNewEndTime
          
          if (currentDate.getTime() === startDate.getTime() && currentDate.getTime() === endDate.getTime()) {
            // Single day booking ใหม่
            dayNewStartTime = startTime
            dayNewEndTime = endTime
          } else if (currentDate.getTime() === endDate.getTime()) {
            // วันสุดท้ายของการจองใหม่ - ใช้ start_time ถึง end_time
            dayNewStartTime = startTime
            dayNewEndTime = endTime
          } else {
            // วันแรกและวันกลางของการจองใหม่ - ใช้เต็มวัน
            dayNewStartTime = startTime
            dayNewEndTime = new Date(startTime.getTime())
            dayNewEndTime.setHours(18, 0, 0, 0) // สิ้นสุดวันทำงาน 18:00
          }

          // เช็ค time overlap ในวันนี้
          const newStartMinutes = dayNewStartTime.getHours() * 60 + dayNewStartTime.getMinutes()
          const newEndMinutes = dayNewEndTime.getHours() * 60 + dayNewEndTime.getMinutes()
          const existingStartMinutes = dayExistingStartTime.getHours() * 60 + dayExistingStartTime.getMinutes()
          const existingEndMinutes = dayExistingEndTime.getHours() * 60 + dayExistingEndTime.getMinutes()

          // Time slots overlap if: (start1 < end2) AND (start2 < end1)
          const hasTimeOverlapToday = (newStartMinutes < existingEndMinutes) && (existingStartMinutes < newEndMinutes)
          
          if (hasTimeOverlapToday) {
            console.log(`⚠️  Time conflict detected on ${currentDate.toDateString()}:`)
            console.log(`   Existing: ${dayExistingStartTime.toTimeString().slice(0,5)}-${dayExistingEndTime.toTimeString().slice(0,5)}`)
            console.log(`   New: ${dayNewStartTime.toTimeString().slice(0,5)}-${dayNewEndTime.toTimeString().slice(0,5)}`)
            return true
          }

          // ไปวันถัดไป
          currentDate.setDate(currentDate.getDate() + 1)
        }

        // ไม่มี conflict ในทุกวันที่เช็ค
        return false
      })

      if (hasTimeConflict) {
        set.status = 409
        return {
          success: false,
          message: 'ช่วงเวลาที่เลือกมีการจองอยู่แล้ว กรุณาเลือกเวลาอื่น',
          conflicts: conflictReservations.map(r => ({
            reservation_id: r.reservation_id,
            start_at: r.start_at,
            end_at: r.end_at,
            start_time: r.start_time,
            end_time: r.end_time,
            status: r.status_r,
            details: r.details_r
          }))
        }
      }

      // สร้างการจองใหม่
      const newReservation = await prisma.reservation.create({
        data: {
          user_id: user.user_id,
          room_id: parseInt(room_id),
          start_at: startDate,
          end_at: endDate,
          start_time: startTime,
          end_time: endTime,
          details_r: details_r.trim(),
          status_r: 'pending' // รอการอนุมัติ
        },
        include: {
          meeting_room: {
            select: {
              room_name: true,
              department: true
            }
          }
        }
      })

      console.log(`✅ สร้างการจองใหม่: ${user.first_name} จอง ${room.room_name}`)

      return {
        success: true,
        message: 'จองห้องประชุมสำเร็จ รอการอนุมัติจากเจ้าหน้าที่',
        reservation: {
          reservation_id: newReservation.reservation_id,
          room_name: newReservation.meeting_room.room_name,
          department: newReservation.meeting_room.department,
          start_at: newReservation.start_at,
          end_at: newReservation.end_at,
          start_time: newReservation.start_time,
          end_time: newReservation.end_time,
          details: newReservation.details_r,
          status: newReservation.status_r,
          created_at: newReservation.created_at
        }
      }

    } catch (error) {
      console.error('❌ Error creating reservation:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการจองห้องประชุม'
      }
    }
  })

  // ดูการจองของตัวเอง
  .get('/', async ({ request, query, set }) => {
    // ตรวจสอบสิทธิ์ user
    const user = await authMiddleware(request, set)
    if (user.success === false) return user
    
    if (!isUser(user)) {
      set.status = 403
      return {
        success: false,
        message: 'ไม่มีสิทธิ์ในการดูการจอง'
      }
    }

    try {
      const { status, limit = 10, offset = 0 } = query
      
      // สร้าง filter conditions
      const where = {
        user_id: user.user_id
      }
      
      if (status) {
        where.status_r = status
      }

      // ดึงการจองทั้งหมดของ user
      const reservations = await prisma.reservation.findMany({
        where,
        include: {
          meeting_room: {
            select: {
              room_name: true,
              department: true,
              location_m: true
            }
          },
          officer: {
            select: {
              first_name: true,
              last_name: true
            }
          }
        },
        orderBy: { created_at: 'desc' },
        take: parseInt(limit),
        skip: parseInt(offset)
      })

      // นับจำนวนทั้งหมด
      const total = await prisma.reservation.count({ where })

      return {
        success: true,
        message: `การจองของ ${user.first_name} ${user.last_name}`,
        reservations: reservations.map(r => ({
          reservation_id: r.reservation_id,
          room_name: r.meeting_room?.room_name,
          department: r.meeting_room?.department,
          location: r.meeting_room?.location_m,
          start_at: r.start_at,
          end_at: r.end_at,
          start_time: r.start_time,
          end_time: r.end_time,
          details: r.details_r,
          status: r.status_r,
          approved_by: r.officer ? `${r.officer.first_name} ${r.officer.last_name}` : null,
          created_at: r.created_at,
          updated_at: r.updated_at
        })),
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          has_more: total > (parseInt(offset) + parseInt(limit))
        }
      }

    } catch (error) {
      console.error('❌ Error fetching user reservations:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงข้อมูลการจอง'
      }
    }
  })

  // ดูรายละเอียดการจองเฉพาะ
  .get('/:id', async ({ request, params, set }) => {
    // ตรวจสอบสิทธิ์ user
    const user = await authMiddleware(request, set)
    if (user.success === false) return user
    
    if (!isUser(user)) {
      set.status = 403
      return {
        success: false,
        message: 'ไม่มีสิทธิ์ในการดูการจอง'
      }
    }

    try {
      const { id } = params

      const reservation = await prisma.reservation.findUnique({
        where: { 
          reservation_id: parseInt(id)
        },
        include: {
          meeting_room: {
            select: {
              room_name: true,
              department: true,
              location_m: true,
              capacity: true
            }
          },
          officer: {
            select: {
              first_name: true,
              last_name: true,
              department: true
            }
          }
        }
      })

      if (!reservation) {
        set.status = 404
        return {
          success: false,
          message: 'ไม่พบการจองที่ต้องการ'
        }
      }

      // ตรวจสอบว่าเป็นการจองของ user นี้หรือไม่
      if (reservation.user_id !== user.user_id) {
        set.status = 403
        return {
          success: false,
          message: 'ไม่มีสิทธิ์ดูการจองของผู้อื่น'
        }
      }

      return {
        success: true,
        message: 'รายละเอียดการจอง',
        reservation: {
          reservation_id: reservation.reservation_id,
          room: {
            room_name: reservation.meeting_room?.room_name,
            department: reservation.meeting_room?.department,
            location: reservation.meeting_room?.location_m,
            capacity: reservation.meeting_room?.capacity
          },
          booking_details: {
            start_at: reservation.start_at,
            end_at: reservation.end_at,
            start_time: reservation.start_time,
            end_time: reservation.end_time,
            details: reservation.details_r,
            status: reservation.status_r
          },
          approval: {
            approved_by: reservation.officer ? 
              `${reservation.officer.first_name} ${reservation.officer.last_name}` : null,
            officer_department: reservation.officer?.department
          },
          timestamps: {
            created_at: reservation.created_at,
            updated_at: reservation.updated_at
          }
        }
      }

    } catch (error) {
      console.error('❌ Error fetching reservation details:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงรายละเอียดการจอง'
      }
    }
  })

  // แก้ไขการจอง (ก่อนอนุมัติเท่านั้น)
  .put('/:id', async ({ request, params, body, set }) => {
    // ตรวจสอบสิทธิ์ user
    const user = await authMiddleware(request, set)
    if (user.success === false) return user
    
    if (!isUser(user)) {
      set.status = 403
      return {
        success: false,
        message: 'ไม่มีสิทธิ์ในการแก้ไขการจอง'
      }
    }

    try {
      const { id } = params
      const { start_at, end_at, start_time, end_time, details_r } = body

      // ตรวจสอบการจองที่มีอยู่
      const existingReservation = await prisma.reservation.findUnique({
        where: { reservation_id: parseInt(id) },
        include: {
          meeting_room: {
            select: {
              room_name: true
            }
          }
        }
      })

      if (!existingReservation) {
        set.status = 404
        return {
          success: false,
          message: 'ไม่พบการจองที่ต้องการ'
        }
      }

      // ตรวจสอบสิทธิ์เจ้าของ
      if (existingReservation.user_id !== user.user_id) {
        set.status = 403
        return {
          success: false,
          message: 'ไม่สามารถแก้ไขการจองของผู้อื่นได้'
        }
      }

      // ตรวจสอบสถานะ - แก้ไขได้เฉพาะ pending
      if (existingReservation.status_r !== 'pending') {
        set.status = 400
        return {
          success: false,
          message: `ไม่สามารถแก้ไขการจองที่มีสถานะ ${existingReservation.status_r} ได้`,
          current_status: existingReservation.status_r
        }
      }

      // ตรวจสอบข้อมูลใหม่
      if (!start_at || !end_at || !start_time || !end_time || !details_r) {
        set.status = 400
        return {
          success: false,
          message: 'กรุณากรอกข้อมูลให้ครบถ้วน'
        }
      }

      // แปลงวันที่และเวลา
      const startDate = new Date(start_at)
      const endDate = new Date(end_at)
      const startTime = new Date(start_time)
      const endTime = new Date(end_time)

      // ตรวจสอบ logic วันที่และเวลา
      if (startDate > endDate) {
        set.status = 400
        return {
          success: false,
          message: 'วันเริ่มต้องไม่เกินวันสิ้นสุด'
        }
      }

      if (startTime >= endTime) {
        set.status = 400
        return {
          success: false,
          message: 'เวลาเริ่มต้องน้อยกว่าเวลาสิ้นสุด'
        }
      }

      // ตรวจสอบการจองที่ซ้อนทับ (ยกเว้นการจองปัจจุบัน)
      const conflictReservations = await prisma.reservation.findMany({
        where: {
          room_id: existingReservation.room_id,
          reservation_id: {
            not: parseInt(id) // ยกเว้นการจองปัจจุบัน
          },
          status_r: {
            in: ['pending', 'approved']
          },
          OR: [
            {
              AND: [
                { start_at: { lte: endDate } },
                { end_at: { gte: startDate } }
              ]
            }
          ]
        }
      })

      if (conflictReservations.length > 0) {
        set.status = 409
        return {
          success: false,
          message: 'ช่วงเวลาใหม่ที่เลือกมีการจองอยู่แล้ว กรุณาเลือกเวลาอื่น'
        }
      }

      // อัปเดตการจอง
      const updatedReservation = await prisma.reservation.update({
        where: { reservation_id: parseInt(id) },
        data: {
          start_at: startDate,
          end_at: endDate,
          start_time: startTime,
          end_time: endTime,
          details_r: details_r.trim(),
          updated_at: new Date()
        },
        include: {
          meeting_room: {
            select: {
              room_name: true,
              department: true
            }
          }
        }
      })

      console.log(`✅ แก้ไขการจอง: ${user.first_name} แก้ไขการจอง ${existingReservation.meeting_room.room_name}`)

      return {
        success: true,
        message: 'แก้ไขการจองสำเร็จ',
        reservation: {
          reservation_id: updatedReservation.reservation_id,
          room_name: updatedReservation.meeting_room.room_name,
          department: updatedReservation.meeting_room.department,
          start_at: updatedReservation.start_at,
          end_at: updatedReservation.end_at,
          start_time: updatedReservation.start_time,
          end_time: updatedReservation.end_time,
          details: updatedReservation.details_r,
          status: updatedReservation.status_r,
          updated_at: updatedReservation.updated_at
        }
      }

    } catch (error) {
      console.error('❌ Error updating reservation:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการแก้ไขการจอง'
      }
    }
  })

  // ยกเลิกการจองของตนเอง (4.2.6)
  .delete('/:id', async ({ request, params, set }) => {
    // ตรวจสอบสิทธิ์ user
    const user = await authMiddleware(request, set)
    if (user.success === false) return user
    
    if (!isUser(user)) {
      set.status = 403
      return {
        success: false,
        message: 'ไม่มีสิทธิ์ในการยกเลิกการจอง'
      }
    }

    try {
      const { id } = params

      // ตรวจสอบการจองที่มีอยู่
      const existingReservation = await prisma.reservation.findUnique({
        where: { reservation_id: parseInt(id) },
        include: {
          meeting_room: {
            select: {
              room_name: true
            }
          }
        }
      })

      if (!existingReservation) {
        set.status = 404
        return {
          success: false,
          message: 'ไม่พบการจองที่ต้องการ'
        }
      }

      // ตรวจสอบสิทธิ์เจ้าของ
      if (existingReservation.user_id !== user.user_id) {
        set.status = 403
        return {
          success: false,
          message: 'ไม่สามารถยกเลิกการจองของผู้อื่นได้'
        }
      }

      // ตรวจสอบสถานะ - ยกเลิกได้เฉพาะ pending และ approved
      if (existingReservation.status_r === 'rejected') {
        set.status = 400
        return {
          success: false,
          message: 'ไม่สามารถยกเลิกการจองที่ถูกปฏิเสธแล้วได้'
        }
      }

      // ลบการจอง
      await prisma.reservation.delete({
        where: { reservation_id: parseInt(id) }
      })

      console.log(`✅ ยกเลิกการจอง: ${user.first_name} ยกเลิกการจอง ${existingReservation.meeting_room.room_name}`)

      return {
        success: true,
        message: 'ยกเลิกการจองสำเร็จ',
        cancelled_reservation: {
          reservation_id: existingReservation.reservation_id,
          room_name: existingReservation.meeting_room.room_name,
          start_at: existingReservation.start_at,
          end_at: existingReservation.end_at,
          previous_status: existingReservation.status_r
        }
      }

    } catch (error) {
      console.error('❌ Error cancelling reservation:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการยกเลิกการจอง'
      }
    }
  })

// ===================================================================
// Officer Reservation Management APIs (เฉพาะเจ้าหน้าที่)
// ===================================================================
export const officerReservationRoutes = new Elysia({ prefix: '/protected/officer/reservations' })
  
  // ดูการจองที่รออนุมัติ (ในคณะตัวเอง)
  .get('/', async ({ request, query, set }) => {
    // ตรวจสอบสิทธิ์ officer
    const user = await authMiddleware(request, set)
    if (user.success === false) return user
    
    if (!isOfficer(user)) {
      set.status = 403
      return {
        success: false,
        message: 'การเข้าถึงจำกัดเฉพาะเจ้าหน้าที่เท่านั้น'
      }
    }

    try {
      const { status = 'pending', limit = 20, offset = 0 } = query
      
      // ดึงการจองในคณะตัวเอง
      const where = {
        meeting_room: {
          department: user.department
        }
      }
      
      if (status) {
        where.status_r = status
      }

      const reservations = await prisma.reservation.findMany({
        where,
        include: {
          users: {
            select: {
              first_name: true,
              last_name: true,
              email: true,
              department: true
            }
          },
          meeting_room: {
            select: {
              room_name: true,
              location_m: true,
              capacity: true
            }
          },
          officer: {
            select: {
              first_name: true,
              last_name: true
            }
          }
        },
        orderBy: { created_at: 'asc' },
        take: parseInt(limit),
        skip: parseInt(offset)
      })

      const total = await prisma.reservation.count({ where })

      return {
        success: true,
        message: `การจองในคณะ ${user.department} (${reservations.length} รายการ)`,
        department: user.department,
        reservations: reservations.map(r => ({
          reservation_id: r.reservation_id,
          room_name: r.meeting_room.room_name,
          location: r.meeting_room.location_m,
          capacity: r.meeting_room.capacity,
          start_date: r.start_at,
          end_date: r.end_at,
          start_time: r.start_time,
          end_time: r.end_time,
          details: r.details_r,
          status: r.status_r,
          reserved_by: `${r.users.first_name} ${r.users.last_name}`,
          user_email: r.users.email,
          user_department: r.users.department,
          processed_by: r.officer ? `${r.officer.first_name} ${r.officer.last_name}` : null,
          created_at: r.created_at,
          updated_at: r.updated_at
        })),
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          has_more: total > (parseInt(offset) + parseInt(limit))
        }
      }

    } catch (error) {
      console.error('❌ Error fetching officer reservations:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงข้อมูลการจอง'
      }
    }
  })

  // อนุมัติการจอง
  .put('/:id/approve', async ({ request, params, body, set }) => {
    // ตรวจสอบสิทธิ์ officer
    const user = await authMiddleware(request, set)
    if (user.success === false) return user
    
    if (!isOfficer(user)) {
      set.status = 403
      return {
        success: false,
        message: 'การเข้าถึงจำกัดเฉพาะเจ้าหน้าที่เท่านั้น'
      }
    }

    try {
      const reservationId = parseInt(params.id)
      const { note } = body

      // ตรวจสอบการจองที่มีอยู่
      const reservation = await prisma.reservation.findUnique({
        where: { reservation_id: reservationId },
        include: {
          meeting_room: {
            select: {
              room_name: true,
              department: true
            }
          },
          users: {
            select: {
              first_name: true,
              last_name: true,
              email: true
            }
          }
        }
      })

      if (!reservation) {
        set.status = 404
        return {
          success: false,
          message: 'ไม่พบการจองที่ระบุ'
        }
      }

      // ตรวจสอบว่าห้องอยู่ในคณะตัวเอง
      if (reservation.meeting_room.department !== user.department) {
        set.status = 403
        return {
          success: false,
          message: 'คุณไม่มีสิทธิ์อนุมัติการจองในคณะอื่น'
        }
      }

      // ตรวจสอบสถานะ
      if (reservation.status_r !== 'pending') {
        set.status = 400
        return {
          success: false,
          message: `การจองนี้มีสถานะ ${reservation.status_r} แล้ว ไม่สามารถอนุมัติได้`
        }
      }

      // อนุมัติการจอง
      const updatedReservation = await prisma.reservation.update({
        where: { reservation_id: reservationId },
        data: {
          status_r: 'approved',
          officer_id: user.user_id,
          details_r: note ? `${reservation.details_r}\n\nหมายเหตุจากเจ้าหน้าที่: ${note}` : reservation.details_r,
          updated_at: new Date()
        },
        include: {
          meeting_room: {
            select: {
              room_name: true,
              location_m: true
            }
          }
        }
      })

      console.log(`✅ อนุมัติการจอง: ${user.first_name} อนุมัติการจอง ${reservation.meeting_room.room_name}`)

      return {
        success: true,
        message: 'อนุมัติการจองสำเร็จ',
        reservation: {
          reservation_id: updatedReservation.reservation_id,
          room_name: updatedReservation.meeting_room.room_name,
          location: updatedReservation.meeting_room.location_m,
          start_date: updatedReservation.start_at,
          end_date: updatedReservation.end_at,
          start_time: updatedReservation.start_time,
          end_time: updatedReservation.end_time,
          details: updatedReservation.details_r,
          status: updatedReservation.status_r,
          approved_by: `${user.first_name} ${user.last_name}`,
          updated_at: updatedReservation.updated_at
        },
        notification: {
          user_name: `${reservation.users.first_name} ${reservation.users.last_name}`,
          user_email: reservation.users.email
        }
      }

    } catch (error) {
      console.error('❌ Error approving reservation:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการอนุมัติการจอง'
      }
    }
  })

  // ปฏิเสธการจอง
  .put('/:id/reject', async ({ request, params, body, set }) => {
    // ตรวจสอบสิทธิ์ officer
    const user = await authMiddleware(request, set)
    if (user.success === false) return user
    
    if (!isOfficer(user)) {
      set.status = 403
      return {
        success: false,
        message: 'การเข้าถึงจำกัดเฉพาะเจ้าหน้าที่เท่านั้น'
      }
    }

    try {
      const reservationId = parseInt(params.id)
      const { reason } = body

      if (!reason || reason.trim() === '') {
        set.status = 400
        return {
          success: false,
          message: 'กรุณาระบุเหตุผลในการปฏิเสธ'
        }
      }

      // ตรวจสอบการจองที่มีอยู่
      const reservation = await prisma.reservation.findUnique({
        where: { reservation_id: reservationId },
        include: {
          meeting_room: {
            select: {
              room_name: true,
              department: true
            }
          },
          users: {
            select: {
              first_name: true,
              last_name: true,
              email: true
            }
          }
        }
      })

      if (!reservation) {
        set.status = 404
        return {
          success: false,
          message: 'ไม่พบการจองที่ระบุ'
        }
      }

      // ตรวจสอบว่าห้องอยู่ในคณะตัวเอง
      if (reservation.meeting_room.department !== user.department) {
        set.status = 403
        return {
          success: false,
          message: 'คุณไม่มีสิทธิ์ปฏิเสธการจองในคณะอื่น'
        }
      }

      // ตรวจสอบสถานะ
      if (reservation.status_r !== 'pending') {
        set.status = 400
        return {
          success: false,
          message: `การจองนี้มีสถานะ ${reservation.status_r} แล้ว ไม่สามารถปฏิเสธได้`
        }
      }

      // ปฏิเสธการจอง
      const updatedReservation = await prisma.reservation.update({
        where: { reservation_id: reservationId },
        data: {
          status_r: 'rejected',
          officer_id: user.user_id,
          details_r: `${reservation.details_r}\n\nเหตุผลที่ปฏิเสธ: ${reason.trim()}`,
          updated_at: new Date()
        },
        include: {
          meeting_room: {
            select: {
              room_name: true,
              location_m: true
            }
          }
        }
      })

      console.log(`❌ ปฏิเสธการจอง: ${user.first_name} ปฏิเสธการจอง ${reservation.meeting_room.room_name}`)

      return {
        success: true,
        message: 'ปฏิเสธการจองสำเร็จ',
        reservation: {
          reservation_id: updatedReservation.reservation_id,
          room_name: updatedReservation.meeting_room.room_name,
          location: updatedReservation.meeting_room.location_m,
          start_date: updatedReservation.start_at,
          end_date: updatedReservation.end_at,
          status: updatedReservation.status_r,
          rejected_by: `${user.first_name} ${user.last_name}`,
          rejection_reason: reason.trim(),
          updated_at: updatedReservation.updated_at
        },
        notification: {
          user_name: `${reservation.users.first_name} ${reservation.users.last_name}`,
          user_email: reservation.users.email
        }
      }

    } catch (error) {
      console.error('❌ Error rejecting reservation:', error)
      set.status = 500
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการปฏิเสธการจอง'
      }
    }
  })
