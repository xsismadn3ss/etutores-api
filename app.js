const express = require('express')
const config = require('./config')
// middlewares
const notFoundHandler = require('./middlewares/notFound')
const httpErrorHandler = require('./middlewares/httpError')
// routers
const home = require('./routes/home')

const app = express()
app.set('port', config.app.port)
app.use(express.json())

// reguistrar rutas
app.use('/api', home)
// registrar middlewares
app.use(notFoundHandler)
app.use(httpErrorHandler)

module.exports = app