// ===================================================================
// ทดสอบระบบตาม TESTING-GUIDE.md
// ===================================================================

const API_BASE = 'http://localhost:8000/api'

// Test helper function
async function testAPI(method, endpoint, data = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    }
    
    if (data && method !== 'GET') {
      options.body = JSON.stringify(data)
    }
    
    const response = await fetch(`${API_BASE}${endpoint}`, options)
    const result = await response.json()
    
    return {
      status: response.status,
      success: result.success || response.ok,
      message: result.message || response.statusText,
      data: result.data || result,
      raw: result
    }
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: `Connection error: ${error.message}`,
      data: null
    }
  }
}

console.log('🧪 เริ่มทดสอบระบบตาม TESTING-GUIDE.md')
console.log('=' * 60)

// Test 1: ทดสอบการสมัครสมาชิก
async function testRegistration() {
  console.log('\n🔐 Test 1: ทดสอบการสมัครสมาชิก')
  console.log('-' * 50)
  
  const testCases = [
    {
      name: 'สมัครเป็น User (อาจารย์)',
      data: {
        email: `teacher${Date.now()}@test.com`,
        password: 'password123',
        first_name: 'Test',
        last_name: 'Teacher',
        citizen_id: '1234567890123',
        position: 'อาจารย์',
        department: 'คณะเทคโนโลยีสารสนเทศ'
      },
      expectedTable: 'users',
      expectedRole: 'user'
    },
    {
      name: 'สมัครเป็น Officer (เจ้าหน้าที่)',
      data: {
        email: `officer${Date.now()}@test.com`,
        password: 'password123',
        first_name: 'Test',
        last_name: 'Officer',
        citizen_id: '1234567890124',
        position: 'เจ้าหน้าที่ดูแลห้องประชุมคณะเทคโนโลยีสารสนเทศ',
        department: 'คณะเทคโนโลยีสารสนเทศ'
      },
      expectedTable: 'officer',
      expectedRole: 'officer'
    },
    {
      name: 'สมัครเป็น Admin (ผู้ดูแลระบบ)',
      data: {
        email: `admin${Date.now()}@test.com`,
        password: 'password123',
        first_name: 'Test',
        last_name: 'Admin',
        citizen_id: '1234567890125',
        position: 'ผู้ดูแลระบบ',
        department: 'ศูนย์เทคโนโลยีสารสนเทศ'
      },
      expectedTable: 'admin',
      expectedRole: 'admin'
    }
  ]
  
  let passedTests = 0
  let totalTests = testCases.length
  
  for (const testCase of testCases) {
    console.log(`\n📝 ${testCase.name}`)
    
    const result = await testAPI('POST', '/auth/register', testCase.data)
    
    const success = result.success
    const icon = success ? '✅' : '❌'
    
    console.log(`   ${icon} Status: ${result.status}`)
    console.log(`   📄 Message: ${result.message}`)
    
    if (success) {
      console.log(`   📋 Expected: ${testCase.expectedTable} table, ${testCase.expectedRole} role`)
      passedTests++
    } else {
      console.log(`   ⚠️  Registration failed: ${result.message}`)
    }
    
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  console.log(`\n📊 Registration Test Results: ${passedTests}/${totalTests} ผ่าน`)
  return { passed: passedTests, total: totalTests }
}

// Test 2: ทดสอบการ Login
async function testLogin() {
  console.log('\n🔑 Test 2: ทดสอบการเข้าสู่ระบบ')
  console.log('-' * 50)
  
  // สมัครผู้ใช้ทดสอบก่อน
  const testUser = {
    email: `logintest${Date.now()}@test.com`,
    password: 'password123',
    first_name: 'Login',
    last_name: 'Test',
    citizen_id: '1234567890199',
    position: 'อาจารย์',
    department: 'คณะเทคโนโลยีสารสนเทศ'
  }
  
  console.log('📋 สมัครผู้ใช้ทดสอบ...')
  const registerResult = await testAPI('POST', '/auth/register', testUser)
  
  if (!registerResult.success) {
    console.log('❌ ไม่สามารถสมัครผู้ใช้ทดสอบได้')
    return { passed: 0, total: 1 }
  }
  
  console.log('✅ สมัครผู้ใช้ทดสอบสำเร็จ')
  
  // ทดสอบ Login
  console.log('\n🔐 ทดสอบการ Login...')
  const loginResult = await testAPI('POST', '/auth/login', {
    email: testUser.email,
    password: testUser.password
  })
  
  const success = loginResult.success && loginResult.data?.token
  const icon = success ? '✅' : '❌'
  
  console.log(`   ${icon} Status: ${loginResult.status}`)
  console.log(`   📄 Message: ${loginResult.message}`)
  
  if (success) {
    console.log(`   🎫 Token received: ${loginResult.data.token.substring(0, 20)}...`)
    console.log(`   👤 User role: ${loginResult.data.user?.role || 'N/A'}`)
  }
  
  console.log(`\n📊 Login Test Results: ${success ? 1 : 0}/1 ผ่าน`)
  return { passed: success ? 1 : 0, total: 1 }
}

// Test 3: ทดสอบ API Protection
async function testAPIProtection() {
  console.log('\n🛡️ Test 3: ทดสอบการป้องกัน Protected APIs')
  console.log('-' * 50)
  
  // ทดสอบเข้าถึง protected endpoint โดยไม่มี token
  console.log('📋 ทดสอบเข้าถึงโดยไม่มี token...')
  const noTokenResult = await testAPI('GET', '/protected/user/profile')
  
  const shouldBlock = !noTokenResult.success && noTokenResult.status === 401
  const icon1 = shouldBlock ? '✅' : '❌'
  
  console.log(`   ${icon1} No Token Test: ${noTokenResult.status} - ${noTokenResult.message}`)
  
  // ทดสอบด้วย invalid token
  console.log('\n📋 ทดสอบด้วย invalid token...')
  const invalidTokenResult = await testAPI('GET', '/protected/user/profile')
  
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer invalid-token-here'
    }
  }
  
  try {
    const response = await fetch(`${API_BASE}/protected/user/profile`, options)
    const result = await response.json()
    
    const shouldBlock2 = !result.success && response.status === 401
    const icon2 = shouldBlock2 ? '✅' : '❌'
    
    console.log(`   ${icon2} Invalid Token Test: ${response.status} - ${result.message}`)
    
    const totalPassed = (shouldBlock ? 1 : 0) + (shouldBlock2 ? 1 : 0)
    console.log(`\n📊 API Protection Test Results: ${totalPassed}/2 ผ่าน`)
    return { passed: totalPassed, total: 2 }
    
  } catch (error) {
    console.log(`   ❌ Invalid Token Test Error: ${error.message}`)
    console.log(`\n📊 API Protection Test Results: ${shouldBlock ? 1 : 0}/2 ผ่าน`)
    return { passed: shouldBlock ? 1 : 0, total: 2 }
  }
}

