import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkData() {
  try {
    // ดู user_id 72
    const user = await prisma.user.findFirst({ where: { user_id: 72 } });
    console.log('User 72:', { 
      id: user?.user_id, 
      department: user?.department, 
      role: user?.role 
    });
    
    // ดูห้องประชุมไม่กี่ห้อง
    const rooms = await prisma.meeting_room.findMany({ take: 3 });
    console.log('\nSample rooms:');
    rooms.forEach(room => {
      console.log(`Room ${room.room_id}: "${room.room_name}" - Department: "${room.department}"`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
