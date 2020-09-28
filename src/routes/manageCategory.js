const { Router } = require('express')
const {
    read, 
    create, 
    getCategoryId,
    updateCategory,
    updateCategoryPartial,
    deleteCategory
} = require('../controllers/categoryController')

const authMiddleware = require('../middleware/auth')
// authMiddleware.authRole()  adalah cara untuk membatasi jika bukan admin maka tidak akan bisa mengakses route manages role

const router = Router()

// "id": 1,
// "name": "Super Admin",
// "description": "Responsible to manage roles",


router.get('/', read)
router.get('/:id', getCategoryId)
router.post('/', create)
router.put('/:id', updateCategory)
router.patch('/:id', updateCategoryPartial)
router.delete('/:id', deleteCategory)

module.exports = router