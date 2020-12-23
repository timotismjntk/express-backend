const { Router } = require('express')
const { readMyOrders, detailOrders, createOrders } = require('../../controllers/user/orders')
const { createOrdersAndTransactions } = require('../../controllers/user/orderAndTransactions')

const router = Router()

router.get('/', readMyOrders)
router.get('/detail/:orderId', detailOrders)
router.post('/', createOrders)
router.post('/auto', createOrdersAndTransactions)

module.exports = router
