import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();

async function createTestReservation() {
  try {
    const currentTime = new Date();
    const startTime = new Date(currentTime.getTime() - 30 * 60 * 1000); // เริ่มต้น 30 นาทีที่แล้ว  
    const endTime = new Date(currentTime.getTime() + 30 * 60 * 1000);   // จบใน 30 นาทีข้างหน้า
    
    console.log('=== สร้างการจองทดสอบ ===');
    console.log('เวลาปัจจุบัน:', currentTime);
    console.log('เวลาเริ่ม:', startTime);
    console.log('เวลาจบ:', endTime);
    
    const reservation = await prisma.reservation.create({
      data: {
        room_id: 1,
        user_id: 1, // สมมติว่ามี user_id = 1
        start_at: startTime, // วันที่เริ่ม
        end_at: endTime,     // วันที่จบ
        start_time: startTime, // เวลาเริ่ม
        end_time: endTime,     // เวลาจบ
        status_r: 'approved',
        details_r: 'การจองทดสอบสำหรับ Real-time count'
      }
    });
    
    console.log('สร้างการจองเรียบร้อย:', reservation);
    
    // ทดสอบ query อีกครั้ง
    console.log('\n=== ทดสอบ Query อีกครั้ง ===');
    const activeReservations = await prisma.reservation.findMany({
      where: {
        room_id: 1,
        status_r: 'approved',
        start_time: { lte: currentTime },
        end_time: { gte: currentTime }
      }
    });
    
    console.log('การจองที่ active:', activeReservations.length);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestReservation();