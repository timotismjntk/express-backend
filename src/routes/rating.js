const { Router } = require('express')
const {
    readRating, 
    create,
    getRatingId,
    updateRating,
    updateRatingPartial,
    deleteRating
} = require('../controllers/rating')

// const authMiddleware = require('../middleware/auth')
// authMiddleware.authRole()  adalah cara untuk membatasi jika bukan admin maka tidak akan bisa mengakses route manages role

const router = Router()

// "id": 1,
// "name": "Super Admin",
// "description": "Responsible to manage roles",




router.get('/', readRating)
router.get('/:id', getRatingId)
router.post('/', create)
router.put('/:id', updateRating)
router.patch('/:id', updateRatingPartial)
router.delete('/:id', deleteRating)

module.exports = router