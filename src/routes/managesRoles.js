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

// "id": 1,
// "name": "Super Admin",
// "description": "Responsible to manage roles",


router.get('/', authMiddleware.authRole(1), read)
router.get('/:id', getRolesId)
router.post('/', create)
router.put('/:id', updateRoles)
router.patch('/:id', updateRolesPartial)
router.delete('/:id', deleteRoles)

module.exports = router