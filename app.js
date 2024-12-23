const express = require('express')
const config = require('./config')

const app = express()
app.set('port', config.app.port)
app.use(express.json())


app.use('/',async (req, res)=>{
    return res.status(200).json(
        {
            'details': 'Hello world 👋'
        }
    )
})

module.exports = app