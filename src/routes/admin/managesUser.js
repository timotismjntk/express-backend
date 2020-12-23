const { Router } = require('express')
const {
  read,
  create,
  getUserId,
  updateUser,
  updateUserPartial,
  resetPassword,
  deleteUser
} = require('../../controllers/admin/managesUserController.js')

const authMiddleware = require('../../middleware/auth')

const router = Router()

const uploadHelper = require('../../helpers/upload')

router.get('/', authMiddleware.authUser, read)
router.get('/:id', authMiddleware.authUser, getUserId)
router.put('/:id', authMiddleware.authUser, uploadHelper, updateUser)
router.put('/', authMiddleware.authUser, uploadHelper, updateUser)
router.patch('/', authMiddleware.authUser, uploadHelper, updateUserPartial)
router.patch('/:id', authMiddleware.authUser, uploadHelper, updateUserPartial)
router.delete('/:id', authMiddleware.authRole(1), deleteUser)

module.exports = router
