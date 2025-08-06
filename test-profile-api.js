// Test script สำหรับทดสอบ Profile API
import app from './index.js'

console.log('🧪 กำลังทดสอบ Profile APIs...')

// เริ่ม server
const port = 8001
app.listen(port)
console.log(`🚀 Test server เริ่มทำงานที่ port ${port}`)

// รอ server เริ่มทำงาน
setTimeout(async () => {
  try {
    console.log('\n📡 ทดสอบ API endpoints...')
    
    // ทดสอบ health check
    const healthResponse = await fetch(`http://localhost:${port}/health`)
    const healthData = await healthResponse.json()
    console.log('✅ Health check:', healthData)
    
    // ทดสอบ auth API
    const authTestResponse = await fetch(`http://localhost:${port}/api/test`)
    const authTestData = await authTestResponse.json()
    console.log('✅ Auth test:', authTestData)
    
    // ทดสอบ protected routes (ต้องมี token)
    const protectedResponse = await fetch(`http://localhost:${port}/api/protected/test`)
    const protectedData = await protectedResponse.json()
    console.log('✅ Protected test:', protectedData)
    
    console.log('\n🎯 ลอง PUT profile endpoint...')
    const profileResponse = await fetch(`http://localhost:${port}/api/protected/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token'
      },
      body: JSON.stringify({
        first_name: 'Test',
        last_name: 'User'
      })
    })
    
    console.log('📊 Profile API Response Status:', profileResponse.status)
    
    if (profileResponse.status === 404) {
      console.log('❌ Profile API ไม่พบ - ตรวจสอบ routes')
    } else {
      const profileData = await profileResponse.json()
      console.log('📋 Profile API Response:', profileData)
    }
    
  } catch (error) {
    console.error('❌ Error testing APIs:', error.message)
  }
  
  process.exit(0)
}, 2000)
