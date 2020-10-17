const { Router } = require('express')
const { getDetailProduct, createProduct, getProduct, updateProduct, updatePartial, deleteProduct } = require('../controllers/products')

const router = Router()

router.get('/', getProduct)
router.get('/:id', getDetailProduct)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.patch('/:id', updatePartial)
router.delete('/:id', deleteProduct)

module.exports = router
