const qs = require('querystring')
const joi = require('joi')
const responseStandard = require('../helpers/response')
const paging = require('../helpers/pagination')
const categoryModel = require('../models/categoryModel')

module.exports = {
  read: async (req, res) => {
    const count = await categoryModel.countCategory()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const results = await categoryModel.readCategory([limit, offset])
    return responseStandard(res, 'List of Category', {results, pageInfo})
  },
  create: async(req, res) => {
    const schema = joi.object({
      picture: joi.string().required(),
      name: joi.string().required(),
      description: joi.string().required()
    })

      let { value: results, error } = schema.validate(req.body)
      if (error) {
          return responseStandard(res, 'Error', {error: error.message}, 400, false)
      } else {
              const data = await categoryModel.createCategory(results)
              if (data.affectedRows) {
                  results = {
                      id: data.insertId,
                      ...results,
                  }
                  return responseStandard(res, 'Create Category Successfully', { results }, 200, true)
              } else {
                  return responseStandard(res, 'Failed to create Category', {}, 401, false)
              }
      }
  },
  updateCategory: async(req, res) => {
    let { id } = req.params
    id = Number(id)
    const schema = joi.object({
      picture: joi.string().required(),
      name: joi.string().required(),
      description: joi.string().required()
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
        return responseStandard(res, 'Error', {error: error.message}, 400, false)
    }else {
      let { picture, name, price, description } = results
      const update = await categoryModel.updateCategory(results, id)
      if(update.affectedRows) {
          return responseStandard(res, `Category Has been Updated`, {})
      } else {
          return responseStandard(res, 'Category Not found', {}, 401, false)
      }
    }
  },
  updateCategoryPartial: async (req, res) => {
    let { id } = req.params
    id = Number(id)
    const schema = joi.object({
      picture: joi.string(),
      name: joi.string(),
      description: joi.string()
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
        return responseStandard(res, 'Error', {error: error.message}, 400, false)
    } else {
        
    let { picture, name, price, description } = results
        id = Number(id)
        if (picture || name || description) {
            const update = await categoryModel.updateCategoryPartial(results, id )
            if(update.affectedRows) {
                return responseStandard(res, `Category Has been Updated`, {})
            } else {
                return responseStandard(res, 'Category Not found', {}, 401, false)
            }
        } else {
            return responseStandard(res, 'At least fill one column!', '', 400, false)
        }
    }
},
  getCategoryId: async (req, res) => {
      const { id } = req.params
      const data = await categoryModel.getCategoryByCondition({ id })
      if(data.length > 0) {
          return responseStandard(res, `Category with Id ${id}`, {data})
      } else {
          return responseStandard(res, 'Category Not found', {}, 401, false)
      }
  },
  deleteCategory: async (req, res) => {
      const { id } = req.params
      let category_id  = Number(id)
      // console.log(uid)
      const data = await categoryModel.deleteCategory({id: category_id})
      if(data.affectedRows){
          return responseStandard(res, `Category Has been deleted`, {})
      } else {
          return responseStandard(res, 'Category Not found', {}, 401, false)
      }
    }
}
