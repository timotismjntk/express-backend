const { Router } = require('express')
const {
    detailProfile, 
    updateProfile
} = require('../controllers/customerController.js')

const authMiddleware = require('../middleware/auth')


const router = Router()

const uploadHelper = require('../helpers/upload')

router.get('/', detailProfile)
router.patch('/update', uploadHelper, updateProfile)

module.exports = router