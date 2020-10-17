const { Router } = require('express')
const { getNewItem } = require('../controllers/new_item')

const router = Router()

router.get('/', getNewItem)

module.exports = router