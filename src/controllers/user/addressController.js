const joi = require('joi')
const responseStandard = require('../../helpers/response')
const { pagination } = require('../../helpers/pagination')
const addressModel = require('../../models/addressModel')

module.exports = {
  read: async (req, res) => {
    const { id } = req.user
    const count = await addressModel.countAddress()
    let { limit, page } = req.query
    if (!limit) {
      limit = 5
    } else {
      limit = parseInt(limit)
    }
    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }
    const offset = (page - 1) * limit
    const data = [id, limit, offset]
    const results = await addressModel.readAddress(data)
    const pageInfo = pagination(req.baseUrl, req.query, page, limit, count)
    return responseStandard(res, 'Showing Address', { results, pageInfo })
  },
  create: async (req, res) => {
    const { id } = req.user
    const schema = joi.object({
      place: joi.string().required(),
      recipient_name: joi.string().required(),
      recipient_number: joi.string().required(),
      address_name: joi.string().required(),
      postal_code: joi.string().required(),
      city: joi.string().required(),
      isPrimary: joi.number()
    })

    let { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      results = {
        ...results,
        user_id: id
      }
      const check = await addressModel.getAddressPrimaryByCondition({ user_id: id }, 1)
      if (check.length > 0) {
        if (results.isPrimary === 1) {
          const update = await addressModel.setAddressPrimary({ isPrimary: 0 }, [check[0].id, id])
          if (update.affectedRows) {
            const data = await addressModel.createAddress(results)
            if (data.affectedRows) {
              results = {
                id: data.insertId,
                ...results
              }
              return responseStandard(res, 'Create Address Successfully', { results }, 200, true)
            } else {
              return responseStandard(res, 'Failed to create Address', {}, 404, false)
            }
          }
        } else {
          const data = await addressModel.createAddress(results)
          if (data.affectedRows) {
            results = {
              id: data.insertId,
              ...results
            }
            return responseStandard(res, 'Create Address Successfully', { results }, 200, true)
          } else {
            return responseStandard(res, 'Failed to create Address', {}, 404, false)
          }
        }
      } else {
        if (results.isPrimary === 0) {
          const data = await addressModel.createAddress(results)
          if (data.affectedRows) {
            results = {
              id: data.insertId,
              ...results
            }
            return responseStandard(res, 'Create Address Successfully', { results }, 200, true)
          } else {
            return responseStandard(res, 'Failed to create Address', {}, 404, false)
          }
        } else {
          const data = await addressModel.createAddress(results)
          if (data.affectedRows) {
            results = {
              id: data.insertId,
              ...results
            }
            return responseStandard(res, 'Create Address Successfully', { results }, 200, true)
          } else {
            return responseStandard(res, 'Failed to create Address', {}, 404, false)
          }
        }
      }
    }
  },
  updateAddress: async (req, res) => {
    const { id: userId } = req.user
    const { id } = req.params
    const schema = joi.object({
      place: joi.string().required(),
      recipient_name: joi.string().required(),
      recipient_number: joi.string().required(),
      address_name: joi.string().required(),
      postal_code: joi.string().required(),
      city: joi.string().required()
    })
    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const update = await addressModel.updateAddress(results, userId, id)
      if (update.affectedRows) {
        return responseStandard(res, 'Address Has been Updated', {})
      } else {
        return responseStandard(res, 'Address Not found', {}, 404, false)
      }
    }
  },
  chooseAddressPrimary: async (req, res) => {
    const { id: userId } = req.user
    const { id: addressId } = req.params
    // search for address primary
    const data = await addressModel.getAddressPrimaryByCondition({ user_id: userId }, 1)
    if (data.length > 0) {
      if (Number(addressId) === data[0].id) {
        return responseStandard(res, 'Address is already set to primary before', { })
      } else {
        // set address to primary
        const update = await addressModel.setAddressPrimary({ isPrimary: 1 }, [addressId, userId])
        if (update.affectedRows) {
          // set old address to not primary
          await addressModel.setAddressPrimary({ isPrimary: 0 }, [data[0].id, userId])
          const results = await addressModel.getAddressByCondition([addressId, userId])
          return responseStandard(res, 'Success to select primary address', { results })
        } else {
          return responseStandard(res, 'Address not found', {})
        }
      }
    } else {
      // set address to primary
      const update = await addressModel.setAddressPrimary({ isPrimary: 1 }, [addressId, userId])
      if (update.affectedRows) {
      // set old address to not primary
        const results = await addressModel.getAddressByCondition([addressId, userId])
        return responseStandard(res, 'Success to select primary address', { results })
      } else {
        return responseStandard(res, 'Address not found', {})
      }
    }
  },
  updateAddressPartial: async (req, res) => {
    let { id } = req.user
    const schema = joi.object({
      place: joi.string(),
      recipient_name: joi.string(),
      recipient_number: joi.string(),
      address_name: joi.string(),
      postal_code: joi.string(),
      city: joi.string(),
      isPrimary: joi.number()
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      id = Number(id)
      if (results) {
        results = {
          ...results,
          user_id: id
        }
        const update = await addressModel.updateAddressPartial(results, id)
        if (update.affectedRows) {
          return responseStandard(res, 'Address Has been Updated', {})
        } else {
          return responseStandard(res, 'Address Not found', {}, 404, false)
        }
      } else {
        return responseStandard(res, 'At least fill one column!', '', 400, false)
      }
    }
  },
  getAddressId: async (req, res) => {
    const { id } = req.user
    const { isPrimary } = req.params
    const data = await addressModel.getAddressPrimaryByCondition({ user_id: id }, isPrimary)
    if (data.length > 0) {
      return responseStandard(res, 'Address', { data })
    } else {
      return responseStandard(res, 'Address Not found', {}, 404, false)
    }
  },
  getAddressById: async (req, res) => {
    const { id } = req.user
    const { id: addressId } = req.params
    const data = await addressModel.getAddressByCondition([addressId, id])
    if (data) {
      return responseStandard(res, 'Detail Address', { results: data })
    } else {
      return responseStandard(res, 'Address Not found', {}, 404, false)
    }
  },
  deleteAddress: async (req, res) => {
    const { id } = req.params
    const address = Number(id)
    const data = await addressModel.deleteAddress({ id: address })
    if (data.affectedRows) {
      return responseStandard(res, 'Address Has been deleted', {})
    } else {
      return responseStandard(res, 'Address Not found', {}, 404, false)
    }
  }
}
