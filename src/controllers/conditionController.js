const qs = require('querystring')
const joi = require('joi')
const responseStandard = require('../helpers/response')
const paging = require('../helpers/pagination')
const conditionModel = require('../models/conditionModel')

module.exports = {
  read: async (req, res) => {
    const count = await conditionModel.countCondition()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const results = await conditionModel.readCondition([limit, offset])
    return responseStandard(res, 'List of Condition', {results, pageInfo})
  },
  create: async(req, res) => {
      const schema = joi.object({
          condition_name: joi.string().required(),
          description: joi.string().required()
      })

      let { value: results, error } = schema.validate(req.body)
      if (error) {
          return responseStandard(res, 'Error', {error: error.message}, 400, false)
      } else {
              const data = await conditionModel.createCondition(results)
              if (data.affectedRows) {
                  results = {
                      id: data.insertId,
                      ...results,
                  }
                  return responseStandard(res, 'Create Condition Successfully', { results }, 200, true)
              } else {
                  return responseStandard(res, 'Failed to create Condition', {}, 401, false)
              }
      }
  },
  updateCondition: async(req, res) => {
    let { id } = req.params
    id = Number(id)
    const schema = joi.object({
      condition_name: joi.string().required(),
      description: joi.string().required()
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
        return responseStandard(res, 'Error', {error: error.message}, 400, false)
    }else {
      let { name, quantity, price, description, condition_id, category_id } = results
      const update = await conditionModel.updateCondition(results, id)
      // console.log(results)
      if(update.affectedRows) {
          return responseStandard(res, `Condition Has been Updated`, {})
      } else {
          return responseStandard(res, 'Condition Not found', {}, 401, false)
      }
    }
  },
  updateConditionPartial: async (req, res) => {
    let { id } = req.params
    id = Number(id)
    const schema = joi.object({
      condition_name: joi.string(),
      description: joi.string()
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
        return responseStandard(res, 'Error', {error: error.message}, 400, false)
    } else {
        
    let { condition_name, description } = results
        id = Number(id)
        if (condition_name || description){
            const update = await conditionModel.updateConditionPartial(results, id )
            if(update.affectedRows) {
                return responseStandard(res, `Condition Has been Updated`, {})
            } else {
                return responseStandard(res, 'Condition Not found', {}, 401, false)
            }
        } else {
            return responseStandard(res, 'At least fill one column!', '', 400, false)
        }
    }
},
  getConditionId: async (req, res) => {
      const { id } = req.params
      const data = await conditionModel.getConditionByCondition({ id })
      if(data.length > 0) {
          return responseStandard(res, `Condition with Id ${id}`, {data})
      } else {
          return responseStandard(res, 'Condition Not found', {}, 401, false)
      }
  },
  deleteCondition: async (req, res) => {
      const { id } = req.params
      let condition_id  = Number(id)
      // console.log(uid)
      const data = await conditionModel.deleteCondition({id: condition_id})
      if(data.affectedRows){
          return responseStandard(res, `Condition Has been deleted`, {})
      } else {
          return responseStandard(res, 'Condition Not found', {}, 401, false)
      }
    }
}
