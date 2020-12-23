const { Router } = require('express')
const {
  detailProfile,
  updateProfile,
  resetUsersPassword
} = require('../../controllers/user/customerController.js')

const authMiddleware = require('../../middleware/auth')

const router = Router()

const uploadHelper = require('../../helpers/upload')

router.get('/', authMiddleware.authUser, detailProfile)
router.patch('/update', authMiddleware.authUser, uploadHelper, updateProfile)
router.patch('/reset', resetUsersPassword)

module.exports = router
