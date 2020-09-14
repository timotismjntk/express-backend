const { Router } = require('express')
const { getUser, getDetailUser, createUser, updateUser, updatePartialUser, deleteUser } = require('../controllers/user')

const router = Router()

router.get('/', getUser)
router.get('/:id', getDetailUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.patch('/:id', updatePartialUser)
router.delete('/:id', deleteUser)

module.exports = router
