const qs = require('querystring')
const joi = require('joi')
const responseStandard = require('../helpers/response')
const paging = require('../helpers/pagination')
const ratingModel = require('../models/rating')

module.exports = {
  read: async (req, res) => {
    const count = await ratingModel.countRating()
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
    const results = await ratingModel.read([searchKey, searchValue, orderByKey, orderByValue, limit, offset])
    console.log(results)
    return responseStandard(res, 'List of Rating', {results, pageInfo})
  },
  create: async(req, res) => {
      const schema = joi.object({
        name: joi.string().required(),
        description: joi.string().required()
      })

      let { value: results, error } = schema.validate(req.body)
      if (error) {
          return responseStandard(res, 'Error', {error: error.message}, 400, false)
      } else {
              const data = await ratingModel.create(results)
              if (data.affectedRows) {
                  results = {
                      id: data.insertId,
                      ...results,
                  }
                  return responseStandard(res, 'Create Rating Successfully', { results }, 200, true)
              } else {
                  return responseStandard(res, 'Failed to create Rating', {}, 401, false)
              }
      }
  },
  updateRating: async(req, res) => {
    let { id } = req.params
    id = Number(id)
    const schema = joi.object({
      name: joi.string().required(),
      description: joi.string().required()
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
        return responseStandard(res, 'Error', {error: error.message}, 400, false)
    }else {
      let { name, description } = results
      const update = await ratingModel.updateRating(results, id)
      // console.log(results)
      if(update.affectedRows) {
          return responseStandard(res, `Rating Has been Updated`, {})
      } else {
          return responseStandard(res, 'Rating Not found', {}, 401, false)
      }
    }
  },
  updateRatingPartial: async (req, res) => {
    let { id } = req.params
    id = Number(id)
    const schema = joi.object({
      name: joi.string(),
      description: joi.string()
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
        return responseStandard(res, 'Error', {error: error.message}, 400, false)
    } else {
        
    let { name, description } = results
        id = Number(id)
        if (name || description){
            const update = await ratingModel.updateRatingPartial(results, id )
            if(update.affectedRows) {
                return responseStandard(res, `Rating Has been Updated`, {})
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
      if(data.length > 0) {
          return responseStandard(res, `Rating with Id ${id}`, {data})
      } else {
          return responseStandard(res, 'Rating Not found', {}, 401, false)
      }
  },
  deleteRating: async (req, res) => {
      const { id } = req.params
      let ratingId  = Number(id)
      // console.log(uid)
      const data = await ratingModel.deleteRating({id: ratingId})
      if(data.affectedRows){
          return responseStandard(res, `Rating Has been deleted`, {})
      } else {
          return responseStandard(res, 'Rating Not found', {}, 401, false)
      }
    }
}
