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

// const authMiddleware = require('../middleware/auth')
// authMiddleware.authRole()  adalah cara untuk membatasi jika bukan admin maka tidak akan bisa mengakses route manages role

const router = Router()

// "id": 1,
// "name": "Super Admin",
// "description": "Responsible to manage roles",




router.get('/', read)
router.get('/new/', getNewProduct)
router.get('/:id', getProductId)
router.post('/', create)
router.put('/:id', updateProduct)
router.patch('/:id', updateProductPartial)
router.delete('/:id', deleteProduct)

module.exports = router