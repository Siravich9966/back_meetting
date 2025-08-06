# 📋 สรุปหน้าสมัครสมาชิก - สำหรับ AI Frontend
## 🔥 ข้อมูลครบถ้วนสำหรับสร้างหน้า Register

---

## 🎯 ภาพรวมการสมัครสมาชิก

### Flow การสมัคร
1. **กรอกข้อมูลส่วนตัว** - ชื่อ นามสกุล อีเมล รหัสผ่าน เลขบัตรประชาชน
2. **เลือกตำแหน่ง** - หน้าที่ที่ทำในมหาวิทยาลัย 
3. **เลือกหน่วยงาน** - สังกัดหน่วยงานไหน (แสดงตามตำแหน่ง)
4. **ระบบจะจัด User ไปตารางที่เหมาะสม** - ตาม position และ role

---

## 📝 ฟิลด์ที่ต้องมีในฟอร์ม

### 1. ข้อมูลส่วนตัว (บังคับทุกฟิลด์)
```javascript
const personalInfo = {
  first_name: {
    type: 'text',
    label: 'ชื่อจริง',
    placeholder: 'ชื่อจริง',
    required: true,
    validation: 'ไม่ว่าง'
  },
  
  last_name: {
    type: 'text', 
    label: 'นามสกุล',
    placeholder: 'นามสกุล',
    required: true,
    validation: 'ไม่ว่าง'
  },
  
  email: {
    type: 'email',
    label: 'อีเมล',
    placeholder: 'example@example.com',
    required: true,
    validation: 'รูปแบบอีเมลถูกต้อง + ไม่เกิน 255 ตัวอักษร'
  },
  
  password: {
    type: 'password',
    label: 'รหัสผ่าน',  
    placeholder: 'อย่างน้อย 8 ตัวอักษร',
    required: true,
    validation: 'อย่างน้อย 8 ตัวอักษร + มีตัวอักษรและตัวเลข'
  },
  
  citizen_id: {
    type: 'text',
    label: 'เลขบัตรประชาชน',
    placeholder: 'เลขบัตรประชาชน 13 หลัก',
    required: true,
    pattern: '^[0-9]{13}$',
    validation: 'ตัวเลข 13 หลักเท่านั้น'
  },
  
  zip_code: {
    type: 'text',
    label: 'รหัสไปรษณีย์',
    placeholder: 'รหัสไปรษณีย์ 5 หลัก',
    required: false,
    pattern: '^[0-9]{5}$'
  }
}
```

### 2. ตำแหน่ง (Position) - หน้าที่ที่ทำ
```javascript
const positions = {
  // กลุ่มบุคลากรทั่วไป → ไปตาราง users (role: user)
  general: {
    label: 'บุคลากรทั่วไป',
    options: [
      'บุคลากร/อาจารย์ มหาวิทยาลัยราชภัฏมหาสารคาม'
    ]
  },
  
  // กลุ่มผู้บริหาร → ไปตาราง executive (role: executive)
  executives: {
    label: 'ผู้บริหาร',
    options: [
      'ผู้บริหารระดับมหาวิทยาลัย',
      'ผู้บริหารคณะวิทยาศาสตร์และเทคโนโลยี',
      'ผู้บริหารคณะครุศาสตร์',
      'ผู้บริหารคณะวิทยาการจัดการ',
      'ผู้บริหารคณะมนุษยศาสตร์และสังคมศาสตร์',
      'ผู้บริหารคณะเทคโนโลยีการเกษตร',
      'ผู้บริหารคณะเทคโนโลยีสารสนเทศ',
      'ผู้บริหารคณะรัฐศาสตร์และรัฐประศาสนศาสตร์',
      'ผู้บริหารคณะนิติศาสตร์',
      'ผู้บริหารคณะวิศวกรรมศาสตร์'
    ]
  },
  
  // กลุ่มเจ้าหน้าที่ → ไปตาราง officer (role: officer)
  officers: {
    label: 'เจ้าหน้าที่ดูแลห้องประชุม',
    options: [
      // เจ้าหน้าที่ระดับมหาวิทยาลัย (ไม่ผูกคณะ)
      'เจ้าหน้าที่ดูแลห้องประชุมอาคารประชุม 72 พรรษา มหาราชินี',
      'เจ้าหน้าที่ดูแลห้องประชุมหอประชุมใหญ่ / หอประชุมเฉลิมพระเกียรติ 80 พรรษา',
      'เจ้าหน้าที่ดูแลห้องประชุมอาคาร 34 อาคารเฉลิมพระเกียรติฉลองสิริราชสมบัติครบ 60 ปี(อาคาร 34 คณะวิทยาการจัดการ)',
      
      // เจ้าหน้าที่ระดับคณะ (ผูกกับคณะ)
      'เจ้าหน้าที่ดูแลห้องประชุมคณะวิทยาศาสตร์และเทคโนโลยี',
      'เจ้าหน้าที่ดูแลห้องประชุมคณะครุศาสตร์',
      'เจ้าหน้าที่ดูแลห้องประชุมคณะวิทยาการจัดการ',
      'เจ้าหน้าที่ดูแลห้องประชุมคณะมนุษยศาสตร์และสังคมศาสตร์',
      'เจ้าหน้าที่ดูแลห้องประชุมคณะเทคโนโลยีการเกษตร',
      'เจ้าหน้าที่ดูแลห้องประชุมคณะเทคโนโลยีสารสนเทศ',
      'เจ้าหน้าที่ดูแลห้องประชุมคณะรัฐศาสตร์และรัฐประศาสนศาสตร์',
      'เจ้าหน้าที่ดูแลห้องประชุมคณะนิติศาสตร์',
      'เจ้าหน้าที่ดูแลห้องประชุมคณะวิศวกรรมศาสตร์'
    ]
  }
}
```

