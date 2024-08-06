// Own JSON Web Token library
// Import crypto module to use sha256 algorithm
const crypto = require('crypto')

// Payload examples
const json1_p = {
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}

const json2_p = {
  "sub": "85984516",
  "name": "Julian Safadi",
  "iat": 7517107472
}

const json3_p = {
  "sub": "75271751",
  "name": "Juan Gonzalez",
  "iat": 9464262141
}

const jwt = {
  // Method to create JWT receiving payload and secret
  sign(payload, secret) {
    // Build three components tha makes up the token
    const header = this._base64Encode({
      "alg": "HS256",
      "typ": "JWT"
    })
    const payloadEncoded = this._base64Encode(payload)
    const signature = this._createSignature(header, payloadEncoded, secret)
    // Return final token
    return `${header}.${payloadEncoded}.${signature}`
  },
  // Method to verify JWT receiving encoded token and secret
  verify(token, secret) {
    // Split token to verify and create new signature with secret argument
    const [header, payload, signature] = token.split('.')
    const newSignature = this._createSignature(header, payload, secret)
    // Compare old and new signatures
    if (newSignature === signature) {
      return this._base64Decode(payload)
    } else {
      throw new Error('Invalid token')
    }
  },
  // Private method to encode fron JSON object to base64url string
  _base64Encode(obj) {
    return Buffer.from(JSON.stringify(obj)).toString('base64').replace(/=/g, '')
  },
  // Private method to decode from base64url string to JSON object
  _base64Decode(str) {
    return JSON.parse(Buffer.from(str, 'base64').toString('utf8'))
  },
  // Private method to create signature with SHA256 algorithm.
  _createSignature(header, payload, secret) {
    const data = `${header}.${payload}`
    return crypto.createHmac('sha256', secret).update(data).digest('base64').replace(/=/g, '')
  }
}

const token1 = jwt.sign(json1_p, 'your-256-bit-secret')
const token2 = jwt.sign(json2_p, 'your-256-bit-secret')
const token3 = jwt.sign(json3_p, 'your-256-bit-secret')

// console.log(token1)
// console.log(token2)
// console.log(token3)

module.exports = jwt
