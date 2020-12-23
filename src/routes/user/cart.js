const { Router } = require('express')
const { cart, checkout, create, updateCart, updateCartPartial, deleteCart } = require('../../controllers/user/cart')

const router = Router()

router.get('/', cart)
router.get('/checkout', checkout)
// router.get('/:id', getDetailCart)
router.post('/', create)
router.put('/', updateCart)
router.patch('/', updateCartPartial)
router.delete('/:product_id', deleteCart)

module.exports = router
