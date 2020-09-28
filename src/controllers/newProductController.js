const qs = require('querystring')
const joi = require('joi')
const responseStandard = require('../helpers/response')
const paging = require('../helpers/pagination')
const NewProductModel = require('../models/NewProductModel')

module.exports = {
  read: async (req, res) => {
    const count = await NewProductModel.countNewProduct()
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
    const results = await NewProductModel.readNewProduct([searchKey, searchValue, orderByKey, orderByValue, limit, offset])
    console.log(results)
    return responseStandard(res, 'List of Product', {results, pageInfo})
  }
}
