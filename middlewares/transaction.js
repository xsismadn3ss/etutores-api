const sequelize = require('../config/dbConfig')
const { request, response } = require('express')

// middleware para descartar cambios en la base de datos si un petición da error
const transaciontMiddleware = async (req = request, res = response, next) => {
    const transaction = await sequelize.transaction()
    req.transaction = transaction

    res.on('finish', async () => {
        if (res.statusCode >= 200 && res.status < 300) {
            await transaction.commit()
        } else {
            await transaction.rollback()
        }
    })
    next()
}

module.exports = { transaciontMiddleware }