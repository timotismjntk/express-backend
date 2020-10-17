const { Router } = require('express')
const {createUser, userLogin} = require('../controllers/user')

const router = Router()

// const user = require('../models/user')

// router.get('/', getUser)
// router.get('/:id', getDetailUser)
router.post('/', createUser)
router.post('/login', userLogin)
// router.put('/:id', updateUser)
// router.patch('/', updatePartialUser)
// router.delete('/:id', deleteUser)

module.exports = router
