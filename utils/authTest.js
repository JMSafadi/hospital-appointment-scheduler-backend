const request = require('supertest')
const app = require('../app')

async function createTestUserAndGetToken() {
  //  Register new user
  const registerData = {
    name: "Juan Carlos",
    email: "juancarlos@gmail.com",
    password: "randompass123"
  }

  // Log in new user
  const loginData = {
    email: registerData.email,
    password: registerData.password
  }

  console.log('Attempting login for test user: ', registerData)
  
  const loginResponse = await request(app)
  .post('/api/v1/login')
  .send(loginData)

  console.log('Login Response status: ', loginResponse.statusCode)
  console.log('Login Response body: ', loginResponse.body)

  if (loginResponse.statusCode === 200 && loginResponse.body.jwt) {
    console.log('Login succesful')
    return loginResponse.body.jwt
  } 

  if (loginResponse.statusCode === 401) {
    console.log('User not registered, proceeding to registration.')

    const registerResponse = await request(app)
      .post('/api/v1/signin')
      .send(registerData)
  
    console.log('Register response status: ', registerResponse.statusCode)
    console.log('Register response body: ', registerResponse.body)

    if (registerResponse.statusCode !== 201) {
      throw new Error('Failed to register test user')
    }
    
    const loginRegistered = await request(app)
    .post('/api/v1/login')
    .send(loginData)
    
    console.log('Login response after registration status: ', loginRegistered.statusCode)
    console.log('Login response after registration body: ', loginRegistered.body)
    
    if (loginRegistered.statusCode === 200 && loginRegistered.body.jwt) {
      return loginRegistered.body.jwt
    }
    throw new Error('Failed to obtain token for test user after registration.')
  }
  throw new Error('Failed to login or register test user.')
}

module.exports = {
  createTestUserAndGetToken
}
