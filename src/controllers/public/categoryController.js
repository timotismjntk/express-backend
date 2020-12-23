const responseStandard = require('../../helpers/response')
const { pagination } = require('../../helpers/pagination')
const categoryModel = require('../../models/categoryModel')

module.exports = {
  readCategory: async (req, res) => {
    const count = await categoryModel.countCategory()
    let { limit, page } = req.query
    if (!limit) {
      limit = 20
    } else {
      limit = parseInt(limit)
    }
    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }
    const offset = (page - 1) * limit
    const pageInfo = pagination('public/product/category', req.query, page, limit, count)
    const results = await categoryModel.readCategory([limit, offset])
    return responseStandard(res, 'List of Category', { results, pageInfo })
  },
  getCategoryId: async (req, res) => {
    const { id } = req.params
    const data = await categoryModel.getCategoryByCondition({ id })
    if (data.length > 0) {
      return responseStandard(res, `Category with Id ${id}`, { data })
    } else {
      return responseStandard(res, 'Category Not found', {}, 401, false)
    }
  }
}
