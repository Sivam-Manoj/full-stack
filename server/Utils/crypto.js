const crypto = require("crypto")


const secret_key = crypto.randomBytes(128).toString('base64')

console.log(secret_key)