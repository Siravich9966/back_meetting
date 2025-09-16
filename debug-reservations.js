import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();

async function checkReservations() {
  try {
    console.log('=== ตรวจสอบข้อมูลการจอง ===');
    
    // ดูข้อมูลการจองทั้งหมด
    const reservations = await prisma.reservation.findMany({
      take: 10,
      select: {
        reservation_id: true,
        room_id: true,
        start_at: true,
        end_at: true, 
        start_time: true,
        end_time: true,
        status_r: true,
        user_id: true
      }
    });
    
    console.log('จำนวนการจองทั้งหมด:', reservations.length);
    console.log('ตัวอย่างข้อมูลการจอง:');
    reservations.forEach(res => {
      console.log(`- ID: ${res.reservation_id}, Room: ${res.room_id}, Status: ${res.status_r}`);
      console.log(`  Start: ${res.start_at} ${res.start_time}`);
      console.log(`  End: ${res.end_at} ${res.end_time}`);
      console.log('');
    });

    // ทดสอบ query ที่ใช้ในจริง
    console.log('=== ทดสอบ Query สำหรับห้อง ID 1 ===');
    const currentTime = new Date();
    console.log('เวลาปัจจุบัน:', currentTime);
    
    const currentReservations = await prisma.reservation.findMany({
      where: {
        room_id: 1,
        status_r: 'approved',
        start_time: { lte: currentTime },
        end_time: { gte: currentTime }
      },
      select: {
        reservation_id: true,
        user_id: true,
        start_time: true,
        end_time: true,
        status_r: true
      }
    });
    
    console.log('การจองที่ active ปัจจุบันสำหรับห้อง 1:', currentReservations);
    console.log('จำนวนคนใช้งานห้อง 1:', currentReservations.length);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkReservations();