const express = require('express')
const config = require('./appConfig')
const cookieParser = require('cookie-parser')
// middlewares
const notFoundHandler = require('./middlewares/notFound')
const httpErrorHandler = require('./middlewares/httpError')
// routers
const home = require('./routes/home')
const sexos = require('./routes/sexos')
const roles = require('./reoutes/roles')

const app = express()
app.set('port', config.app.port)
app.use(express.json())
app.use(cookieParser())

// reguistrar rutas
app.use('/api', home)
app.use('/api', sexos)
app.use('/api', roles)
// registrar middlewares
// registrar middlewares
app.use(notFoundHandler)
app.use(httpErrorHandler)

module.exports = app