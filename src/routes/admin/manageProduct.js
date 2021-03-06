const { Router } = require('express')
const {
  read,
  create,
  getNewProduct,
  getProductId,
  getDetailProduct,
  updateProduct,
  updateProductPartial,
  deleteProduct
} = require('../../controllers/admin/productController')

const authMiddleware = require('../../middleware/auth')

const router = Router()

router.get('/', read) // authMiddleware.authRole(2)
router.get('/new/', authMiddleware.authRole(2), getNewProduct)
router.get('/:id', getProductId) // authMiddleware.authRole(2)
router.get('/detail/:id', authMiddleware.authRole(2), getDetailProduct)
router.post('/', create)
router.put('/:id', authMiddleware.authRole(2), updateProduct)
router.patch('/:id', updateProductPartial) // authMiddleware.authRole(2)
router.delete('/:id', deleteProduct) // authMiddleware.authRole(2), 

module.exports = router
