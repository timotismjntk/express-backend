const qs = require('querystring')
const joi = require('joi')
const responseStandard = require('../helpers/response')
const { pagination } = require('../helpers/pagination')
const NewProductModel = require('../models/newProductModel')

module.exports = {
  readNew: async (req, res) => {
    const count = await NewProductModel.countNewProduct()
    let { limit, page, search, sort, orderBy } = req.query
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
    orderByKey = 'product.created_at'
    orderByValue = orderBy || 'DESC'
    }
    const offset = (page - 1) * limit
    const data = [searchKey, searchValue, orderByKey, orderByValue, limit, offset]
    const results = await NewProductModel.readNewProduct(data)
    const pageInfo = pagination(req.baseUrl, req.query, page, limit, count)
    return responseStandard(res, 'List of Product', {results, pageInfo})
  }
}
