const jwt = require('jsonwebtoken')
const config = require('../appConfig').jwt

function generateToken(payload){
    const accessToken = jwt.sign(payload, config.secret, {
        algorithm: config.algorithm
    })
    return accessToken
}

function decodeToken(token){
    const decoded = jwt.verify(token, config.secret)
    return decoded
}

module.exports = {
    generateToken, decodeToken
}