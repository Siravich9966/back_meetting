import { PrismaClient } from './generated/prisma/index.js';
const prisma = new PrismaClient();

async function checkUser() {
  try {
    const users = await prisma.user.findMany({
      where: {
        user_id: {
          in: [1, 4]
        }
      },
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        department: true,
        position: true,
        role: true
      }
    });
    
    console.log('Users data:');
    users.forEach(user => {
      console.log(`User ${user.user_id} (${user.role}):`, {
        name: `${user.first_name} ${user.last_name}`,
        department: user.department || '(empty)',
        position: user.position || '(empty)'
      });
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser();