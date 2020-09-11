const express = require('express')

const app = express()

const bodyParser = require('body-parser')

const itemsRouter = require('./src/routes/items')

app.use(bodyParser.urlencoded({
  extended: true
}))
// middleware
app.use('/items', itemsRouter)

app.listen(8080, () => {
  console.log('App Listening on port 8080')
})
