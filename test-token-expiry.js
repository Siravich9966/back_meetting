// Test JWT Token Expiry
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// อ่าน JWT_SECRET จาก .env
dotenv.config()

console.log('🔍 Testing JWT Token Expiry...')

// สร้าง token ที่หมดอายุใน 10 วินาที
const testToken = jwt.sign(
  {
    userId: 999,
    email: 'test@test.com',
    role: 'officer',
    userTable: 'officer'
  },
  process.env.JWT_SECRET,
  { expiresIn: '10s' } // หมดอายุใน 10 วินาที
)

console.log('📋 Test Token Created:', testToken.substring(0, 50) + '...')

// ตรวจสอบ token
try {
  const decoded = jwt.decode(testToken)
  const expiryTime = new Date(decoded.exp * 1000)
  const currentTime = new Date()
  
  console.log('Token Info:')
  console.log('- Role:', decoded.role)
  console.log('- Expires at:', expiryTime.toLocaleString('th-TH'))
  console.log('- Current time:', currentTime.toLocaleString('th-TH'))
  console.log('- Time left (seconds):', Math.round((decoded.exp * 1000 - Date.now()) / 1000))
  
  // ทดสอบ verify
  setTimeout(() => {
    try {
      jwt.verify(testToken, process.env.JWT_SECRET)
      console.log('✅ Token still valid after 5 seconds')
    } catch (error) {
      console.log('❌ Token expired after 5 seconds:', error.message)
    }
  }, 5000) // ตรวจสอบหลัง 5 วินาที
  
  setTimeout(() => {
    try {
      jwt.verify(testToken, process.env.JWT_SECRET)
      console.log('✅ Token still valid after 12 seconds')
    } catch (error) {
      console.log('❌ Token expired after 12 seconds:', error.message)
    }
  }, 12000) // ตรวจสอบหลัง 12 วินาที (ควรหมดอายุแล้ว)
  
} catch (error) {
  console.error('❌ Error:', error)
}
