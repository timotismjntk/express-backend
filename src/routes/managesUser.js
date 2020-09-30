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
// router.post('/', uploadHelper.single('picture'), create)
router.put('/:id', updateUser)
router.put('/', updateUser)
router.patch('/:id', updateUserPartial)
router.delete('/:id', authMiddleware.authRole(1), deleteUser)

module.exports = router