const express = require('express')

const app = express()

const bodyParser = require('body-parser')

const itemsRouter = require('./src/routes/items')
const productsRouter = require('./src/routes/products')
const categoryRouter = require('./src/routes/category')
const ratingRouter = require('./src/routes/rating')
const newItemRouter = require('./src/routes/new_item')
const popularRouter = require('./src/routes/popular')
const userRouter = require('./src/routes/user')

// module middleware node
app.use(bodyParser.urlencoded({
  extended: true
}))
// middleware custom
app.use('/items', itemsRouter)
app.use('/products', productsRouter)
app.use('/category', categoryRouter)
app.use('/ratings', ratingRouter)
app.use('/new_item', newItemRouter)
app.use('/popular', popularRouter)
app.use('/user', userRouter)

app.listen(8080, () => {
  console.log('App Listening on port 8080')
})
