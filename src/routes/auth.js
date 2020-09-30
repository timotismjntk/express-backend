const route = require('express').Router();
const {loginController, signUpController, signUpSellerController } = require('../controllers/auth')

route.post('/login', loginController)
route.post('/signup', signUpController)
route.post('/seller/signup', signUpSellerController)

module.exports = route