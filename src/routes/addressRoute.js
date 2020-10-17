const { Router } = require('express')
const {
    read, 
    create,
    getAddress, 
    getAddressId,
    updateAddress,
    updateAddressPartial,
    deleteAddress
} = require('../controllers/addresController')

const authMiddleware = require('../middleware/auth')
// authMiddleware.authRole()  adalah cara untuk membatasi jika bukan admin maka tidak akan bisa mengakses route manages role

const router = Router()

// "id": 1,
// "name": "Super Admin",
// "description": "Responsible to manage roles",


router.get('/', getAddress)
router.get('/:isPrimary', getAddressId)
// router.get('/')
router.post('/', create)
router.put('/', updateAddress)
router.patch('/', updateAddressPartial)
router.delete('/:id', deleteAddress)

module.exports = router