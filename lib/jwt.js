// Own JSON Web Token library
// Import crypto module to use sha256 algorithm
const crypto = require('crypto')


const jwt = {
  // Method to create JWT receiving payload and secret
  sign(payload, secret) {
    // Build three components tha makes up the token
    const header = this._base64Encode({
      'alg': 'HS256',
      'typ': 'JWT'
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

module.exports = jwt
