import { PrismaClient } from './generated/prisma/client.js';

const prisma = new PrismaClient();

async function checkReservations() {
  try {
    console.log('🔍 ตรวจสอบการจองในห้อง ID 10, 12...\n');
    
    // เช็คการจองในห้อง 10 และ 12
    const roomIds = [10, 12];
    
    for (const roomId of roomIds) {
      console.log(`📋 ห้อง ID ${roomId}:`);
      
      // เช็คข้อมูลห้อง
      const room = await prisma.meeting_room.findUnique({
        where: { room_id: roomId }
      });
      
      if (room) {
        console.log(`  ✅ ห้อง: ${room.room_name} (${room.department})`);
        
        // เช็คการจองทั้งหมด
        const allReservations = await prisma.reservation.findMany({
          where: { room_id: roomId },
          include: {
            user: {
              select: { user_id: true, first_name: true, last_name: true }
            }
          }
        });
        
        console.log(`  📊 การจองทั้งหมด: ${allReservations.length} รายการ`);
        
        if (allReservations.length > 0) {
          allReservations.forEach((res, index) => {
            console.log(`    ${index + 1}. ID: ${res.reservation_id}, Status: ${res.status_r}, User: ${res.user.first_name} ${res.user.last_name}, Date: ${res.start_date}`);
          });
        }
        
        // เช็คการจองที่ยังไม่ถูกยกเลิก (ตามเงื่อนไขใน backend)
        const activeReservations = await prisma.reservation.findMany({
          where: { 
            room_id: roomId,
            status_r: { not: 'cancelled' }
          }
        });
        
        console.log(`  🔥 การจองที่ Active: ${activeReservations.length} รายการ`);
        
        if (activeReservations.length > 0) {
          activeReservations.forEach((res, index) => {
            console.log(`    ${index + 1}. ID: ${res.reservation_id}, Status: ${res.status_r}, Date: ${res.start_date}`);
          });
        }
      } else {
        console.log(`  ❌ ไม่พบห้อง ID ${roomId}`);
      }
      
      console.log('');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkReservations();
