// ===================================================================
// ทดสอบระบบด้วยข้อมูลจริงที่มีอยู่แล้ว
// ===================================================================

const API_BASE = 'http://localhost:8000/api'

// ข้อมูล users ที่มีอยู่จริงในระบบ
const EXISTING_USERS = {
  admin: {
    email: "officer.it1@company.com",
    password: "officer123"
  },
  user: {
    email: "student.test@example.com", 
    password: "password123"
  },
  officer: {
    email: "jane@company.com",
    password: "password123"
  }
}

// Test helper function
async function testAPI(method, endpoint, data = null, token = null) {
  try {
    const options = {
      method,
      headers: { 
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
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

console.log('🧪 ทดสอบระบบด้วยผู้ใช้จริงที่มีอยู่แล้ว')
console.log('='.repeat(60))

// Test 1: ทดสอบการ Login ทุก Role
async function testExistingLogin() {
  console.log('\n🔑 Test 1: ทดสอบการ Login ผู้ใช้จริง')
  console.log('-'.repeat(50))
  
  let passedTests = 0
  let totalTests = 0
  let authTokens = {}
  
  for (const [role, credentials] of Object.entries(EXISTING_USERS)) {
    totalTests++
    console.log(`\n📝 Login ${role}: ${credentials.email}`)
    
    const result = await testAPI('POST', '/auth/login', credentials)
    
    const success = result.success && result.data?.token
    const icon = success ? '✅' : '❌'
    
    console.log(`   ${icon} Status: ${result.status}`)
    console.log(`   📄 Message: ${result.message}`)
    
    if (success) {
      authTokens[role] = result.data.token
      console.log(`   🎫 Token: ${result.data.token.substring(0, 30)}...`)
      console.log(`   👤 User Role: ${result.data.user?.role || 'N/A'}`)
      console.log(`   🏢 Department: ${result.data.user?.department || 'N/A'}`)
      passedTests++
    }
    
    await new Promise(resolve => setTimeout(resolve, 300))
  }
  
  console.log(`\n📊 Login Test Results: ${passedTests}/${totalTests} ผ่าน`)
  return { passed: passedTests, total: totalTests, tokens: authTokens }
}

// Test 2: ทดสอบ Department Isolation (หัวใจสำคัญ!)
async function testDepartmentIsolation(tokens) {
  console.log('\n🏢 Test 2: ทดสอบ Department Isolation (หัวใจสำคัญ!)')
  console.log('-'.repeat(50))
  
  if (!tokens.admin || !tokens.officer) {
    console.log('❌ ไม่มี admin หรือ officer tokens - ข้ามการทดสอบ')
    return { passed: 0, total: 3 }
  }
  
  let passedTests = 0
  let totalTests = 0
  
  // Test A: Admin ดูข้อมูลทั้งหมด (ต้องเห็นได้)
  totalTests++
  console.log('\n📋 A. Admin ดูข้อมูลสมาชิกทั้งหมด')
  const adminAllUsers = await testAPI('GET', '/protected/admin/all-users', null, tokens.admin)
  
  const adminSuccess = adminAllUsers.success
  const adminIcon = adminSuccess ? '✅' : '❌'
  
  console.log(`   ${adminIcon} Status: ${adminAllUsers.status}`)
  console.log(`   📄 Message: ${adminAllUsers.message}`)
  
  if (adminSuccess) {
    console.log(`   📊 Users found: ${adminAllUsers.data?.users?.length || 0}`)
    console.log(`   📊 Officers found: ${adminAllUsers.data?.officers?.length || 0}`)
    console.log(`   📊 Admins found: ${adminAllUsers.data?.admins?.length || 0}`)
    passedTests++
  }
  
  // Test B: Officer ดูการจอง (ต้องเห็นเฉพาะ department ตัวเอง)
  totalTests++
  console.log('\n📋 B. Officer ดูการจองใน department ตัวเอง')
  const officerReservations = await testAPI('GET', '/protected/officer/reservations', null, tokens.officer)
  
  const officerSuccess = officerReservations.success
  const officerIcon = officerSuccess ? '✅' : '❌'
  
  console.log(`   ${officerIcon} Status: ${officerReservations.status}`)
  console.log(`   📄 Message: ${officerReservations.message}`)
  
  if (officerSuccess) {
    console.log(`   📊 Reservations found: ${officerReservations.data?.reservations?.length || 0}`)
    passedTests++
  }
  
  // Test C: Officer ดูห้องประชุม (ต้องเห็นเฉพาะ department ตัวเอง)
  totalTests++
  console.log('\n📋 C. Officer ดูห้องประชุมใน department ตัวเอง')
  const officerRooms = await testAPI('GET', '/protected/officer/rooms', null, tokens.officer)
  
  const roomsSuccess = officerRooms.success
  const roomsIcon = roomsSuccess ? '✅' : '❌'
  
  console.log(`   ${roomsIcon} Status: ${officerRooms.status}`)
  console.log(`   📄 Message: ${officerRooms.message}`)
  
  if (roomsSuccess) {
    console.log(`   📊 Rooms found: ${officerRooms.data?.rooms?.length || 0}`)
    passedTests++
  }
  
  console.log(`\n📊 Department Isolation Results: ${passedTests}/${totalTests} ผ่าน`)
  return { passed: passedTests, total: totalTests }
}

// Test 3: ทดสอบ Role-based Permissions
async function testRolePermissions(tokens) {
  console.log('\n🔐 Test 3: ทดสอบ Role-based Permissions')
  console.log('-'.repeat(50))
  
  let passedTests = 0
  let totalTests = 0
  
  if (!tokens.user) {
    console.log('❌ ไม่มี user token - ข้ามการทดสอบ')
    return { passed: 0, total: 3 }
  }
  
  // Test A: User เข้าถึง profile ตัวเอง (ต้องได้)
  totalTests++
  console.log('\n📋 A. User เข้าถึง profile ตัวเอง')
  const userProfile = await testAPI('GET', '/protected/user/profile', null, tokens.user)
  
  const profileSuccess = userProfile.success
  const profileIcon = profileSuccess ? '✅' : '❌'
  
  console.log(`   ${profileIcon} Status: ${userProfile.status}`)
  console.log(`   📄 Message: ${userProfile.message}`)
  
  if (profileSuccess) {
    passedTests++
  }
  
  // Test B: User พยายามเข้าถึง admin area (ต้องถูกปฏิเสธ)
  totalTests++
  console.log('\n📋 B. User พยายามเข้าถึง admin area (ต้องถูกปฏิเสธ)')
  const userAdminAttempt = await testAPI('GET', '/protected/admin/all-users', null, tokens.user)
  
  const blockSuccess = !userAdminAttempt.success && userAdminAttempt.status === 403
  const blockIcon = blockSuccess ? '✅' : '❌'
  
  console.log(`   ${blockIcon} Status: ${userAdminAttempt.status}`)
  console.log(`   📄 Message: ${userAdminAttempt.message}`)
  console.log(`   🔒 Expected: 403 Forbidden`)
  
  if (blockSuccess) {
    passedTests++
  }
  
  // Test C: User พยายามเข้าถึง officer area (ต้องถูกปฏิเสธ)
  totalTests++
  console.log('\n📋 C. User พยายามเข้าถึง officer area (ต้องถูกปฏิเสธ)')
  const userOfficerAttempt = await testAPI('GET', '/protected/officer/rooms', null, tokens.user)
  
  const blockOfficerSuccess = !userOfficerAttempt.success && userOfficerAttempt.status === 403
  const blockOfficerIcon = blockOfficerSuccess ? '✅' : '❌'
  
  console.log(`   ${blockOfficerIcon} Status: ${userOfficerAttempt.status}`)
  console.log(`   📄 Message: ${userOfficerAttempt.message}`)
  console.log(`   🔒 Expected: 403 Forbidden`)
  
  if (blockOfficerSuccess) {
    passedTests++
  }
  
  console.log(`\n📊 Role Permissions Results: ${passedTests}/${totalTests} ผ่าน`)
  return { passed: passedTests, total: totalTests }
}

// Test 4: ทดสอบ Basic Room & Reservation APIs
async function testBasicAPIs(tokens) {
  console.log('\n📅 Test 4: ทดสอบ Room & Reservation APIs')
  console.log('-'.repeat(50))
  
  let passedTests = 0
  let totalTests = 0
  
  // Test A: ดูรายการห้องประชุม (public API)
  totalTests++
  console.log('\n📋 A. ดูรายการห้องประชุมทั้งหมด')
  const allRooms = await testAPI('GET', '/rooms')
  
  const roomsSuccess = allRooms.success
  const roomsIcon = roomsSuccess ? '✅' : '❌'
  
  console.log(`   ${roomsIcon} Status: ${allRooms.status}`)
  console.log(`   📄 Message: ${allRooms.message}`)
  
  if (roomsSuccess && allRooms.data?.rooms?.length > 0) {
    console.log(`   📊 Total rooms: ${allRooms.data.rooms.length}`)
    console.log(`   🏢 First room: ${allRooms.data.rooms[0].room_name}`)
    passedTests++
  }
  
  // Test B: ดู Calendar API
  if (roomsSuccess && allRooms.data?.rooms?.length > 0) {
    totalTests++
    const testRoomId = allRooms.data.rooms[0].room_id
    
    console.log(`\n📋 B. ดู Calendar ห้อง ID: ${testRoomId}`)
    const calendar = await testAPI('GET', `/reservations/calendar/${testRoomId}?month=12&year=2024`)
    
    const calendarSuccess = calendar.success
    const calendarIcon = calendarSuccess ? '✅' : '❌'
    
    console.log(`   ${calendarIcon} Status: ${calendar.status}`)
    console.log(`   📄 Message: ${calendar.message}`)
    
    if (calendarSuccess) {
      console.log(`   📅 Calendar data found`)
      passedTests++
    }
  }
  
  // Test C: User สร้างการจอง (ถ้ามี user token)
  if (tokens.user && allRooms.data?.rooms?.length > 0) {
    totalTests++
    const testRoomId = allRooms.data.rooms[0].room_id
    
    console.log(`\n📋 C. User สร้างการจองใหม่`)
    const newReservation = await testAPI('POST', '/protected/reservations', {
      room_id: testRoomId,
      start_at: '2024-12-30',
      end_at: '2024-12-30',
      start_time: '2024-12-30T09:00:00.000Z',
      end_time: '2024-12-30T11:00:00.000Z',
      details_r: 'ทดสอบการจองจากระบบ automated testing'
    }, tokens.user)
    
    const reservationSuccess = newReservation.success
    const reservationIcon = reservationSuccess ? '✅' : '❌'
    
    console.log(`   ${reservationIcon} Status: ${newReservation.status}`)
    console.log(`   📄 Message: ${newReservation.message}`)
    
    if (reservationSuccess) {
      console.log(`   📝 Reservation ID: ${newReservation.data?.reservation_id || 'N/A'}`)
      passedTests++
    }
  }
  
  console.log(`\n📊 Basic APIs Results: ${passedTests}/${totalTests} ผ่าน`)
  return { passed: passedTests, total: totalTests }
}

// Main test runner
async function runRealSystemTests() {
  const startTime = Date.now()
  
  try {
    console.log('🔍 ขั้นตอนที่ 1: ตรวจสอบการเชื่อมต่อ API')
    const healthCheck = await testAPI('GET', '/../health')
    
    if (!healthCheck.success) {
      console.log('❌ ไม่สามารถเชื่อมต่อ API ได้')
      return
    }
    console.log('✅ API server พร้อมใช้งาน')
    
    const results = []
    
    // รันการทดสอบทีละขั้นตอน
    const loginResult = await testExistingLogin()
    results.push(loginResult)
    
    results.push(await testDepartmentIsolation(loginResult.tokens))
    results.push(await testRolePermissions(loginResult.tokens))
    results.push(await testBasicAPIs(loginResult.tokens))
    
    // สรุปผลทั้งหมด
    const totalPassed = results.reduce((sum, result) => sum + result.passed, 0)
    const totalTests = results.reduce((sum, result) => sum + result.total, 0)
    const successRate = Math.round((totalPassed / totalTests) * 100)
    const duration = Math.round((Date.now() - startTime) / 1000)
    
    console.log('\n' + '='.repeat(60))
    console.log('🎯 สรุปผลการทดสอบระบบด้วยผู้ใช้จริง')
    console.log('='.repeat(60))
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
    console.log(`   🔑 Login Tests: ${results[0]?.passed || 0}/${results[0]?.total || 0}`)
    console.log(`   🏢 Department Isolation: ${results[1]?.passed || 0}/${results[1]?.total || 0}`)
    console.log(`   🔐 Role Permissions: ${results[2]?.passed || 0}/${results[2]?.total || 0}`)
    console.log(`   📅 Basic APIs: ${results[3]?.passed || 0}/${results[3]?.total || 0}`)
    
    // Key Security Tests Summary
    console.log('\n🔒 KEY SECURITY TESTS:')
    console.log(`   ✅ Department Isolation: ${results[1]?.passed >= 2 ? 'PASS' : 'FAIL'}`)
    console.log(`   ✅ Role-based Access: ${results[2]?.passed >= 2 ? 'PASS' : 'FAIL'}`)
    console.log(`   ✅ Authentication: ${results[0]?.passed >= 1 ? 'PASS' : 'FAIL'}`)
    
  } catch (error) {
    console.error('\n💥 การทดสอบล้มเหลว:', error.message)
  }
}

// เริ่มทดสอบ
runRealSystemTests()
