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
app.use(cors());
app.use(bodyParser.json())

const authMiddleware = require('./src/middleware/auth')

const itemsRouter = require('./src/routes/items')
const ratingRouter = require('./src/routes/rating')
const newItemRouter = require('./src/routes/new_item')
// const userRouter = require('./src/routes/User')
const cartRouter = require('./src/routes/cart')
const authRouter = require('./src/routes/auth')


// provide static file
app.use('/uploads', express.static('assets/uploads'))   // untuk bisa diakses secara static melalui browser


// middleware custom routes
app.use('/items', itemsRouter)
app.use('/new_item', newItemRouter)
app.use('/auth', authRouter)
// app.use('/user', userRouter)
app.use('/user/cart', authMiddleware.authUser, cartRouter)
// app.use('/customer', authMiddleware, LoginUserRouter)




// IMPORT ROUTES FOR MANAGE
const manageRoles = require('./src/routes/managesRoles')
const manageUsers = require('./src/routes/managesUser')
const manageProduct = require('./src/routes/manageProduct')
const manageCondition = require('./src/routes/manageCondition')
const manageCategory = require('./src/routes/manageCategory')
const newProduct = require('./src/routes/newProductRoutes')
const popularProduct = require('./src/routes/popular')
const colorProduct = require('./src/routes/productColor')
const imageProduct = require('./src/routes/productImage')
// const productDetail = require('./src/routes/manageProduct')
const address = require('./src/routes/addressRoute')
const publicRoute = require('./src/routes/publicRoutes.js')

// Define Routes for manage, admin responsible for this routes
app.use('/manage/roles', authMiddleware.authUser, manageRoles)
app.use('/manage/users', authMiddleware.authUser, manageUsers)
app.use('/manage/product', manageProduct) // authMiddleware.authUser,
app.use('/manage/color', colorProduct)
app.use('/manage/condition', manageCondition)
app.use('/manage/category', manageCategory)
app.use('/manage/image', imageProduct)
app.use('/manage/rating', ratingRouter)

// app.use('/product/detail:id', manageProduct.getProductDetail)
app.use('/users/address', authMiddleware.authUser, address)


//routes for customer who have account
const customerRouter = require('./src/routes/customer')
app.use('/profile', authMiddleware.authUser, customerRouter)

// public routes
app.use('/public', publicRoute)
app.use('/public/popular', popularProduct)

// Error 404 Pages
app.get('*', (req, res) => {
  responseStandard(res, 'Route Not Found', {}, 404, false)
})



app.listen(8080, () => {
  console.log('App Listening on port 8080')
})
