const qs = require('querystring')
const joi = require('joi')
const responseStandard = require('../helpers/response')
const paging = require('../helpers/pagination')
const categoryModel = require('../models/categoryModel')
const multer = require('multer')
const uploadHelper = require('../helpers/upload')
const { APP_URL} = process.env

module.exports = {
  readCategory: async (req, res) => {
    const count = await categoryModel.countCategory()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const results = await categoryModel.readCategory([limit, offset])
    return responseStandard(res, 'List of Category', {results, pageInfo})
  },
  create: (req, res) => {
    uploadHelper(req, res, async function (err) {
        console.log('panjangnya ' + req.files.length)
        console.log(req.files)
      if (err instanceof multer.MulterError) {
        //An error occurred
        console.log(err.code === 'LIMIT_UNEXPECTED_FILE' || req.files.length === 0)
        if(err.code === 'LIMIT_UNEXPECTED_FILE' && req.files.length === 0){
            console.log(err.code === 'LIMIT_UNEXPECTED_FILE' && req.files.length > 0)
            return responseStandard(res, 'fieldname doesnt match', {}, 500, false)
        }
        return responseStandard(res, err.message, {}, 500, false)
      } else if (err) {
        console.log(err.message)
        return responseStandard(res, err.message, {}, 401, false)
        //An error occurred
      }
        const schema = joi.object({
        category_name: joi.string().required(),
        category_color: joi.string().required(),
        description: joi.string().required()
        })

      let { value: results, error } = schema.validate(req.body)
      if (error) {
          return responseStandard(res, 'Error', {error: error.message}, 400, false)
      } else {
          
            console.log(req.files.length + 'segini')


        for (let i = 0; i < req.files.length; i++) {
            if(!req.files[i]) {
                console.log('true')
                return responseStandard(res, 'maximum allowed file size 500 KB', {}, 500, false)
            }
            if(req.files[i].fieldname !== 'picture') {
            console.log('iya iya')
            return responseStandard(res, `file can't be more than 4`, {}, 401, false)
            }
        }
        
        let url_image = ''
        for (let x = 0; x < req.files.length; x++) {
                let picture = `uploads/${req.files[x].filename}`
                url_image += picture + ', '
                console.log(x)
                if(x === req.files.length - 1){
                    url_image = url_image.slice(0, url_image.length - 2)
                    // console.log(x)
                }
            }
        results = {
        ...results,
        url_image
        }
        let data = await categoryModel.createCategory(results)

        if(data.affectedRows){
            results = {
                id: data.insertId,
                ...results,
            }
            return responseStandard(res, `Product Image Has been Created`, {results}, 200, true)
        } else {
            return responseStandard(res, 'Error to create Product Image', {}, 500, false)
        }
    }})
  },
  updateCategory: (req, res) => {
    let { id } = req.params
    id = Number(id)
    uploadHelper(req, res, async function(err) {
        console.log('panjangnya ' + req.files.length)
        console.log(req.files)
      if (err instanceof multer.MulterError) {
        //An error occurred
        console.log(err.code === 'LIMIT_UNEXPECTED_FILE' || req.files.length === 0)
        if(err.code === 'LIMIT_UNEXPECTED_FILE' && req.files.length === 0){
            console.log(err.code === 'LIMIT_UNEXPECTED_FILE' && req.files.length > 0)
            return responseStandard(res, 'fieldname doesnt match', {}, 500, false)
        }
        return responseStandard(res, err.message, {}, 500, false)
      } else if (err) {
        console.log(err.message)
        return responseStandard(res, err.message, {}, 401, false)
        //An error occurred
      }
        const schema = joi.object({
        category_name: joi.string().required(),
        category_color: joi.string().required(),
        description: joi.string().required()
        })

      let { value: results, error } = schema.validate(req.body)
      if (error) {
          return responseStandard(res, 'Error', {error: error.message}, 400, false)
      } else {
          
            console.log(req.files.length + 'segini')


        for (let i = 0; i < req.files.length; i++) {
            if(!req.files[i]) {
                console.log('true')
                return responseStandard(res, 'maximum allowed file size 500 KB', {}, 500, false)
            }
            if(req.files[i].fieldname !== 'picture') {
            console.log('iya iya')
            return responseStandard(res, `file can't be more than 4`, {}, 401, false)
            }
        }
        
        let url_image = ''
        for (let x = 0; x < req.files.length; x++) {
                let picture = `uploads/${req.files[x].filename}`
                url_image += picture + ', '
                console.log(x)
                if(x === req.files.length - 1){
                    url_image = url_image.slice(0, url_image.length - 2)
                    // console.log(x)
                }
            }
        results = {
        ...results,
        url_image
        }
        const update = await categoryModel.updateCategory(results, id)
        if(update.affectedRows) {
            return responseStandard(res, `Category Has been Updated`, {})
        } else {
            return responseStandard(res, 'Category Not found', {}, 401, false)
        }
    }})
  },
  updateCategoryPartial: (req, res) => {
    let { id } = req.params
    let gambar = req.files
    id = Number(id)
    uploadHelper(req, res, async function(err) {
        // console.log('panjangnya ' + req.files.length)
        // console.log(req.files)
      if (err instanceof multer.MulterError) {
        //An error occurred
        console.log(err.code === 'LIMIT_UNEXPECTED_FILE' || req.files.length === 0)
        if(err.code === 'LIMIT_UNEXPECTED_FILE' && req.files.length === 0){
            console.log(err.code === 'LIMIT_UNEXPECTED_FILE' && req.files.length > 0)
            return responseStandard(res, 'fieldname doesnt match', {}, 500, false)
        }
        return responseStandard(res, err.message, {}, 500, false)
      } else if (err) {
        console.log(err.message)
        return responseStandard(res, err.message, {}, 401, false)
        //An error occurred
      }
        const schema = joi.object({
        category_name: joi.string(),
        category_color: joi.string(),
        description: joi.string()
        })

      let { value: results, error } = schema.validate(req.body)
      if (error) {
          return responseStandard(res, 'Error', {error: error.message}, 400, false)
      } else {
          
            // console.log(req.files.length + 'segini')
            let {category_name, description, category_color} = results
            if (req.files || category_name || description || category_color) {
                if(req.files){
                    for (let i = 0; i < req.files.length; i++) {
                        if(!req.files[i]) {
                            console.log('true')
                            return responseStandard(res, 'maximum allowed file size 500 KB', {}, 500, false)
                        }
                        if(req.files[i].fieldname !== 'picture') {
                        console.log('iya iya')
                        return responseStandard(res, `file can't be more than 4`, {}, 401, false)
                        }
                    }
                    let url_image = ''
                    for (let x = 0; x < req.files.length; x++) {
                            let picture = `uploads/${req.files[x].filename}`
                            url_image += picture + ', '
                            console.log(x)
                            if(x === req.files.length - 1){
                                url_image = url_image.slice(0, url_image.length - 2)
                                // console.log(x)
                            }
                        }
                    results = {
                        ...results,
                        url_image
                        }
                }
                const update = await categoryModel.updateCategoryPartial(results, id )
                if(update.affectedRows) {
                    return responseStandard(res, `Category Has been Updated`, {})
                } else {
                    return responseStandard(res, 'Category Not found', {}, 401, false)
                }
            } else {
                return responseStandard(res, 'At least fill one column!', '', 400, false)
            }
    }})
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
