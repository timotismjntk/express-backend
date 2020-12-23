const qs = require('querystring')
const joi = require('joi')
const responseStandard = require('../../helpers/response')
const paging = require('../../helpers/pagination')
const productImageModel = require('../../models/productImageModel')
const { APP_URL } = process.env
const multer = require('multer')
const multerHandler = require('../../middleware/multerError')

const uploadHelper = require('../../helpers/upload')

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
    return responseStandard(res, 'List of Product image', { results, pageInfo })
  },
  create: (req, res) => {
    uploadHelper(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // An error occurred
        if (err.code === 'LIMIT_UNEXPECTED_FILE' && req.files.length === 0) {
          console.log(err.code === 'LIMIT_UNEXPECTED_FILE' && req.files.length > 0)
          return responseStandard(res, 'fieldname doesnt match', {}, 500, false)
        }
        return responseStandard(res, err.message, {}, 500, false)
      } else if (err) {
        return responseStandard(res, err.message, {}, 401, false)
        // An error occurred
      }
      const schema = joi.object({
        product_id: joi.number().required()
      })

      let { value: results, error } = schema.validate(req.body)
      if (error) {
        return responseStandard(res, 'Error', { error: error.message }, 400, false)
      } else {
        //   if(req.files.length === 0) {
        //     return responseStandard(res, 'Images cannot be empty', {}, 500, false)
        //   }


        // console.log(req.files)
        // if (req.files.error === 'error') {
        //     console.log('true')
        //     return responseStandard(res, 'Invalid file type. Only image files are allowed.', {}, 500, false)
        // }

        for (let i = 0; i < req.files.length; i++) {
          if (!req.files[i]) {
            return responseStandard(res, 'maximum allowed file size 500 KB', {}, 500, false)
          }
          if (req.files[i].fieldname !== 'picture') {
            return responseStandard(res, 'file can\'t be more than 4', {}, 401, false)
          }
        }

        let url = ''
        for (let x = 0; x < req.files.length; x++) {
          const picture = `uploads/${req.files[x].filename}`
          url += picture + ', '
          console.log(x)
          if (x === req.files.length - 1) {
            url = url.slice(0, url.length - 2)
            console.log(x)
          }
        }
        results = {
          ...results,
          url
        }
        const data = await productImageModel.createProductImage(results)
        console.log(data)
        if (data.affectedRows) {
          results = {
            id: data.insertId,
            ...results
          }
          return responseStandard(res, 'Product Image Has been Created', { results }, 200, true)
        } else {
          return responseStandard(res, 'Error to create Product Image', {}, 500, false)
        }
        // async data =>  {
        //     return hasil()
        //     .then(res => res)
        //     .catch(err => err)
        // }

        // (async () => {
        //     try {
        //         let created = await data
        //         results = {
        //             id: created.insertId,
        //             ...results,
        //         }
        //         if(created.affectedRows){
        //             return responseStandard(res, `Product Image Has been Created`, {results}, 200, true)
        //         }
        //     } catch (err) {
        //         return responseStandard(res, err.message, {results}, 500, false)
        //     }
        // })();
      }
    })
  },
  updateProductImage: (req, res) => {
    const { id } = req.params
    uploadHelper(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // An error occurred
        if (err.code === 'LIMIT_UNEXPECTED_FILE' && req.files.length === 0) {
          console.log(err.code === 'LIMIT_UNEXPECTED_FILE' && req.files.length > 0)
          return responseStandard(res, 'fieldname doesnt match', {}, 500, false)
        }
        return responseStandard(res, err.message, {}, 500, false)
      } else if (err) {
        return responseStandard(res, err.message, {}, 401, false)
        // An error occurred
      }
      const schema = joi.object({
        product_id: joi.number().required()
      })

      let { value: results, error } = schema.validate(req.body)
      if (error) {
        return responseStandard(res, 'Error', { error: error.message }, 400, false)
      } else {
        for (let i = 0; i < req.files.length; i++) {
          if (!req.files[i]) {
            console.log('true')
            return responseStandard(res, 'maximum allowed file size 500 KB', {}, 500, false)
          }
          if (req.files[i].fieldname !== 'picture') {
            console.log('iya iya')
            return responseStandard(res, 'file can\'t be more than 4', {}, 401, false)
          }
        }

        let url = ''
        for (let x = 0; x < req.files.length; x++) {
          const picture = `uploads/${req.files[x].filename}`
          url += picture + ', '
          console.log(x)
          if (x === req.files.length - 1) {
            url = url.slice(0, url.length - 2)
            console.log(x)
          }
        }
        results = {
          ...results,
          url
        }
        const data = await productImageModel.updateProductImage(results, id)
        console.log(data)
        if (data.affectedRows) {
          return responseStandard(res, 'Product Image Has been Created', { results }, 200, true)
        } else {
          return responseStandard(res, 'Error to create Product Image', {}, 500, false)
        }
        // async data =>  {
        //     return hasil()
        //     .then(res => res)
        //     .catch(err => err)
        // }

        // (async () => {
        //     try {
        //         let created = await data
        //         results = {
        //             id: created.insertId,
        //             ...results,
        //         }
        //         if(created.affectedRows){
        //             return responseStandard(res, `Product Image Has been Created`, {results}, 200, true)
        //         }
        //     } catch (err) {
        //         return responseStandard(res, err.message, {results}, 500, false)
        //     }
        // })();
      }
    })
  },
  getProductImageId: async (req, res) => {
    const { id } = req.params
    const data = await productImageModel.getProductImageByCondition({ id })
    if (data.length > 0) {
      return responseStandard(res, `Product with Id ${id}`, { data })
    } else {
      return responseStandard(res, 'Product Not found', {}, 401, false)
    }
  },
  deleteProductImage: async (req, res) => {
    const { id } = req.params
    // console.log(uid)
    const data = await productImageModel.deleteProductImage({ id })
    if (data.affectedRows) {
      return responseStandard(res, 'Product Has been deleted', {})
    } else {
      return responseStandard(res, 'Product Not found', {}, 401, false)
    }
  }
}
