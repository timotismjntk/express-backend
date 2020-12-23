const { Router } = require('express')
const { getCategory, getDetailCategory, createCategory, updateCategory, updatePartialCategory, deleteCategory } = require('../../controllers/category')

const router = Router()

router.get('/', getCategory)
router.get('/:id', getDetailCategory)
router.post('/', createCategory)
router.put('/:id', updateCategory)
router.patch('/:id', updatePartialCategory)
router.delete('/:id', deleteCategory)

module.exports = router
