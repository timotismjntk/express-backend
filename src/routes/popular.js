const { Router } = require('express')
const { read } = require('../controllers/popular')

const router = Router()

router.get('/', read)

module.exports = router
