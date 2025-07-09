// ทดสอบ API แบบง่าย
async function quickTest() {
  try {
    console.log('🧪 Quick API Test with JWT Token\n')
    
    // Token ที่ได้จากการ login
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJlbWFpbCI6InRlc3QxMjNAbXJ1LmFjLnRoIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTIwODA2MTAsImV4cCI6MTc1MjA4NDIxMH0.ZcVUbCeFyryubxZnQQ3Y-QAEkI3SFMZTG928RXBFxp0"
    
    // ทดสอบ Health Check
    const response = await fetch('http://localhost:8000/health')
    const result = await response.json()
    console.log('✅ Health Check:', result)
    
    // ทดสอบ API Test
    const testResponse = await fetch('http://localhost:8000/api/test')
    const testResult = await testResponse.json()
    console.log('✅ API Test:', testResult)
    
    console.log('\n--- Protected API Tests ---')
    
    // ทดสอบ Protected API ไม่มี Token
    const protectedResponse = await fetch('http://localhost:8000/api/protected/test')
    const protectedResult = await protectedResponse.json()
    console.log('❌ Protected Test (no auth):', protectedResult)
    
    // ทดสอบ Protected API มี Token
    const authResponse = await fetch('http://localhost:8000/api/protected/test', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const authResult = await authResponse.json()
    console.log('✅ Protected Test (with auth):', authResult)
    
    // ทดสอบ Profile API
    const profileResponse = await fetch('http://localhost:8000/api/protected/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const profileResult = await profileResponse.json()
    console.log('✅ Profile API:', profileResult)
    
    console.log('\n--- Role-based Access Tests ---')
    
    // ทดสอบ Officer Area (user ธรรมดาควรไม่ได้)
    const officerResponse = await fetch('http://localhost:8000/api/protected/officer-area', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const officerResult = await officerResponse.json()
    console.log('❌ Officer Area (user role):', officerResult)
    
    // ทดสอบ Admin Area (user ธรรมดาควรไม่ได้)
    const adminResponse = await fetch('http://localhost:8000/api/protected/admin-area', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const adminResult = await adminResponse.json()
    console.log('❌ Admin Area (user role):', adminResult)
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

quickTest()
