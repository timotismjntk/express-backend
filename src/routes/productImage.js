const { Router } = require('express')
const {
    read, 
    create,
    getProductImageId,
    updateProductImage,
    updateProductImagePartial,
    deleteProductImage
} = require('../controllers/productImageController')

const uploadHelper = require('../helpers/upload')
const multer = require('multer')

const authMiddleware = require('../middleware/auth')
// authMiddleware.authRole()  adalah cara untuk membatasi jika bukan admin maka tidak akan bisa mengakses route manages role

const router = Router()

router.get('/', read)
router.get('/:id', getProductImageId)
router.post('/', uploadHelper, authMiddleware.authRole(2), create)
router.put('/:id', uploadHelper, authMiddleware.authRole(2), updateProductImage)
router.patch('/:id', uploadHelper, authMiddleware.authRole(2), updateProductImagePartial)
router.delete('/:id', authMiddleware.authRole(2), deleteProductImage)

module.exports = router