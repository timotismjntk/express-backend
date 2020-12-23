const { Router } = require('express')
const {
  read,
  getProductId,
  getDetailProduct,
  popularProduct,
  newProduct
} = require('../../controllers/public/productController')

const {
  readCategory,
  getCategoryId
} = require('../../controllers/public/categoryController')
const router = Router()

router.get('/', read)
router.get('/product/new/', newProduct)
router.get('/product/popular', popularProduct)
router.get('/product/category', readCategory)
router.get('/product/category/:id', getCategoryId)
router.get('/:id', getProductId)
router.get('/product/:id', getDetailProduct)

module.exports = router