### 3. หน่วยงาน (Department) - สังกัดจากที่ไหน
```javascript
const departments = {
  // 9 คณะหลัก
  faculties: {
    label: '🎓 คณะต่างๆ',
    options: [
      'คณะวิทยาศาสตร์และเทคโนโลยี',
      'คณะครุศาสตร์', 
      'คณะวิทยาการจัดการ',
      'คณะมนุษยศาสตร์และสังคมศาสตร์',
      'คณะเทคโนโลยีการเกษตร',
      'คณะเทคโนโลยีสารสนเทศ',
      'คณะรัฐศาสตร์และรัฐประศาสนศาสตร์',
      'คณะนิติศาสตร์',
      'คณะวิศวกรรมศาสตร์'
    ]
  },
  
  // กองต่างๆ สำนักงานอธิการบดี
  divisions: {
    label: '🏢 กองต่างๆ สำนักงานอธิการบดี',
    options: [
      'สำนักงานอธิการบดี',
      'กองกลาง',
      'กองคลัง',
      'กองนโยบายและแผน',
      'กองบริหารงานบุคคล',
      'กองพัฒนานักศึกษา',
      'ศูนย์สหกิจศึกษาและพัฒนอาชีพ',
      'ศูนย์เทคโนโลยีดิจิทัลและนวัตกรรม'
    ]
  },
  
  // สำนักต่างๆ
  offices: {
    label: '📚 สำนักต่างๆ',
    options: [
      'สถาบันวิจัยและพัฒนา',
      'สำนักวิทยบริการและเทคโนโลยีสารสนเทศ',
      'สำนักศิลปะและวัฒนธรรม',
      'สำนักส่งเสริมวิชาการและงานทะเบียน',
      'สำนักบริการวิชาการ',
      'สำนักมาตรฐานและประกันคุณภาพ',
      'สำนักวิเทศสัมพันธ์และการจัดการศึกษานานาชาติ'
    ]
  },
  
  // หน่วยงานอื่นๆ
  others: {
    label: '🏛️ หน่วยงานอื่นๆ',
    options: [
      'งานประชาสัมพันธ์มหาวิทยาลัยราชภัฏมหาสารคาม',
      'สภาวิชาการ',
      'สภามหาวิทยาลัยราชภัฏมหาสารคาม',
      'หน่วยตรวจสอบภายใน'
    ]
  },
  
  // อาคาร/หอประชุมพิเศษ (สำหรับเจ้าหน้าที่เฉพาะ)
  buildings: {
    label: '🏛️ อาคาร/หอประชุมพิเศษ',
    options: [
      'อาคารประชุม 72 พรรษา มหาราชินี',
      'หอประชุมใหญ่ / หอประชุมเฉลิมพระเกียรติ 80 พรรษา',
      'อาคาร 34 อาคารเฉลิมพระเกียรติฉลองสิริราชสมบัติครบ 60 ปี(อาคาร 34 คณะวิทยาการจัดการ)'
    ]
  }
}
```

