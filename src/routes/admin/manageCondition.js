const { Router } = require('express')
const {
  read,
  create,
  getConditionId,
  updateCondition,
  updateConditionPartial,
  deleteCondition
} = require('../../controllers/admin/conditionController')

const router = Router()

router.get('/', read)
router.get('/:id', getConditionId)
router.post('/', create)
router.put('/:id', updateCondition)
router.patch('/:id', updateConditionPartial)
router.delete('/:id', deleteCondition)

module.exports = router