// Main test runner
async function runSystemTests() {
  const startTime = Date.now()
  
  try {
    const results = []
    
    results.push(await testRegistration())
    results.push(await testLogin())
    results.push(await testAPIProtection())
    
    // สรุปผลทั้งหมด
    const totalPassed = results.reduce((sum, result) => sum + result.passed, 0)
    const totalTests = results.reduce((sum, result) => sum + result.total, 0)
    const successRate = Math.round((totalPassed / totalTests) * 100)
    const duration = Math.round((Date.now() - startTime) / 1000)
    
    console.log('\n' + '=' * 60)
    console.log('🎯 สรุปผลการทดสอบระบบ')
    console.log('=' * 60)
    console.log(`📊 Total Tests: ${totalTests}`)
    console.log(`✅ Passed: ${totalPassed}`)
    console.log(`❌ Failed: ${totalTests - totalPassed}`)
    console.log(`📈 Success Rate: ${successRate}%`)
    console.log(`⏱️  Duration: ${duration} seconds`)
    
    if (successRate >= 90) {
      console.log('\n🎉 ระบบผ่านการทดสอบในระดับดีเยี่ยม!')
    } else if (successRate >= 75) {
      console.log('\n✅ ระบบผ่านการทดสอบในระดับดี')
    } else {
      console.log('\n⚠️  ระบบต้องปรับปรุง - มีการทดสอบหลายข้อที่ไม่ผ่าน')
    }
    
    console.log('\n📋 รายละเอียดผลการทดสอบ:')
    console.log(`   🔐 Registration: ${results[0]?.passed || 0}/${results[0]?.total || 0}`)
    console.log(`   🔑 Login: ${results[1]?.passed || 0}/${results[1]?.total || 0}`)
    console.log(`   🛡️  API Protection: ${results[2]?.passed || 0}/${results[2]?.total || 0}`)
    
  } catch (error) {
    console.error('\n💥 การทดสอบล้มเหลว:', error.message)
  }
}

// เริ่มทดสอบ
runSystemTests()
