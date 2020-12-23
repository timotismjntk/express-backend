const qs = require('querystring')
const joi = require('joi')
const responseStandard = require('../../helpers/response')
const { pagination } = require('../../helpers/pagination')

const ratingModel = require('../../models/rating')

module.exports = {
  readRating: async (req, res) => {
    const count = await ratingModel.countRating()
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
    const offset = (page - 1) * limit
    const data = [searchKey, searchValue, orderByKey, orderByValue, limit, offset]
    const results = await ratingModel.read(data)
    const pageInfo = pagination('manage/rating', req.query, page, limit, count)
    return responseStandard(res, 'List of Rating', { results, pageInfo })
  },
  create: async (req, res) => {
    const schema = joi.object({
      rating: joi.number().required(),
      description: joi.string()
    })

    let { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const data = await ratingModel.create(results)
      if (data.affectedRows) {
        results = {
          id: data.insertId,
          ...results
        }
        return responseStandard(res, 'Create Rating Successfully', { results }, 200, true)
      } else {
        return responseStandard(res, 'Failed to create Rating', {}, 401, false)
      }
    }
  },
  updateRating: async (req, res) => {
    let { id } = req.params
    id = Number(id)
    const schema = joi.object({
      rating: joi.number().required(),
      description: joi.string()
    })
    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { name, description } = results
      const update = await ratingModel.updateRating(results, id)
      // console.log(results)
      if (update.affectedRows) {
        return responseStandard(res, 'Rating Has been Updated', {})
      } else {
        return responseStandard(res, 'Rating Not found', {}, 401, false)
      }
    }
  },
  updateRatingPartial: async (req, res) => {
    let { id } = req.params
    id = Number(id)
    const schema = joi.object({
      rating: joi.number(),
      description: joi.string()
    })
    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { name, description } = results
      id = Number(id)
      if (name || description) {
        const update = await ratingModel.updateRatingPartial(results, id)
        if (update.affectedRows) {
          return responseStandard(res, 'Rating Has been Updated', {})
        } else {
          return responseStandard(res, 'Rating Not found', {}, 401, false)
        }
      } else {
        return responseStandard(res, 'At least fill one column!', '', 400, false)
      }
    }
  },
  getRatingId: async (req, res) => {
    const { id } = req.params
    const data = await ratingModel.getRatingByCondition({ id })
    if (data.length > 0) {
      return responseStandard(res, `Rating with Id ${id}`, { data })
    } else {
      return responseStandard(res, 'Rating Not found', {}, 401, false)
    }
  },
  deleteRating: async (req, res) => {
    const { id } = req.params
    const ratingId = Number(id)
    // console.log(uid)
    const data = await ratingModel.deleteRating({ id: ratingId })
    if (data.affectedRows) {
      return responseStandard(res, 'Rating Has been deleted', {})
    } else {
      return responseStandard(res, 'Rating Not found', {}, 401, false)
    }
  }
}
