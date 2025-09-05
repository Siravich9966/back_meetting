// ===================================================================
// JWT Expiry Test - ทดสอบการหมดอายุ JWT Token ของทุก Role
// ===================================================================

import jwt from 'jsonwebtoken'

// Mock JWT_SECRET (ใช้ secret เดียวกับใน backend)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secure-jwt-secret-key'

// ทดสอบสร้าง Token สำหรับแต่ละ role
function testTokenCreation() {
  console.log('🧪 ทดสอบการสร้าง JWT Token...\n')
  
  const roles = [
    { role: 'user', userId: 1, email: 'user@test.com', userTable: 'users' },
    { role: 'officer', userId: 2, email: 'officer@test.com', userTable: 'officer' },
    { role: 'admin', userId: 3, email: 'admin@test.com', userTable: 'admin' },
    { role: 'executive', userId: 4, email: 'executive@test.com', userTable: 'executive' }
  ]
  
  const tokens = {}
  
  for (const roleData of roles) {
    try {
      // สร้าง token (อายุ 1 ชั่วโมง)
      const token = jwt.sign(
        {
          userId: roleData.userId,
          email: roleData.email,
          role: roleData.role,
          userTable: roleData.userTable
        },
        JWT_SECRET,
        { expiresIn: '1h' }
      )
      
      // ตรวจสอบ payload
      const decoded = jwt.decode(token)
      const expiryTime = new Date(decoded.exp * 1000)
      const timeLeft = Math.round((decoded.exp * 1000 - Date.now()) / (1000 * 60))
      
      tokens[roleData.role] = token
      
      console.log(`✅ Role: ${roleData.role.toUpperCase()}`)
      console.log(`   📧 Email: ${decoded.email}`)
      console.log(`   ⏰ Expires: ${expiryTime.toLocaleString('th-TH')}`)
      console.log(`   ⏱️  Time Left: ${timeLeft} minutes`)
      console.log('')
      
    } catch (error) {
      console.log(`❌ Error creating token for ${roleData.role}: ${error.message}`)
    }
  }
  
  return tokens
}

// ทดสอบการ verify token
function testTokenVerification(tokens) {
  console.log('🔍 ทดสอบการ Verify JWT Token...\n')
  
  for (const [role, token] of Object.entries(tokens)) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      const timeLeft = Math.round((decoded.exp * 1000 - Date.now()) / (1000 * 60))
      
      console.log(`✅ Token Verification - Role: ${role.toUpperCase()}`)
      console.log(`   👤 User ID: ${decoded.userId}`)
      console.log(`   📧 Email: ${decoded.email}`)
      console.log(`   🏢 Table: ${decoded.userTable}`)
      console.log(`   ⏱️  Time Left: ${timeLeft} minutes`)
      console.log('')
      
    } catch (error) {
      console.log(`❌ Token Verification Failed - Role: ${role.toUpperCase()}`)
      console.log(`   Error: ${error.name} - ${error.message}`)
      console.log('')
    }
  }
}

// ทดสอบ token ที่หมดอายุ (สร้าง token อายุ 1 วินาที)
function testExpiredToken() {
  console.log('⏰ ทดสอบ Token ที่หมดอายุ...\n')
  
  try {
    // สร้าง token อายุ 1 วินาที
    const shortToken = jwt.sign(
      {
        userId: 999,
        email: 'test@expired.com',
        role: 'user',
        userTable: 'users'
      },
      JWT_SECRET,
      { expiresIn: '1s' }
    )
    
    console.log('🕐 รอ 2 วินาทีเพื่อให้ token หมดอายุ...')
    
    setTimeout(() => {
      try {
        jwt.verify(shortToken, JWT_SECRET)
        console.log('❌ ผิดพลาด: Token ควรหมดอายุแล้ว!')
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          console.log('✅ Token หมดอายุถูกต้อง!')
          console.log(`   Error: ${error.name} - ${error.message}`)
        } else {
          console.log(`❌ Unexpected error: ${error.name} - ${error.message}`)
        }
      }
    }, 2000)
    
  } catch (error) {
    console.log(`❌ Error in expired token test: ${error.message}`)
  }
}

// รันการทดสอบ
async function runTests() {
  console.log('🚀 เริ่มทดสอบ JWT Expiry System...\n')
  console.log('============================================================\n')
  
  // ทดสอบการสร้าง token
  const tokens = testTokenCreation()
  
  console.log('============================================================\n')
  
  // ทดสอบการ verify token
  testTokenVerification(tokens)
  
  console.log('============================================================\n')
  
  // ทดสอบ token หมดอายุ
  testExpiredToken()
}

// รันทดสอบ
runTests()
