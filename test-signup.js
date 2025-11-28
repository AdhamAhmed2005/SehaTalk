// Quick test script to verify signup API
const testData = {
  role: "patient",
  firstName: "Test",
  lastName: "User",
  email: "test" + Date.now() + "@example.com",
  password: "Test123!",
  confirmPassword: "Test123!",
  phone: "+20 123 456 7890",
  dateOfBirth: "1995-01-01",
  gender: "male"
};

fetch('http://localhost:3000/api/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
.then(res => res.json())
.then(data => {
  console.log('✅ Signup test result:', data);
})
.catch(err => {
  console.error('❌ Signup test error:', err);
});