---

## 🔄 Logic การแสดงฟิลด์

### Dynamic Department Field
```javascript
// แสดง department field ตาม position ที่เลือก
function showDepartmentOptions(selectedPosition) {
  const departmentField = document.getElementById('department-select')
  
  if (selectedPosition === 'บุคลากร/อาจารย์ มหาวิทยาลัยราชภัฏมหาสารคาม') {
    // แสดงทุกหน่วยงาน - ให้เลือกว่ามาจากไหน
    departmentField.innerHTML = `
      <optgroup label="🎓 คณะต่างๆ">
        <option value="คณะวิทยาศาสตร์และเทคโนโลยี">คณะวิทยาศาสตร์และเทคโนโลยี</option>
        <option value="คณะครุศาสตร์">คณะครุศาสตร์</option>
        <!-- ... คณะอื่นๆ ครบ 9 คณะ -->
      </optgroup>
      
      <optgroup label="🏢 กองต่างๆ สำนักงานอธิการบดี">
        <option value="สำนักงานอธิการบดี">สำนักงานอธิการบดี</option>
        <option value="กองกลาง">กองกลาง</option>
        <!-- ... กองอื่นๆ ครบ 8 กอง -->
      </optgroup>
      
      <optgroup label="📚 สำนักต่างๆ">
        <option value="สถาบันวิจัยและพัฒนา">สถาบันวิจัยและพัฒนา</option>
        <!-- ... สำนักอื่นๆ ครบ 7 สำนัก -->
      </optgroup>
      
      <optgroup label="🏛️ หน่วยงานอื่นๆ">
        <option value="งานประชาสัมพันธ์มหาวิทยาลัยราชภัฏมหาสารคาม">งานประชาสัมพันธ์มหาวิทยาลัยราชภัฏมหาสารคาม</option>
        <!-- ... หน่วยงานอื่นๆ ครบ 4 หน่วยงาน -->
      </optgroup>
    `
    departmentField.style.display = 'block'
    departmentField.required = true
    
  } else if (selectedPosition.startsWith('ผู้บริหารคณะ')) {
    // ผู้บริหารคณะ - ระบบจะเซ็ตคณะอัตโนมัติจาก position
    departmentField.style.display = 'none'
    departmentField.required = false
    
  } else if (selectedPosition.startsWith('เจ้าหน้าที่ดูแลห้องประชุมคณะ')) {
    // เจ้าหน้าที่คณะ - ระบบจะเซ็ตคณะอัตโนมัติจาก position
    departmentField.style.display = 'none'
    departmentField.required = false
    
  } else {
    // อื่นๆ ไม่ต้องเลือก department
    departmentField.style.display = 'none'
    departmentField.required = false
  }
}
```

---

## 📊 ข้อมูลที่ส่งไป Backend

### Request Body Format
```javascript
const registerData = {
  // ข้อมูลส่วนตัว
  first_name: "สมชาย",
  last_name: "ใจดี", 
  email: "somchai@example.com",
  password: "password123",
  citizen_id: "1234567890123",
  zip_code: "44000", // optional
  
  // ตำแหน่งและหน่วยงาน
  position: "บุคลากร/อาจารย์ มหาวิทยาลัยราชภัฏมหาสารคาม",
  department: "คณะเทคโนโลยีสารสนเทศ" // ถ้าเลือก บุคลากรทั่วไป
}
```

### API Endpoint
```javascript
// POST /auth/register
const response = await fetch('http://localhost:8000/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(registerData)
})

const result = await response.json()
// { success: true/false, message: "...", token?: "..." }
```

---

## 🗄️ การจัดเก็บในฐานข้อมูล

### ระบบจะจัด User ไปตารางดังนี้:

