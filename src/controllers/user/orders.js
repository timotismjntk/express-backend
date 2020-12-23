const joi = require('joi')
const responseStandard = require('../../helpers/response')
const orderModel = require('../../models/orders')
const { v4: uuidv4 } = require('uuid')

module.exports = {
  createOrders: async (req, res) => {
    const { id } = req.user
    const schema = joi.object({
      tracking_number: joi.string(),
      summary: joi.number().required(),
      total_quantity: joi.number().required(),
      delivery_address: joi.string().required(),
      delivery_fee: joi.number().required()
    })

    let { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      try {
        let tracking = uuidv4()
        tracking = tracking.slice(0, 8)
        tracking = 'blanja' + tracking.toString()
        results = {
          ...results,
          tracking_number: tracking,
          userId: id
        }
        const data = await orderModel.createOrder(results)
        if (data.affectedRows) {
          results = {
            id: data.insertId,
            ...results
          }
          return responseStandard(res, 'Order Created Successfully', { results }, 200, true)
        } else {
          return responseStandard(res, 'Failed to create Order', {}, 401, false)
        }
      } catch (e) {
        return responseStandard(res, e.message, {}, 500, false)
      }
    }
  },
  readMyOrders: async (req, res) => {
    const { id } = req.user
    const results = await orderModel.read({ userId: id })
    if (results.length > 0) {
      return responseStandard(res, 'Showing All of your orders', { results })
    } else {
      return responseStandard(res, 'You dont have any orders', {}, 401, false)
    }
  },
  detailOrders: async (req, res) => {
    const { id } = req.user
    const { orderId } = req.params
    const results = await orderModel.detailOrder([id, orderId])
    if (results.length > 0) {
      return responseStandard(res, 'Showing Detail orders', { results })
    } else {
      return responseStandard(res, 'You dont have any orders', {}, 401, false)
    }
  }
}
