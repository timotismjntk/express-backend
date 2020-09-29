// const qs = require('querystring')
const joi = require('joi')
const responseStandard = require('../helpers/response')
const paging = require('../helpers/pagination')
const productColorModel = require('../models/productColorModel')

module.exports = {
  read: async (req, res) => {
    const count = await productColorModel.countProduct()
    const { search, orderBy } = req.query
    const page = paging(req, count)
    const { offset = 0, pageInfo } = page
    const { limitData: limit = 5 } = pageInfo
    if (typeof search === 'object') {
      var searchKey = Object.keys(search)[0]
      var searchValue = Object.values(search)[0]
    } else {
      searchKey = 'name'
      searchValue = search || ''
    }
    if (typeof orderBy === 'object') {
      var orderByKey = Object.keys(orderBy)[0]
      var orderByValue = Object.values(orderBy)[0]
    } else {
      orderByKey = 'id'
      orderByValue = orderBy || 'ASC'
    }
    const results = await productColorModel.readProduct([searchKey, searchValue, orderByKey, orderByValue, limit, offset])
    console.log(results)
    return responseStandard(res, 'List of Color', { results, pageInfo })
  },
  create: async (req, res) => {
    const schema = joi.object({
      product_id: joi.number().required(),
      name: joi.string().required(),
      hexcode: joi.string().required()
    })

    let { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const data = await productColorModel.createProduct(results)
      if (data.affectedRows) {
        results = {
          id: data.insertId,
          ...results
        }
        return responseStandard(res, 'Create Color Successfully', { results }, 200, true)
      } else {
        return responseStandard(res, 'Failed to create Product', {}, 401, false)
      }
    }
  },
  updateProduct: async (req, res) => {
    let { id } = req.params
    id = Number(id)
    const schema = joi.object({
      product_id: joi.number().required(),
      name: joi.string().required(),
      hexcode: joi.string().required()
    })
    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const update = await productColorModel.updateProduct(results, id)
      // console.log(results)
      if (update.affectedRows) {
        return responseStandard(res, 'Color Has been Updated', {})
      } else {
        return responseStandard(res, 'Color Not found', {}, 401, false)
      }
    }
  },
  updateProductPartial: async (req, res) => {
    let { id } = req.params
    id = Number(id)
    const schema = joi.object({
      product_id: joi.number(),
      name: joi.string(),
      hexcode: joi.string()
    })
    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { name, product_id, hexcode } = results
      id = Number(id)
      if (product_id || name || hexcode) {
        const update = await productColorModel.updateProductPartial(results, id)
        if (update.affectedRows) {
          return responseStandard(res, 'Color Has been Updated', {})
        } else {
          return responseStandard(res, 'Color Not found', {}, 401, false)
        }
      } else {
        return responseStandard(res, 'At least fill one column!', '', 400, false)
      }
    }
  },
  getProductId: async (req, res) => {
    const { id } = req.params
    const data = await productColorModel.getProductByCondition({ id })
    if (data.length > 0) {
      return responseStandard(res, `Color with Id ${id}`, { data })
    } else {
      return responseStandard(res, 'Color Not found', {}, 401, false)
    }
  },
  getNewProduct: async (req, res) => {
    const count = await productColorModel.countProduct()
    let { id } = req.params
    const { search, orderBy } = req.query
    const page = paging(req, count)
    const { offset = 0, pageInfo } = page
    const { limitData: limit = 5 } = pageInfo
    if (typeof search === 'object') {
      var searchKey = Object.keys(search)[0]
      var searchValue = Object.values(search)[0]
    } else {
      searchKey = 'description'
      searchValue = search || ''
    }
    if (typeof orderBy === 'object') {
      var orderByKey = Object.keys(orderBy)[0]
      var orderByValue = Object.values(orderBy)[0]
    } else {
      orderByKey = 'id'
      orderByValue = orderBy || 'ASC'
    }
    id = Number(id)
    const data = await productColorModel.getProduct([searchKey, searchValue, orderByKey, orderByValue, limit, offset])
    console.log(data)
    if (data.length > 0) {
      return responseStandard(res, `New Product with Id ${id}`, { data })
    } else {
      return responseStandard(res, 'New Product Not found', {}, 401, false)
    }
  },
  deleteProduct: async (req, res) => {
    const { id } = req.params
    const productId = Number(id)
    // console.log(uid)
    const data = await productColorModel.deleteProduct({ id: productId })
    if (data.affectedRows) {
      return responseStandard(res, 'Color Has been deleted', {})
    } else {
      return responseStandard(res, 'Color Not found', {}, 401, false)
    }
  }
}
