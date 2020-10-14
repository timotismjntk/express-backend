const joi = require('joi')
const responseStandard = require('../helpers/response')
const paging = require('../helpers/pagination')
const addressModel = require('../models/addressModel')

module.exports = {
  read: async (req, res) => {
      let {id} = req.user
    const count = await addressModel.countAddress()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const results = await addressModel.readAddress([limit, offset])
    return responseStandard(res, 'Showing Address', {results, pageInfo})
  },
  create: async(req, res) => {
      let {id} = req.user
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
          return responseStandard(res, 'Error', {error: error.message}, 400, false)
      } else {
              results = {
                ...results,
                user_id: id
              }
              const data = await addressModel.createAddress(results)
              if (data.affectedRows) {
                  results = {
                      id: data.insertId,
                      ...results,
                  }
                  return responseStandard(res, 'Create Condition Successfully', { results }, 200, true)
              } else {
                  return responseStandard(res, 'Failed to create Condition', {}, 401, false)
              }
      }
  },
  updateAddress: async(req, res) => {
    let {id} = req.user
    const schema = joi.object({
        place: joi.string().required(),
        recipient_name: joi.string().required(),
        recipient_number: joi.string().required(),
        address_name: joi.string().required(),
        postal_code: joi.string().required(),
        city: joi.string().required(),
        isPrimary: joi.number(),
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
        return responseStandard(res, 'Error', {error: error.message}, 400, false)
    }else {
        results = {
            ...results,
            user_id: id
          }
      let { name, quantity, price, description, condition_id, category_id } = results
      const update = await addressModel.updateAddress(results, id)
      // console.log(results)
      if(update.affectedRows) {
          return responseStandard(res, `Address Has been Updated`, {})
      } else {
          return responseStandard(res, 'Address Not found', {}, 401, false)
      }
    }
  },
  updateAddressPartial: async (req, res) => {
    let {id} = req.user
      const schema = joi.object({
          place: joi.string(),
          recipient_name: joi.string(),
          recipient_number: joi.string(),
          address_name: joi.string(),
          postal_code: joi.string(),
          city: joi.string(),
          isPrimary: joi.number(),
      })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
        return responseStandard(res, 'Error', {error: error.message}, 400, false)
    }else {
        
    let { place, recipient_name, recipient_number, address_name, postal_code, city, isPrimary } = results
        id = Number(id)
        if (place || recipient_name || recipient_number || address_name || postal_code || city || isPrimary){
            results = {
                ...results,
                user_id: id
              }
            const update = await addressModel.updateAddressPartial(results, id )
            if(update.affectedRows) {
                return responseStandard(res, `Address Has been Updated`, {})
            } else {
                return responseStandard(res, 'Address Not found', {}, 401, false)
            }
        } else {
            return responseStandard(res, 'At least fill one column!', '', 400, false)
        }
    }
},
  getAddressId: async (req, res) => {
      const { id } = req.user
      const { isPrimary } = req.params
      const data = await addressModel.getAddressPrimaryByCondition({user_id: id}, isPrimary)
      if(data.length > 0) {
          return responseStandard(res, `Address`, {data})
      } else {
          return responseStandard(res, 'Address Not found', {}, 401, false)
      }
  },
  getAddress: async (req, res) => {
    const { id } = req.user
    const data = await addressModel.getAddressByCondition({ user_id: id })
    if(data.length > 0) {
        return responseStandard(res, `Address`, {data})
    } else {
        return responseStandard(res, 'Address Not found', {}, 401, false)
    }
},
  deleteAddress: async (req, res) => {
      const { id } = req.params
      let condition_id  = Number(id)
      // console.log(uid)
      const data = await addressModel.deleteAddress({id: condition_id})
      if(data.affectedRows){
          return responseStandard(res, `Address Has been deleted`, {})
      } else {
          return responseStandard(res, 'Address Not found', {}, 401, false)
      }
    }
}
