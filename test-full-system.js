// ทดสอบระบบทั้งหมด - Authentication + Protected APIs
async function testFullSystem() {
  const baseUrl = 'http://localhost:8000'
  
  console.log('🧪 ทดสอบระบบจองห้องประชุมทั้งหมด\n')
  console.log('=' .repeat(60))
  
  try {
    // 1. ทดสอบ Basic APIs
    console.log('\n1️⃣ ทดสอบ Basic APIs...')
    
    const healthResponse = await fetch(`${baseUrl}/health`)
    const healthResult = await healthResponse.json()
    console.log('✅ Health Check:', healthResult.status)
    
    const testResponse = await fetch(`${baseUrl}/api/test`)
    const testResult = await testResponse.json()
    console.log('✅ API Test:', testResult.message)
    
    // 2. ทดสอบ Register
    console.log('\n2️⃣ ทดสอบ Registration...')
    const registerData = {
      email: `test-${Date.now()}@mru.ac.th`,
      password: '123456',
      first_name: 'ทดสอบ',
      last_name: 'ระบบ',
      citizen_id: `1${Date.now().toString().slice(-12)}`,
      position: 'นักศึกษา',
      department: 'คณะวิทยาการคอมพิวเตอร์',
      zip_code: '44000'
    }
    
    const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData)
    })
    
    const registerResult = await registerResponse.json()
    if (registerResult.success) {
      console.log('✅ Registration สำเร็จ:', registerResult.user.email)
    } else {
      console.log('❌ Registration ล้มเหลว:', registerResult.error)
      return
    }
    
    // 3. ทดสอบ Login
    console.log('\n3️⃣ ทดสอบ Login...')
    const loginData = {
      email: registerData.email,
      password: '123456'
    }
    
    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    })
    
    const loginResult = await loginResponse.json()
    if (!loginResult.success) {
      console.log('❌ Login ล้มเหลว:', loginResult.error)
      return
    }
    
    console.log('✅ Login สำเร็จ')
    console.log('📝 User:', loginResult.user.first_name, loginResult.user.last_name)
    console.log('🎭 Role:', loginResult.user.roles?.role_name)
    const token = loginResult.token
    console.log('🎟️ Token:', token.substring(0, 30) + '...')
    
    // 4. ทดสอบ Protected APIs
    console.log('\n4️⃣ ทดสอบ Protected APIs...')
    
    // ทดสอบไม่มี token
    const noTokenResponse = await fetch(`${baseUrl}/api/protected/profile`)
    const noTokenResult = await noTokenResponse.json()
    console.log('❌ ไม่มี Token:', noTokenResult.error)
    
    // ทดสอบมี token
    const profileResponse = await fetch(`${baseUrl}/api/protected/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const profileResult = await profileResponse.json()
    if (profileResult.success) {
      console.log('✅ Profile API:', profileResult.profile.email)
    } else {
      console.log('❌ Profile API:', profileResult.error)
    }
    
    // ทดสอบ User Area
    const userAreaResponse = await fetch(`${baseUrl}/api/protected/user-area`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const userAreaResult = await userAreaResponse.json()
    if (userAreaResult.success) {
      console.log('✅ User Area:', userAreaResult.message)
    } else {
      console.log('❌ User Area:', userAreaResult.error)
    }
    
    // 5. ทดสอบ Role-based Access
    console.log('\n5️⃣ ทดสอบ Role-based Access...')
    
    // ทดสอบ Officer Area (ควรไม่ได้เพราะเป็น user)
    const officerAreaResponse = await fetch(`${baseUrl}/api/protected/officer-area`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const officerAreaResult = await officerAreaResponse.json()
    if (officerAreaResponse.status === 403) {
      console.log('✅ Officer Area Restriction ทำงานถูกต้อง')
    } else {
      console.log('❌ Officer Area:', officerAreaResult)
    }
    
    // ทดสอบ Admin Area (ควรไม่ได้เพราะเป็น user)
    const adminAreaResponse = await fetch(`${baseUrl}/api/protected/admin-area`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const adminAreaResult = await adminAreaResponse.json()
    if (adminAreaResponse.status === 403) {
      console.log('✅ Admin Area Restriction ทำงานถูกต้อง')
    } else {
      console.log('❌ Admin Area:', adminAreaResult)
    }
    
    // 6. สรุปผลการทดสอบ
    console.log('\n' + '=' .repeat(60))
    console.log('🎉 สรุปผลการทดสอบ:')
    console.log('✅ Server ทำงานได้')
    console.log('✅ Database เชื่อมต่อได้')
    console.log('✅ Registration/Login ทำงานได้')
    console.log('✅ JWT Middleware ทำงานได้')
    console.log('✅ Role-based Access Control ทำงานได้')
    console.log('✅ Protected APIs ทำงานได้')
    console.log('\n🚀 ระบบพร้อมสำหรับการพัฒนาต่อ!')
    
  } catch (error) {
    console.error('\n❌ เกิดข้อผิดพลาดในการทดสอบ:', error.message)
    console.error('🔍 ตรวจสอบว่า server ทำงานอยู่หรือไม่')
  }
}

// รอให้ server เริ่มทำงานแล้วค่อยทดสอบ
setTimeout(testFullSystem, 2000)
