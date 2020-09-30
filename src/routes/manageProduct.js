const { Router } = require('express')
const {
  read,
  create,
  getNewProduct,
  getProductId,
  updateProduct,
  updateProductPartial,
  deleteProduct
} = require('../controllers/productController')

const authMiddleware = require('../middleware/auth')
// authMiddleware.authRole()  //adalah cara untuk membatasi jika bukan admin maka tidak akan bisa mengakses route manages role

const router = Router()

// "id": 2,
// "name": "Seller",
// "description": "Responsible to product",

router.get('/', read)
router.get('/new/', getNewProduct)
router.get('/:id', getProductId)
router.post('/', authMiddleware.authRole(2), create)
router.put('/:id', authMiddleware.authRole(2), updateProduct)
router.patch('/:id', authMiddleware.authRole(2), updateProductPartial)
router.delete('/:id', authMiddleware.authRole(2), deleteProduct)

module.exports = router
