const { Router } = require('express')
const {
  read,
  create,
  getAddressId,
  getAddressById,
  chooseAddressPrimary,
  updateAddress,
  updateAddressPartial,
  deleteAddress
} = require('../../controllers/user/addressController')

const router = Router()

router.get('/', read)
router.get('/:isPrimary', getAddressId)
router.get('/get/:id', getAddressById)
router.get('/choose/primary/:id', chooseAddressPrimary)
router.post('/', create)
router.patch('/:id', updateAddress)
router.put('/', updateAddressPartial)
router.delete('/:id', deleteAddress)

module.exports = router
