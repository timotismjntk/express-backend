const { Router } = require('express')
const {
    read, 
    create, 
    getUserId,
    updateUser,
    updateUserPartial,
    deleteUser
} = require('../controllers/usersController')

const authMiddleware = require('../middleware/auth')


const router = Router()

const uploadHelper = require('../helpers/upload')

router.get('/', read)
router.get('/:id', getUserId)
router.put('/:id', uploadHelper, updateUser)
router.put('/', uploadHelper, updateUser)
router.patch('/', uploadHelper, updateUserPartial)
router.patch('/:id', uploadHelper, updateUserPartial)
router.delete('/:id', authMiddleware.authRole(1), deleteUser)

module.exports = router