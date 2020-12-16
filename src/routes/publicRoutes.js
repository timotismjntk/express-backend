const { Router } = require('express')
const {
  read,
  getProductId,
  getDetailProduct,
  popularProduct
} = require('../controllers/productController')

const {
    readNew
} = require('../controllers/newProductController')

const {readPopular} = require('../controllers/popular')

const {
    readCategory,
    getCategoryId
} = require('../controllers/categoryController')

const authMiddleware = require('../middleware/auth')
// authMiddleware.authRole()  //adalah cara untuk membatasi jika bukan admin maka tidak akan bisa mengakses route manages role

const router = Router()

// "id": 2,
// "name": "Seller",
// "description": "Responsible to product",

router.get('/', read)
router.get('/product/new/', readNew)
router.get('/product/popular', readPopular)
router.get('/product/category', readCategory)
router.get('/product/category/:id', getCategoryId)
router.get('/:id', getProductId)
router.get('/product/:id', getDetailProduct)

module.exports = router
