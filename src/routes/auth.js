const route = require('express').Router()
const { loginController, signUpController, getResetCode, resetPasswordVerifiyResetCode, forgotPasswordController, signUpSellerController } = require('../controllers/auth')

route.post('/login', loginController)
route.post('/signup', signUpController)
route.post('/reset', getResetCode) // send reset code
route.post('/verify/reset', resetPasswordVerifiyResetCode) // verify reset code
route.post('/seller/signup', signUpSellerController)

module.exports = route