#### 1. บุคลากรทั่วไป → ตาราง `users`
```sql
-- position: "บุคลากร/อาจารย์ มหาวิทยาลัยราชภัฏมหาสารคาม"
-- department: ตามที่เลือก (เช่น "คณะเทคโนโลยีสารสนเทศ")
-- role_id: 3 (user)
```

#### 2. ผู้บริหาร → ตาราง `executive`  
```sql
-- position: "ผู้บริหารคณะเทคโนโลยีสารสนเทศ"
-- department: อัตโนมัติจาก position ("คณะเทคโนโลยีสารสนเทศ")
-- role_id: 4 (executive)
-- executive_type: "faculty_executive" หรือ "university_executive"
```

#### 3. เจ้าหน้าที่ → ตาราง `officer`
```sql
-- position: "เจ้าหน้าที่ดูแลห้องประชุมคณะเทคโนโลยีสารสนเทศ"  
-- department: อัตโนมัติจาก position ("คณะเทคโนโลยีสารสนเทศ")
-- role_id: 2 (officer)
```

---

## 🎨 UI Design แนะนำ

### HTML Structure
```html
<form id="register-form" class="max-w-2xl mx-auto p-6">
  <!-- Header -->
  <div class="text-center mb-8">
    <h1 class="text-3xl font-bold text-gray-800">สมัครสมาชิก</h1>
    <p class="text-gray-600">ระบบจองห้องประชุม มหาวิทยาลัยราชภัฏมหาสารคาม</p>
  </div>

  <!-- ข้อมูลส่วนตัว -->
  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 class="text-xl font-semibold mb-4">📋 ข้อมูลส่วนตัว</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="text" name="first_name" placeholder="ชื่อจริง" required 
             class="border rounded-lg px-4 py-2">
      <input type="text" name="last_name" placeholder="นามสกุล" required
             class="border rounded-lg px-4 py-2">
    </div>
    
    <input type="email" name="email" placeholder="อีเมล" required
           class="w-full border rounded-lg px-4 py-2 mt-4">
           
    <input type="password" name="password" placeholder="รหัสผ่าน (อย่างน้อย 8 ตัวอักษร)" required
           class="w-full border rounded-lg px-4 py-2 mt-4">
           
    <input type="text" name="citizen_id" placeholder="เลขบัตรประชาชน 13 หลัก" 
           pattern="[0-9]{13}" required class="w-full border rounded-lg px-4 py-2 mt-4">
           
    <input type="text" name="zip_code" placeholder="รหัสไปรษณีย์ 5 หลัก (ไม่บังคับ)" 
           pattern="[0-9]{5}" class="w-full border rounded-lg px-4 py-2 mt-4">
  </div>

  <!-- ตำแหน่งและหน่วยงาน -->
  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 class="text-xl font-semibold mb-4">🏢 ตำแหน่งและหน่วยงาน</h3>
    
    <select name="position" id="position-select" required
            class="w-full border rounded-lg px-4 py-2 mb-4">
      <option value="">เลือกตำแหน่ง</option>
      
      <optgroup label="👤 บุคลากรทั่วไป">
        <option value="บุคลากร/อาจารย์ มหาวิทยาลัยราชภัฏมหาสารคาม">
          บุคลากร/อาจารย์ มหาวิทยาลัยราชภัฏมหาสารคาม
        </option>
      </optgroup>
      
      <optgroup label="👨‍💼 ผู้บริหาร">
        <option value="ผู้บริหารระดับมหาวิทยาลัย">ผู้บริหารระดับมหาวิทยาลัย</option>
        <option value="ผู้บริหารคณะเทคโนโลยีสารสนเทศ">ผู้บริหารคณะเทคโนโลยีสารสนเทศ</option>
        <!-- ... อื่นๆ -->
      </optgroup>
      
      <optgroup label="👨‍💻 เจ้าหน้าที่ดูแลห้องประชุม">
        <option value="เจ้าหน้าที่ดูแลห้องประชุมคณะเทคโนโลยีสารสนเทศ">
          เจ้าหน้าที่ดูแลห้องประชุมคณะเทคโนโลยีสารสนเทศ
        </option>
        <!-- ... อื่นๆ -->
      </optgroup>
    </select>
    
    <!-- แสดงเฉพาะเมื่อเลือก "บุคลากรทั่วไป" -->
    <select name="department" id="department-select" 
            class="w-full border rounded-lg px-4 py-2" style="display: none;">
      <option value="">เลือกหน่วยงานที่สังกัด</option>
      <!-- จะใส่ options ด้วย JavaScript -->
    </select>
  </div>

  <!-- Submit Button -->
  <button type="submit" 
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
    สมัครสมาชิก
  </button>
</form>
```

