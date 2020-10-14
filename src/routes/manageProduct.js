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
} = require('../controllers/productController')

const authMiddleware = require('../middleware/auth')
// authMiddleware.authRole()  //adalah cara untuk membatasi jika bukan admin maka tidak akan bisa mengakses route manages role

const router = Router()

// "id": 2,
// "name": "Seller",
// "description": "Responsible to product",

router.get('/', read) // authMiddleware.authRole(2)
router.get('/new/', authMiddleware.authRole(2), getNewProduct)
router.get('/:id', getProductId)  // authMiddleware.authRole(2)
router.get('/detail/:id', authMiddleware.authRole(2), getDetailProduct)
router.post('/', authMiddleware.authUser, authMiddleware.authRole(2), create)
router.put('/:id', authMiddleware.authRole(2), updateProduct)
router.patch('/:id', updateProductPartial) // authMiddleware.authRole(2)
router.delete('/:id', deleteProduct) // authMiddleware.authRole(2), 

module.exports = router
