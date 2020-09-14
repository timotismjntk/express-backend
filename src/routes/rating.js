const { Router } = require('express')
const { getRating, getDetailRating, createRating, updateRating, updatePartialRating, deleteRating } = require('../controllers/rating')

const router = Router()

router.get('/', getRating)
router.get('/:id', getDetailRating)
router.post('/', createRating)
router.put('/:id', updateRating)
router.patch('/:id', updatePartialRating)
router.delete('/:id', deleteRating)

module.exports = router