---

## ⚠️ สิ่งสำคัญที่ต้องอัปเดตใน Backend

### 🚨 Backend ยังขาดข้อมูลหน่วยงาน
ตอนนี้ Backend มีเฉพาะ 9 คณะ + 3 อาคาร แต่ยังไม่มี:
- กองต่างๆ (8 กอง)  
- สำนักต่างๆ (7 สำนัก)
- หน่วยงานอื่นๆ (4 หน่วยงาน)

### 📋 Todo List สำหรับอัปเดต Backend
```javascript
// ใน utils/departments.js ต้องเพิ่ม:
export const DEPARTMENTS = {
  // เพิ่มกองต่างๆ
  RECTOR_OFFICE: 'สำนักงานอธิการบดี',
  CENTRAL_DIVISION: 'กองกลาง',
  FINANCE_DIVISION: 'กองคลัง',
  POLICY_DIVISION: 'กองนโยบายและแผน',
  HR_DIVISION: 'กองบริหารงานบุคคล',
  STUDENT_DIVISION: 'กองพัฒนานักศึกษา',
  COOP_CENTER: 'ศูนย์สหกิจศึกษาและพัฒนอาชีพ',
  DIGITAL_CENTER: 'ศูนย์เทคโนโลยีดิจิทัลและนวัตกรรม',
  
  // เพิ่มสำนักต่างๆ
  RESEARCH_INSTITUTE: 'สถาบันวิจัยและพัฒนา',
  LIBRARY_IT: 'สำนักวิทยบริการและเทคโนโลยีสารสนเทศ',
  ARTS_CULTURE: 'สำนักศิลปะและวัฒนธรรม',
  ACADEMIC_REGISTRY: 'สำนักส่งเสริมวิชาการและงานทะเบียน',
  ACADEMIC_SERVICE: 'สำนักบริการวิชาการ',
  QUALITY_ASSURANCE: 'สำนักมาตรฐานและประกันคุณภาพ',
  INTERNATIONAL: 'สำนักวิเทศสัมพันธ์และการจัดการศึกษานานาชาติ',
  
  // เพิ่มหน่วยงานอื่นๆ
  PR_OFFICE: 'งานประชาสัมพันธ์มหาวิทยาลัยราชภัฏมหาสารคาม',
  ACADEMIC_COUNCIL: 'สภาวิชาการ',
  UNIVERSITY_COUNCIL: 'สภามหาวิทยาลัยราชภัฏมหาสารคาม',
  INTERNAL_AUDIT: 'หน่วยตรวจสอบภายใน'
  
  // ... คงเดิม 9 คณะ + 3 อาคาร
}
```

---

## 🎯 สรุปสำหรับ AI Frontend

### ✅ สิ่งที่ต้องทำ
1. **สร้างฟอร์มสมัครตามโครงสร้างข้างต้น**
2. **ใช้ JavaScript สำหรับ Dynamic Department Field** 
3. **Validation ฝั่ง Client ก่อนส่งไป Backend**
4. **จัดการ Response จาก API (/auth/register)**

### ✅ API พร้อมใช้งาน
- **Endpoint**: `POST http://localhost:8000/auth/register`  
- **Headers**: `Content-Type: application/json`
- **Response**: `{ success: boolean, message: string, token?: string }`

### ⚠️ สิ่งที่ต้องแจ้ง Backend Dev
Backend ต้องเพิ่มหน่วยงานทั้งหมดที่ส่งมา (กอง + สำนัก + หน่วยงานอื่นๆ) เพื่อให้ระบบครบถ้วน

---

**🔥 พร้อมเริ่มสร้างหน้าสมัครแล้ว!**
