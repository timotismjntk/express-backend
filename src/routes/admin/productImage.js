const { Router } = require('express')
const {
  read,
  create,
  getProductImageId,
  updateProductImage,
  deleteProductImage
} = require('../../controllers/admin/productImageController')

const authMiddleware = require('../../middleware/auth')

const router = Router()

router.get('/', read)
router.get('/:id', getProductImageId)
router.post('/', authMiddleware.authUser, authMiddleware.authRole(2), create)
router.put('/:id', authMiddleware.authUser, authMiddleware.authRole(2), updateProductImage)
router.delete('/:id', deleteProductImage)

module.exports = router
