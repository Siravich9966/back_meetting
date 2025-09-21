import prisma from './lib/prisma.js'

async function checkAllProfileImages() {
  try {
    console.log('🔍 ตรวจสอบข้อมูล profile_image ในทุกตาราง...\n');

    // 1. ตรวจสอบตาราง users
    const users = await prisma.users.findMany({
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        email: true,
        profile_image: true,
        roles: { select: { role_name: true } }
      }
    });

    // 2. ตรวจสอบตาราง admin
    const admins = await prisma.admin.findMany({
      select: {
        admin_id: true,
        first_name: true,
        last_name: true,
        email: true,
        profile_image: true,
        roles: { select: { role_name: true } }
      }
    });

    // 3. ตรวจสอบตาราง officer (ถ้ามี)
    let officers = [];
    try {
      officers = await prisma.officer.findMany({
        select: {
          officer_id: true,
          first_name: true,
          last_name: true,
          email: true,
          profile_image: true,
          roles: { select: { role_name: true } }
        }
      });
    } catch (e) {
      console.log('⚠️ ตาราง officer ไม่พบ');
    }

    // 4. ตรวจสอบตาราง executive (ถ้ามี)
    let executives = [];
    try {
      executives = await prisma.executive.findMany({
        select: {
          executive_id: true,
          first_name: true,
          last_name: true,
          email: true,
          profile_image: true,
          roles: { select: { role_name: true } }
        }
      });
    } catch (e) {
      console.log('⚠️ ตาราง executive ไม่พบ');
    }

    console.log('📊 สรุปสถิติทุกตาราง:');
    console.log(`👤 Users: ${users.length} คน`);
    console.log(`👨‍💼 Admins: ${admins.length} คน`);
    console.log(`👮 Officers: ${officers.length} คน`);
    console.log(`👔 Executives: ${executives.length} คน\n`);

    // แสดงข้อมูลที่มี profile_image
    console.log('🖼️ รายการที่มีรูปโปรไฟล์:\n');

    if (users.some(u => u.profile_image)) {
      console.log('👤 Users ที่มีรูป:');
      users.filter(u => u.profile_image).forEach(u => {
        console.log(`  - ${u.first_name} ${u.last_name} (${u.roles.role_name}): ${u.profile_image.length} bytes`);
      });
    } else {
      console.log('👤 Users: ไม่มีรูปโปรไฟล์');
    }

    if (admins.some(a => a.profile_image)) {
      console.log('👨‍💼 Admins ที่มีรูป:');
      admins.filter(a => a.profile_image).forEach(a => {
        console.log(`  - ${a.first_name} ${a.last_name} (${a.roles.role_name}): ${a.profile_image.length} bytes`);
      });
    } else {
      console.log('👨‍💼 Admins: ไม่มีรูปโปรไฟล์');
    }

    if (officers.some(o => o.profile_image)) {
      console.log('👮 Officers ที่มีรูป:');
      officers.filter(o => o.profile_image).forEach(o => {
        console.log(`  - ${o.first_name} ${o.last_name} (${o.roles.role_name}): ${o.profile_image.length} bytes`);
      });
    } else {
      console.log('👮 Officers: ไม่มีรูปโปรไฟล์');
    }

    if (executives.some(e => e.profile_image)) {
      console.log('👔 Executives ที่มีรูป:');
      executives.filter(e => e.profile_image).forEach(e => {
        console.log(`  - ${e.first_name} ${e.last_name} (${e.roles.role_name}): ${e.profile_image.length} bytes`);
      });
    } else {
      console.log('👔 Executives: ไม่มีรูปโปรไฟล์');
    }

    // นับรวม
    const totalWithImages = [
      ...users.filter(u => u.profile_image),
      ...admins.filter(a => a.profile_image),
      ...officers.filter(o => o.profile_image),
      ...executives.filter(e => e.profile_image)
    ].length;

    console.log(`\n🎯 สรุป: พบรูปโปรไฟล์ทั้งหมด ${totalWithImages} รายการ`);

  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAllProfileImages();