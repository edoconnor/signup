const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Main Page - Index')
})

module.exports = router