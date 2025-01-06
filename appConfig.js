const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    app: {
        port: process.env.PORT || 3000
    },
    env: process.env.NODE_ENV || 'development',
    jwt: {
        secret: process.env.SECRET_KEY,
        algorithm: 'HS256',
    }
}