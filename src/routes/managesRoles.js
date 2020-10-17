const { Router } = require('express')
const {
    read, 
    create, 
    getRolesId,
    updateRoles,
    updateRolesPartial,
    deleteRoles
} = require('../controllers/rolesController')

const authMiddleware = require('../middleware/auth')
// authMiddleware.authRole()  adalah cara untuk membatasi jika bukan admin maka tidak akan bisa mengakses route manages role

const router = Router()

/*
{
    "id": 1,
    "name": "Super Admin",
    "description": "Responsible to manage roles",
    "created_at": "2020-09-26T06:44:47.000Z",
    "updated_at": "2020-09-26T06:54:04.000Z"
},
{
    "id": 2,
    "name": "Seller",
    "description": "Sell Product",
    "created_at": "2020-09-26T06:45:36.000Z",
    "updated_at": "2020-09-26T06:45:36.000Z"
},
{
    "id": 3,
    "name": "General User",
    "description": "Customer can buy and order",
    "created_at": "2020-09-26T06:55:05.000Z",
    "updated_at": "2020-09-27T16:16:31.000Z"
},
*/

router.get('/', authMiddleware.authRole(1), read)
router.get('/:id', authMiddleware.authRole(1), getRolesId)
router.post('/', authMiddleware.authRole(1), create)
router.put('/:id', authMiddleware.authRole(1), updateRoles)
router.patch('/:id', authMiddleware.authRole(1), updateRolesPartial)
router.delete('/:id', authMiddleware.authRole(1), deleteRoles)

module.exports = router