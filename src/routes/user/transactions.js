const { Router } = require('express')
const { createTransaction } = require('../../controllers/user/transactions')

const router = Router()

router.post('/', createTransaction)

module.exports = router
