const { Router } = require('express')
const { readPopular } = require('../controllers/popular')

const router = Router()

router.get('/', readPopular)

module.exports = router
