const { Router } = require('express')
const {
  readCategory,
  create,
  getCategoryId,
  updateCategory,
  updateCategoryPartial,
  deleteCategory
} = require('../../controllers/admin/categoryController')

const authMiddleware = require('../../middleware/auth')
// authMiddleware.authRole()  adalah cara untuk membatasi jika bukan admin maka tidak akan bisa mengakses route manages role

const router = Router()

// "id": 1,
// "name": "Super Admin",
// "description": "Responsible to manage roles",

router.get('/', readCategory)
router.get('/:id', getCategoryId)
router.post('/', authMiddleware.authUser, authMiddleware.authRole(2), create)
router.put('/:id', authMiddleware.authUser, authMiddleware.authRole(2), updateCategory)
router.patch('/:id', authMiddleware.authUser, authMiddleware.authRole(2), updateCategoryPartial)
router.delete('/:id', deleteCategory)

module.exports = router
