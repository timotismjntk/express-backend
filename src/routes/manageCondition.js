const { Router } = require('express')
const {
    read, 
    create, 
    getConditionId,
    updateCondition,
    updateConditionPartial,
    deleteCondition
} = require('../controllers/conditionController')

const authMiddleware = require('../middleware/auth')
// authMiddleware.authRole()  adalah cara untuk membatasi jika bukan admin maka tidak akan bisa mengakses route manages role

const router = Router()

// "id": 1,
// "name": "Super Admin",
// "description": "Responsible to manage roles",


router.get('/', read)
router.get('/:id', getConditionId)
router.post('/', create)
router.put('/:id', updateCondition)
router.patch('/:id', updateConditionPartial)
router.delete('/:id', deleteCondition)

module.exports = router