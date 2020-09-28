const { Router } = require('express')
const {
    read
} = require('../controllers/newProductController')

// const authMiddleware = require('../middleware/auth')
// authMiddleware.authRole()  adalah cara untuk membatasi jika bukan admin maka tidak akan bisa mengakses route manages role

const router = Router()

// "id": 1,
// "name": "Super Admin",
// "description": "Responsible to manage roles",




router.get('/', read)

module.exports = router