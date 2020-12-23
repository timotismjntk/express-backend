const responseStandard = require('../../helpers/response')
const transactionModel = require('../../models/transactions')

module.exports = {
  createTransaction: async (req, res) => {
    const { order_id: orderId, product_id: productId, quantity } = req.body
    try {
      if (orderId && productId && quantity) {
        let create = {
          order_id: orderId,
          product_id: productId,
          quantity: quantity
        }
        const data = await transactionModel.createTransaction(create)
        if (data.affectedRows) {
          create = {
            ...create,
            id: data.insertId
          }
          return responseStandard(res, 'Transaction Created Successfully', { create }, 200, true)
        } else {
          return responseStandard(res, 'Failed to create Transaction', {}, 401, false)
        }
      } else {
        return responseStandard(res, 'you must fill all column', {}, 401, false)
      }
    } catch (e) {
      return responseStandard(res, e.message, {}, 500, false)
    }
  }
}
