const joi = require('joi')
const responseStandard = require('../../helpers/response')
const cartModel = require('../../models/cart')

module.exports = {
  create: async (req, res) => {
    const { id } = req.user
    const schema = joi.object({
      product_id: joi.number().required(),
      quantity: joi.number().required()
    })

    let { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { product_id: productId, quantity } = results

      const checkCartExist = await cartModel.getCartByCondition([productId, id])
      if (checkCartExist.length > 0) {
        const check = await cartModel.getPrice(productId)
        const Sum = check[0].price * checkCartExist[0].summary
        results = {
          quantity: quantity + checkCartExist[0].quantity,
          summary: Sum
        }
        const update = await cartModel.updateCart(results, id, productId)
        if (update.affectedRows) {
          return responseStandard(res, 'Product added to cart successfuly', { results })
        } else {
          return responseStandard(res, 'Cart Not found', {}, 401, false)
        }
      } else {
        const check = await cartModel.getPrice(productId)
        const Sum = check[0].price * quantity
        results = {
          ...results,
          user_id: id,
          summary: Sum
        }
        const data = await cartModel.createCart(results)
        if (data.affectedRows) {
          results = {
            id: data.insertId,
            ...results
          }
          return responseStandard(res, 'Product added to cart successfuly', { results }, 200, true)
        } else {
          return responseStandard(res, 'Failed to create Cart', {}, 401, false)
        }
      }
    }
  },

  updateCart: async (req, res) => {
    const { id } = req.user
    const schema = joi.object({
      product_id: joi.string().required(),
      quantity: joi.number().required()
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { product_id: productId, quantity } = results
      console.log(productId)
      const check = await cartModel.getPrice(productId)
      console.log(check)
      const Sum = check[0].price * quantity
      console.log(Sum)
      results = {
        ...results,
        summary: Sum
      }
      console.log(id)
      const update = await cartModel.updateCart(results, id, productId)
      if (update.affectedRows) {
        return responseStandard(res, 'Cart Has been Updated', {})
      } else {
        return responseStandard(res, 'Cart Not found', {}, 401, false)
      }
    }
  },

  updateCartPartial: async (req, res) => {
    const { id } = req.user
    const schema = joi.object({
      product_id: joi.string(),
      quantity: joi.number()
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { product_id: productId, quantity } = results
      if (productId || quantity) {
        if (productId) {
          console.log(productId)
          const check = await cartModel.getPrice(productId)
          const Sum = check[0].price * quantity
          console.log(Sum)
          results = {
            ...results,
            summary: Sum
          }
          const update = await cartModel.updateCartPartial(results, id)
          if (update.affectedRows) {
            return responseStandard(res, 'Cart Has been Updated', {})
          } else {
            return responseStandard(res, 'Cart Not found', {}, 401, false)
          }
        } else if (quantity) {
          const data = await cartModel.getPrice({ productId })
          const Sum = data.price * quantity
          results = {
            ...results,
            summary: Sum
          }
          const update = await cartModel.updateCartPartial(results, id)
          if (update.affectedRows) {
            return responseStandard(res, 'Cart Has been Updated', {})
          } else {
            return responseStandard(res, 'Cart Not found', {}, 401, false)
          }
        }
        const update = await cartModel.updateCartPartial(results, id)
        if (update.affectedRows) {
          return responseStandard(res, 'Cart Has been Updated', {})
        } else {
          return responseStandard(res, 'Cart Not found', {}, 401, false)
        }
      } else {
        return responseStandard(res, 'At least fill one column!', '', 400, false)
      }
    }
  },

  cart: async (req, res) => {
    const { id } = req.user
    let hasil = 0
    console.log(id)
    const results = await cartModel.read({ user_id: id })
    results.forEach(x => {
      hasil += x.summary
    })
    // console.log(results)
    if (results.length > 0) {
      return responseStandard(res, `Cart from user with id ${id}`, { results, totalSummary: hasil })
    } else {
      return responseStandard(res, 'Cart Not found', {}, 401, false)
    }
  },

  deleteCart: async (req, res) => {
    const { id } = req.user
    const { product_id: productId } = req.params
    // console.log(uid)
    const data = await cartModel.deleteCart(id, productId)
    if (data.affectedRows) {
      return responseStandard(res, 'Cart Has been deleted', {})
    } else {
      return responseStandard(res, 'Cart Not found', {}, 401, false)
    }
  },

  checkout: async (req, res) => {
    const { id } = req.user
    const readChart = await cartModel.read({ user_id: id })
    var hasil = 0
    var quantity = 0
    readChart.forEach(x => {
      hasil += x.summary
      quantity += x.quantity
    })
    const data = await cartModel.checkOut({ user_id: Number(id) })
    if (data.length > 0) {
      return responseStandard(res, 'Checkout', { data, totalPrice: hasil, delivery: 10000, totalQuantity: quantity })
    } else {
      return responseStandard(res, 'You dont have any checkouts', {}, 401, false)
    }
  }
}
