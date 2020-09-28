const { Router } = require('express')
const {
    read, 
    create, 
    getUserId,
    updateUser,
    updateUserPartial,
    deleteUser
} = require('../controllers/usersController')

const router = Router()

const uploadHelper = require('../helpers/upload')

router.get('/', read)
router.get('/:id', getUserId)
router.post('/', uploadHelper.single('picture'), create)
router.put('/:id', uploadHelper.single('picture'), updateUser)
router.patch('/:id', updateUserPartial)
router.delete('/:id', deleteUser)

module.exports = router