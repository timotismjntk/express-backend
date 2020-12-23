const { Router } = require('express')
const {
  read,
  create,
  getProductId,
  updateProduct,
  updateProductPartial,
  deleteProduct
} = require('../../controllers/admin/productColorController')

const authMiddleware = require('../../middleware/auth')

const router = Router()

router.get('/', read)
router.get('/:id', getProductId)
router.post('/', create) // authMiddleware.authRole(2)
router.put('/:id', authMiddleware.authRole(2), updateProduct)
router.patch('/:id', authMiddleware.authRole(2), updateProductPartial)
router.delete('/:id', authMiddleware.authRole(2), deleteProduct)

module.exports = router
