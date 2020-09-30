const qs = require('querystring')
const joi = require('joi')
const responseStandard = require('../helpers/response')
const paging = require('../helpers/pagination')
const productImageModel = require('../models/productImageModel')
const { APP_URL} = process.env

module.exports = {
  read: async (req, res) => {
    const count = await productImageModel.countProductImage()
    const { search, orderBy } = req.query
    const page = paging(req, count)
    const { offset = 0, pageInfo } = page
    const { limitData: limit = 5 } = pageInfo
    if (typeof search === 'object') {
      var searchKey = Object.keys(search)[0]
      var searchValue = Object.values(search)[0]
    } else {
      searchKey = 'product_id'
      searchValue = search || ''
    }
    if (typeof orderBy === 'object') {
      var orderByKey = Object.keys(orderBy)[0]
      var orderByValue = Object.values(orderBy)[0]
    } else {
      orderByKey = 'id'
      orderByValue = orderBy || 'ASC'
    }
    const results = await productImageModel.readProductImage([searchKey, searchValue, orderByKey, orderByValue, limit, offset])
    console.log(results)
    return responseStandard(res, 'List of Product image', {results, pageInfo})
  },
  create: async(req, res) => {
      const schema = joi.object({
        product_id: joi.number().required()
      })

      let { value: results, error } = schema.validate(req.body)
    //   console.log(req.files[0].fieldname === undefined)
      if (error) {
          return responseStandard(res, 'Error', {error: error.message}, 400, false)
      } else {
          if(req.files.length === 0) {
            return responseStandard(res, 'Images cannot be empty', {}, 500, false)
        }
        if (req.files[0].fieldname) {
            console.log('true')
        }

        for (let i = 0; i < req.files.length; i++) {
            if (req.files[i].mimetype === 'error') {
                console.log('true')
                return responseStandard(res, 'Invalid file type. Only image files are allowed.', {}, 500, false)
            } else {
                if(req.files[i].size >= 50000) {
                    console.log('true')
                    return responseStandard(res, 'maximum allowed file size 500 KB', {}, 500, false)
                }
            }
        }
        let url = ''
        for (let x = 0; x < req.files.length; x++) {
                let picture = `${APP_URL}uploads/${req.files[x].filename}`
                url += picture + ', '
            }
            console.log(url)
        results = {
        ...results,
        url
        }
        const data = await productImageModel.createProductImage(results)
        results = {
                id: data.insertId,
                ...results,
            }
        if (data.affectedRows) {
            return responseStandard(res, 'Create Product Image Successfully', { results }, 200, true)
        } else {
            return responseStandard(res, 'Failed to create Product Image', {}, 401, false)
        }
    }
  },
  updateProductImage: async(req, res) => {
    let { id } = req.params
    id = Number(id)
    const schema = joi.object({
      product_id: joi.number().required()
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
        return responseStandard(res, 'Error', {error: error.message}, 400, false)
    }else {
      if(!req.file) {
        return responseStandard(res, 'Invalid file type. Only image files are allowed.', {}, 500,)
    } else {
        if(req.file.size >= 50000) {
            return responseStandard(res, 'maximum allowed file size 500 KB', {}, 500,)
        }
    }
      let picture = `${APP_URL}uploads/${req.file.filename}`
      results = {
        id: data.insertId,
        ...results,
        url: picture
    }
      const update = await productImageModel.updateProductImage(results, id)
      if(update.affectedRows) {
          return responseStandard(res, `Product Image Has been Updated`, {})
      } else {
          return responseStandard(res, 'Product Image Not found', {}, 401, false)
      }
    }
  },
  updateProductImagePartial: async (req, res) => {
    let { id } = req.params
    id = Number(id)
    const schema = joi.object({
        product_id: joi.number()
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
        return responseStandard(res, 'Error', {error: error.message}, 400, false)
    } else {
        
    let { product_id } = results
        id = Number(id)
        if (product_id || req.file){
            if(!req.file) {
                return responseStandard(res, 'Invalid file type. Only image files are allowed.', {}, 500,)
            } else {
                if(req.file.size >= 50000) {
                    return responseStandard(res, 'maximum allowed file size 500 KB', {}, 500,)
                }
            }
            let picture = `${APP_URL}uploads/${req.file.filename}`
            results = {
                id: data.insertId,
                ...results,
                url: picture
            }
            const update = await productImageModel.updateProductImagePartial(results, id )
            if(update.affectedRows) {
                return responseStandard(res, `Product Image Has been Updated`, {})
            } else {
                return responseStandard(res, 'Product Image Not found', {}, 401, false)
            }
        } else {
            return responseStandard(res, 'At least fill one column!', '', 400, false)
        }
    }
},
  getProductImageId: async (req, res) => {
      const { id } = req.params
      const data = await productImageModel.getProductImageByCondition({ id })
      if(data.length > 0) {
          return responseStandard(res, `Product with Id ${id}`, {data})
      } else {
          return responseStandard(res, 'Product Not found', {}, 401, false)
      }
  },
  deleteProductImage: async (req, res) => {
      const { id } = req.params
      // console.log(uid)
      const data = await productImageModel.deleteProductImage({ id })
      if(data.affectedRows){
          return responseStandard(res, `Product Has been deleted`, {})
      } else {
          return responseStandard(res, 'Product Not found', {}, 401, false)
      }
    }
}
