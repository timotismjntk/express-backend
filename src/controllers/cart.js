const qs = require('querystring')
const joi = require('joi')
const responseStandard = require('../helpers/response')
const cartModel = require('../models/cart')

module.exports = {

  create: async(req, res) => {
    // const average = await cartModel.sumProduct()
    let { id } = req.user
    const schema = joi.object({
      product_id: joi.number().required(),
      quantity: joi.number().required()
    })

    let { value: results, error } = schema.validate(req.body)
    if (error) {
        return responseStandard(res, 'Error', {error: error.message}, 400, false)
    } else {
    
      let {product_id, quantity} = results

      const checkCartExist = await cartModel.getCartByCondition([product_id, id])
      // console.log(checkCartExist[0].quantity)
      // console.log(product_id)
      
      console.log(checkCartExist)
      if(checkCartExist.length > 0) {
          const check = await cartModel.getPrice(product_id)
          console.log('sudah ada')
          let Sum = check[0].price * quantity
                results = {
                  quantity: quantity+checkCartExist[0].quantity,
                  summary: Sum
                }
                console.log(id)
          const update = await cartModel.updateCart(results, id, product_id)
          // console.log(results)
          if(update.affectedRows) {
              return responseStandard(res, `Cart Has been Updated`, {})
          } else {
              return responseStandard(res, 'Cart Not found', {}, 401, false)
          }
      } else {
        const check = await cartModel.getPrice(product_id)
        // console.log(check[0].price)
        let Sum = check[0].price * quantity
        // console.log(Sum)
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
                  return responseStandard(res, 'Create Cart Successfully', { results }, 200, true)
              } else {
                  return responseStandard(res, 'Failed to create Cart', {}, 401, false)
              }
        }
    }
  },

  updateCart: async(req, res) => {
    let { id } = req.user
    const schema = joi.object({
      product_id: joi.string().required(),
      quantity: joi.number().required()
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
        return responseStandard(res, 'Error', {error: error.message}, 400, false)
    }else {
      // let { name, quantity, price, description, condition_id, category_id } = results
      let {product_id, quantity} = results
      console.log(product_id)
      const check = await cartModel.getPrice(product_id)
      console.log(check)
      let Sum = check[0].price * quantity
      console.log(Sum)
            results = {
              ...results,
              summary: Sum
            }
            console.log(id)
      const update = await cartModel.updateCart(results, id, product_id)
      // console.log(results)
      if(update.affectedRows) {
          return responseStandard(res, `Cart Has been Updated`, {})
      } else {
          return responseStandard(res, 'Cart Not found', {}, 401, false)
      }
    }
  },

  updateCartPartial: async (req, res) => {
    let { id } = req.user
    const schema = joi.object({
      product_id: joi.string(),
      quantity: joi.number()
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
        return responseStandard(res, 'Error', {error: error.message}, 400, false)
    } else {
        
    let { product_id,  quantity } = results
        if (product_id || quantity){
          if(product_id) {
            console.log(product_id)
            const check = await cartModel.getPrice(product_id)
            // console.log(check[0].price)
            let Sum = check[0].price * quantity
            console.log(Sum)
            results = {
              ...results,
              summary: Sum
            }
              const update = await cartModel.updateCartPartial(results, id )
              if(update.affectedRows) {
                  return responseStandard(res, `Cart Has been Updated`, {})
              } else {
                  return responseStandard(res, 'Cart Not found', {}, 401, false)
              }
          } else if(quantity) {
            const data = await cartModel.getPrice({product_id})
            let Sum = data.price * quantity
                  results = {
                    ...results,
                    summary: Sum
                  }
            const update = await cartModel.updateCartPartial(results, id )
            if(update.affectedRows) {
                return responseStandard(res, `Cart Has been Updated`, {})
            } else {
                return responseStandard(res, 'Cart Not found', {}, 401, false)
            }
          }
            const update = await cartModel.updateCartPartial(results, id )
            if(update.affectedRows) {
                return responseStandard(res, `Cart Has been Updated`, {})
            } else {
                return responseStandard(res, 'Cart Not found', {}, 401, false)
            }
        } else {
            return responseStandard(res, 'At least fill one column!', '', 400, false)
        }
    }
},

  cart: async (req, res) => {
    let { id } = req.user
    let hasil = 0
    console.log(id)
    let readChart = await cartModel.read({user_id: id})
    readChart.forEach((x=> { 
      hasil += x.summary
      // console.log(x.summary)
    }))
    let results = {
      readChart,
      summary: hasil
    }
    console.log(results)
    // console.log(readChart[0].product_id)
    // const data = await cartModel.getCartByCondition({product_id: readChart[0].product_id})
    if(readChart.length > 0) {
        return responseStandard(res, `Cart from user with id ${id}`, results)
    } else {
        return responseStandard(res, 'Cart Not found', {}, 401, false)
    }
  },

  deleteCart: async (req, res) => {
      let { id } = req.user
      let {product_id} = req.params
      // console.log(uid)
      const data = await cartModel.deleteCart(id, product_id)
      if(data.affectedRows){
          return responseStandard(res, `Cart Has been deleted`, {})
      } else {
          return responseStandard(res, 'Cart Not found', {}, 401, false)
      }
    },

    checkout: async (req, res) => {
      let { id } = req.user
      const readChart = await cartModel.read({user_id: id})
      console.log(readChart)
      var hasil = 0
      readChart.forEach((x=> { 
        hasil += x.summary
        console.log(x.summary)
      }))
      console.log(hasil)

      const makeCheckOut = await cartModel.checkOut({user_id: Number(id)})

      console.log(makeCheckOut)
      // let result = {
      //   ...makeCheckOut,
      //   Summary_Total: hasil
      // }
      if(makeCheckOut.length > 0) {
        return responseStandard(res, `Checkout`, {makeCheckOut, Summary_Total: hasil})
      } else {
          return responseStandard(res, 'You dont have any checkouts', {}, 401, false)
      }
    }
}
