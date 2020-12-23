const responseStandard = require('../../helpers/response')
const { pagination } = require('../../helpers/pagination')
const productModel = require('../../models/productModel')

module.exports = {
  read: async (req, res) => {
    const count = await productModel.countProduct()
    let { limit, page, search, sort, orderBy } = req.query
    if (!limit) {
      limit = 10
    } else {
      limit = parseInt(limit)
    }
    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }
    let searchKey = ''
    let searchValue = ''
    let orderByKey = ''
    let orderByValue = ''
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
    const offset = (page - 1) * limit
    const data = [searchKey, searchValue, orderByKey, orderByValue, limit, offset]
    const results = await productModel.readProduct(data)
    const pageInfo = pagination('public', req.query, page, limit, count)
    return responseStandard(res, 'List of Product', { results, pageInfo })
  },
  getProductId: async (req, res) => {
    const { id } = req.params
    const data = await productModel.getProductByCondition({ id })
    if (data.length > 0) {
      return responseStandard(res, `Product with Id ${id}`, { data })
    } else {
      return responseStandard(res, 'Product Not found', {}, 401, false)
    }
  },
  getDetailProduct: async (req, res) => {
    const { id } = req.params
    const data = await productModel.getProductDetail({ id })
    if (data.length > 0) {
      return responseStandard(res, `Product with Id ${id}`, { data })
    } else {
      return responseStandard(res, 'Product Not found', {}, 401, false)
    }
  },
  popularProduct: async (req, res) => {
    let { limit, page, search, sort, orderBy } = req.query
    if (!limit) {
      limit = 10
    } else {
      limit = parseInt(limit)
    }
    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }
    let searchKey = ''
    let searchValue = ''
    let orderByKey = ''
    let orderByValue = ''
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
      orderByKey = 'rating.id'
      orderByValue = orderBy || 'DESC'
    }
    const offset = (page - 1) * limit
    const query = [searchKey, searchValue, orderByKey, orderByValue, limit, offset]
    const count = await productModel.countPopularProduct([searchKey, searchValue, limit, offset])
    const results = await productModel.readPopularProduct(query)
    const pageInfo = pagination('public/product/popular', req.query, page, limit, count.length)
    return responseStandard(res, 'List of Product', { results, pageInfo })
  },
  newProduct: async (req, res) => {
    let { limit, page, search, sort, orderBy } = req.query
    if (!limit) {
      limit = 10
    } else {
      limit = parseInt(limit)
    }
    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }
    let searchKey = ''
    let searchValue = ''
    let orderByKey = ''
    let orderByValue = ''
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
    const count = await productModel.countNewProduct([searchKey, searchValue, limit, offset])
    const data = [searchKey, searchValue, orderByKey, orderByValue, limit, offset]
    const results = await productModel.readNewProduct(data)
    const pageInfo = pagination('public/product/new', req.query, page, limit, count.length)
    return responseStandard(res, 'List of Product', { results, pageInfo })
  }
}
