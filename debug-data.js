import { PrismaClient } from './generated/prisma/client.js';
const prisma = new PrismaClient();

async function checkData() {
  try {
    const user = await prisma.user.findFirst({ where: { user_id: 72 } });
    console.log('User 72:', { id: user?.user_id, department: user?.department, role: user?.role });
    
    const rooms = await prisma.meeting_room.findMany({ take: 3 });
    console.log('Sample rooms:');
    rooms.forEach(room => {
      console.log(`Room ${room.room_id}: ${room.room_name} - ${room.department}`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
