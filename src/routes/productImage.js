const { Router } = require('express')
const {
    read, 
    create,
    getProductImageId,
    updateProductImage,
    updateProductImagePartial,
    deleteProductImage
} = require('../controllers/productImageController')

const authMiddleware = require('../middleware/auth')

// authMiddleware.authRole()  adalah cara untuk membatasi jika bukan admin maka tidak akan bisa mengakses route manages role

const router = Router()

router.get('/', read)
router.get('/:id', getProductImageId)
router.post('/', authMiddleware.authUser, authMiddleware.authRole(2), create)
router.put('/:id', authMiddleware.authUser, authMiddleware.authRole(2), updateProductImage)
// router.patch('/:id', authMiddleware.authUser, authMiddleware.authRole(2), updateProductImagePartial)
router.delete('/:id', deleteProductImage)

module.exports = router