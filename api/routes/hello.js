// Dependencies
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('API is working properly' + req.session.login_status)
})

module.exports = router