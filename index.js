require('dotenv').config()
const responseStandard = require('./src/helpers/response.js')
const express = require('express')

const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')
/* ------------------------------------  */
/* -----------middleware untuk otentikasi user-------------  */
// const jwt = require('jsonwebtoken')
/* ------------------------------------  */
// process.env.SECRET_KEY = 'secret'
/* ------------------------------------  */
// module middleware node
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cors())
app.use(bodyParser.json())

// provide static file
app.use('/uploads', express.static('assets/uploads')) // untuk bisa diakses secara static melalui browser

// middleware
const authMiddleware = require('./src/middleware/auth')

// IMPORT ROUTES FOR MANAGE
const manageRoles = require('./src/routes/admin/managesRoles')
const manageUsers = require('./src/routes/admin/managesUser')
const manageProduct = require('./src/routes/admin/manageProduct')
const manageCondition = require('./src/routes/admin/manageCondition')
const manageCategory = require('./src/routes/admin/manageCategory')
const colorProduct = require('./src/routes/admin/productColor')
const imageProduct = require('./src/routes/admin/productImage')
const ratingRouter = require('./src/routes/admin/rating')

// Define Routes for manage, admin responsible for this routes
app.use('/manage/roles', authMiddleware.authUser, manageRoles)
app.use('/manage/users', manageUsers)
app.use('/manage/product', manageProduct) // authMiddleware.authUser,
app.use('/manage/color', colorProduct)
app.use('/manage/condition', manageCondition)
app.use('/manage/category', manageCategory)
app.use('/manage/image', imageProduct)
app.use('/manage/rating', ratingRouter)

// auth
const authRouter = require('./src/routes/auth')

// routes auth
app.use('/auth', authRouter)

// Routes for user
const address = require('./src/routes/user/addressRoute')
const cartRouter = require('./src/routes/user/cart')
const transactionRouter = require('./src/routes/user/transactions')
const customerRouter = require('./src/routes/user/customer')
const ordersRouter = require('./src/routes/user/orders')

// routes for customer who have account
app.use('/profile', customerRouter)
app.use('/transaction', transactionRouter)
app.use('/user/cart', authMiddleware.authUser, cartRouter)
app.use('/users/address', authMiddleware.authUser, address)
app.use('/order', authMiddleware.authUser, ordersRouter)

// routes
const publicRoute = require('./src/routes/public/publicRoutes.js')

// public routes
app.use('/public', publicRoute)

// Error 404 Pages
app.get('*', (req, res) => {
  responseStandard(res, 'Route Not Found', {}, 404, false)
})

app.listen(8080, () => {
  console.log('App Listening on port 8080')
})
