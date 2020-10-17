const route = require('express').Router();
const {loginController, signUpController, forgotPasswordController, signUpSellerController } = require('../controllers/auth')

route.post('/login', loginController)
route.post('/signup', signUpController)
route.patch('/forgot_password', forgotPasswordController)
route.post('/seller/signup', signUpSellerController)

module.exports = route