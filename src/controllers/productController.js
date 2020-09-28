const qs = require('querystring')
const joi = require('joi')
const responseStandard = require('../helpers/response')
const paging = require('../helpers/pagination')
const productModel = require('../models/productModel')

module.exports = {
  read: async (req, res) => {
    const count = await productModel.countProduct()
    let { search, orderBy } = req.query
    const page = paging(req, count)
    let { offset=0, pageInfo } = page
    const { limitData: limit=5 } = pageInfo
    if (typeof search === 'object') {
        searchKey = Object.keys(search)[0]
        searchValue = Object.values(search)[0]
      } else {
        searchKey = 'name'
        searchValue = search || ''
      }
    if (typeof orderBy === 'object') {
    orderByKey = Object.keys(orderBy)[0]
    orderByValue = Object.values(orderBy)[0]
    } else {
    orderByKey = 'id'
    orderByValue = orderBy || 'ASC'
    }
    const results = await productModel.readProduct([searchKey, searchValue, orderByKey, orderByValue, limit, offset])
    console.log(results)
    return responseStandard(res, 'List of Product', {results, pageInfo})
  },
  create: async(req, res) => {
      const schema = joi.object({
        name: joi.string().required(),
        quantity: joi.number().required(),
        price: joi.number().required(),
        description: joi.string().required(),
        condition_id: joi.number().required(),
        category_id: joi.string().required()
      })

      let { value: results, error } = schema.validate(req.body)
      if (error) {
          return responseStandard(res, 'Error', {error: error.message}, 400, false)
      } else {
              const data = await productModel.createProduct(results)
              if (data.affectedRows) {
                  results = {
                      id: data.insertId,
                      ...results,
                  }
                  return responseStandard(res, 'Create Product Successfully', { results }, 200, true)
              } else {
                  return responseStandard(res, 'Failed to create Product', {}, 401, false)
              }
      }
  },
  updateProduct: async(req, res) => {
    let { id } = req.params
    id = Number(id)
    const schema = joi.object({
      name: joi.string().required(),
      quantity: joi.number().required(),
      price: joi.number().required(),
      description: joi.string().required(),
      condition_id: joi.number().required(),
      category_id: joi.string().required()
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
        return responseStandard(res, 'Error', {error: error.message}, 400, false)
    }else {
      let { name, quantity, price, description, condition_id, category_id } = results
      const update = await productModel.updateProduct(results, id)
      // console.log(results)
      if(update.affectedRows) {
          return responseStandard(res, `Product Has been Updated`, {})
      } else {
          return responseStandard(res, 'Product Not found', {}, 401, false)
      }
    }
  },
  updateProductPartial: async (req, res) => {
    let { id } = req.params
    id = Number(id)
    const schema = joi.object({
      name: joi.string(),
      quantity: joi.number(),
      price: joi.number(),
      description: joi.string(),
      condition_id: joi.number(),
      category_id: joi.number()
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
        return responseStandard(res, 'Error', {error: error.message}, 400, false)
    } else {
        
    let { name, quantity, price, description, condition_id, category_id } = results
        id = Number(id)
        if (name || quantity || price || description || condition_id || category_id){
            const update = await productModel.updateProductPartial(results, id )
            if(update.affectedRows) {
                return responseStandard(res, `Product Has been Updated`, {})
            } else {
                return responseStandard(res, 'Product Not found', {}, 401, false)
            }
        } else {
            return responseStandard(res, 'At least fill one column!', '', 400, false)
        }
    }
},
  getProductId: async (req, res) => {
      const { id } = req.params
      const data = await productModel.getProductByCondition({ id })
      if(data.length > 0) {
          return responseStandard(res, `Product with Id ${id}`, {data})
      } else {
          return responseStandard(res, 'Product Not found', {}, 401, false)
      }
  },
  getNewProduct: async (req, res) => {
    const count = await productModel.countProduct()
    let { id } = req.params
    let { search, orderBy } = req.query
    const page = paging(req, count)
    let { offset=0, pageInfo } = page
    const { limitData: limit=5 } = pageInfo
    if (typeof search === 'object') {
        searchKey = Object.keys(search)[0]
        searchValue = Object.values(search)[0]
      } else {
        searchKey = 'description'
        searchValue = search || ''
      }
    if (typeof orderBy === 'object') {
    orderByKey = Object.keys(orderBy)[0]
    orderByValue = Object.values(orderBy)[0]
    } else {
    orderByKey = 'id'
    orderByValue = orderBy || 'ASC'
    }
    id = Number(id)
    const data = await productModel.getNewProduct([searchKey, searchValue, orderByKey, orderByValue, limit, offset])
    console.log(data)
    if(data.length > 0) {
        return responseStandard(res, `New Product with Id ${id}`, {data})
    } else {
        return responseStandard(res, 'New Product Not found', {}, 401, false)
    }
  },
  deleteProduct: async (req, res) => {
      const { id } = req.params
      let productId  = Number(id)
      // console.log(uid)
      const data = await productModel.deleteProduct({id: productId})
      if(data.affectedRows){
          return responseStandard(res, `Product Has been deleted`, {})
      } else {
          return responseStandard(res, 'Product Not found', {}, 401, false)
      }
    }
}
