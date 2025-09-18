# 🗺️ Address Data Setup Guide

## สำหรับคนใหม่ที่ git pull โค้ดมา หรือย้าย database

### 🎯 **วิธีรันเพื่อสร้างข้อมูลที่อยู่ไทยครบ 77 จังหวัด**

1. **ตรวจสอบให้แน่ใจว่ามี database connection**:
   ```bash
   # ใน backend folder
   cd backend
   
   # ตรวจสอบว่า .env มี DATABASE_URL
   # DATABASE_URL="postgresql://user:password@localhost:5432/meetingroom_db"
   ```

2. **รัน Prisma migration** (ถ้ายังไม่ได้รัน):
   ```bash
   bunx prisma migrate dev
   ```

3. **รันสคริปต์สร้างข้อมูลที่อยู่**:
   ```bash
   bun setup-address-data.js
   ```

4. **รอให้เสร็จ** (ประมาณ 2-5 นาที ขึ้นอยู่กับความเร็วเน็ต):
   - จะได้ข้อมูล 77 จังหวัด
   - 928 อำเภอ
   - 7,436 ตำบล
   - พร้อม zip code

### 🚨 **ข้อควรระวัง**

- **ถ้ามีข้อมูลแล้ว**: สคริปต์จะถามก่อนเขียนทับ (รอ 5 วินาที)
- **ถ้าไม่อยากลบ**: กด `Ctrl+C` เพื่อยกเลิก
- **ต้องมีเน็ต**: ดึงข้อมูลจาก GitHub API

### 📊 **ผลลัพธ์ที่ได้**

หลังรันเสร็จจะได้:
- ✅ ตาราง `Province` - 77 จังหวัด
- ✅ ตาราง `District` - 928 อำเภอ  
- ✅ ตาราง `Subdistrict` - 7,436 ตำบล
- ✅ Address Selection ใน registration form ใช้ได้เลย

### 🔧 **ทดสอบว่าข้อมูลถูกต้อง**

```bash
# ตรวจสอบจำนวนข้อมูล
bunx prisma studio

# หรือใน code
bun test-address-api.js  # ถ้ามีไฟล์ test
```

### 🌐 **สำหรับ Production/Online Database**

1. **เปลี่ยน DATABASE_URL** ใน `.env`:
   ```
   DATABASE_URL="postgresql://user:pass@your-server/dbname"
   ```

2. **รัน migration บน production**:
   ```bash
   bunx prisma migrate deploy
   ```

3. **รันสคริปต์เดียวกัน**:
   ```bash
   bun setup-address-data.js
   ```

### ❓ **ถ้าเกิดปัญหา**

1. **Database connection error**: เช็ค `.env` และ database server
2. **API error**: เช็คอินเตอร์เน็ต หรือ GitHub ทำงานปกติไหม
3. **Permission error**: ตรวจสอบ database permissions
4. **Memory error**: ลอง restart database server

---

**💡 Tip**: ไฟล์นี้รันได้หลายครั้ง ไม่เป็นไร จะเขียนทับข้อมูลเดิม