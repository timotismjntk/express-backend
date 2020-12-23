const joi = require('joi')
const responseStandard = require('../../helpers/response')
const orderModel = require('../../models/orders')
const { v4: uuidv4 } = require('uuid')
const transactionModel = require('../../models/transactions')
const cartModel = require('../../models/cart')

module.exports = {
  createOrdersAndTransactions: async (req, res) => {
    const { id } = req.user
    const schema = joi.object({
      summary: joi.number().required(),
      delivery_address: joi.string().required(),
      delivery_fee: joi.number().required(),
      total_quantity: joi.number().required()
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
          const readChart = await cartModel.read({ user_id: id })
          console.log(results)
          if (readChart.length > 0) {
            readChart.forEach(async (el) => {
              const create = {
                order_id: data.insertId,
                product_id: el.product_id,
                quantity: el.quantity
              }
              console.log(create)
              await transactionModel.createTransaction(create)
            })
            const deleteAllCart = await cartModel.deleteAllCart(id)
            if (deleteAllCart.affectedRows) {
              console.log(results)
              return responseStandard(res, 'Order and transaction Created Successfully', { results }, 200, true)
            }
          }
        } else {
          return responseStandard(res, 'Failed to create Order nd transactions', {}, 401, false)
        }
      } catch (e) {
        return responseStandard(res, e.message, {}, 500, false)
      }
    }
  }
}
