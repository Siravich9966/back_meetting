// ทดสอบ login เพื่อดู JWT payload
import jwt from 'jsonwebtoken'

console.log('🔍 กรุณาเอา JWT Token จากหน้าเว็บมาทดสอบ:')
console.log('1. เปิด Browser Developer Tools (F12)')
console.log('2. ไป Application/Storage > Local Storage')
console.log('3. หา key "token" หรือ "accessToken"')
console.log('4. Copy JWT token มาใส่ในโค้ดข้างล่าง')
console.log('5. หรือดู Network tab เมื่อ login')
console.log('')

// วางจ JWT token ที่ได้จาก browser ตรงนี้
const testToken = "YOUR_JWT_TOKEN_HERE"

if (testToken !== "YOUR_JWT_TOKEN_HERE") {
  try {
    const decoded = jwt.decode(testToken)
    console.log('📋 JWT Payload:', JSON.stringify(decoded, null, 2))
    
    if (decoded.role === 'officer') {
      console.log('🔍 Officer data in JWT:')
      console.log(`- User ID: ${decoded.userId}`)
      console.log(`- Role: ${decoded.role}`) 
      console.log(`- Has position_department: ${decoded.position_department ? 'YES' : 'NO'}`)
      if (decoded.position_department) {
        console.log(`- Position Department: ${decoded.position_department}`)
      }
    }
  } catch (error) {
    console.error('❌ Error decoding JWT:', error.message)
  }
} else {
  console.log('⚠️ กรุณาใส่ JWT token จริงในไฟล์นี้แล้วรันใหม่')
}

process.exit(0)