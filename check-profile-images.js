import prisma from './lib/prisma.js';

async function checkProfileImages() {
  try {
    console.log('🔍 ตรวจสอบข้อมูล profile_image ในตาราง users...\n');

    // ดูข้อมูลทั้งหมดใน users table
    const users = await prisma.users.findMany({
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        email: true,
        role_id: true,
        profile_image: true,
        created_at: true,
        updated_at: true,
        roles: {
          select: {
            role_name: true
          }
        }
      },
      orderBy: {
        user_id: 'asc'
      }
    });

    console.log(`พบ users ทั้งหมด ${users.length} คน\n`);

    // แสดงข้อมูลแต่ละคน
    users.forEach((user, index) => {
      console.log(`--- User ${index + 1} ---`);
      console.log(`ID: ${user.user_id}`);
      console.log(`Name: ${user.first_name} ${user.last_name}`);
      console.log(`Email: ${user.email}`);
      console.log(`Role: ${user.roles.role_name} (ID: ${user.role_id})`);
      console.log(`Profile Image: ${user.profile_image ? 'มี (ขนาด: ' + user.profile_image.length + ' bytes)' : 'null'}`);
      console.log(`Created: ${user.created_at}`);
      console.log(`Updated: ${user.updated_at}`);
      console.log('');
    });

    // สรุปสถิติ
    const usersWithImages = users.filter(u => u.profile_image !== null);
    const usersWithoutImages = users.filter(u => u.profile_image === null);

    console.log('📊 สรุปสถิติ:');
    console.log(`- Users ที่มีรูปโปรไฟล์: ${usersWithImages.length} คน`);
    console.log(`- Users ที่ไม่มีรูปโปรไฟล์ (null): ${usersWithoutImages.length} คน`);

    if (usersWithImages.length > 0) {
      console.log('\n👥 Users ที่มีรูปโปรไฟล์:');
      usersWithImages.forEach(u => {
        console.log(`  - ${u.first_name} ${u.last_name} (${u.roles.role_name}): ${u.profile_image.length} bytes`);
      });
    }

    if (usersWithoutImages.length > 0) {
      console.log('\n👤 Users ที่ไม่มีรูปโปรไฟล์:');
      usersWithoutImages.forEach(u => {
        console.log(`  - ${u.first_name} ${u.last_name} (${u.roles.role_name})`);
      });
    }

  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkProfileImages();