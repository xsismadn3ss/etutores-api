const express = require('express')
const router = express.Router()

router.get('/', async(req, res)=>{
    res.status(200).json({
        'details': 'Hello world 👋'
    })
})

module.exports = router