const { Router } = require('express')
const { getPopularItem } = require('../controllers/popular')

const router = Router()

router.get('/', getPopularItem)

module.exports = router