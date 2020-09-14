const qs = require('querystring')

const { getDetailProductModel, createProductModel, getProductModel, getProductModelData, updateProductModel, updatePartialModel, deleteProductModel } = require('../models/products')

module.exports = {
  getDetailProduct: (req, res) => {
    const { id } = req.params
    console.log(req.params)
    getDetailProductModel(id, (result) => {
      // console.log(result)
      if (result.length) {
        res.send({
          success: true,
          message: `Product with id ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: 'Data not found!'
        })
      }
    })
  },
  createProduct: (req, res) => {
    const { name, price, store, rating_id, category_id } = req.body
    if (name && price && store && rating_id && category_id) {
      createProductModel([name, price, store, rating_id, category_id], (err, result) => {
        if (!err) {
          res.status(201).send({
            success: true,
            message: 'Product has been created',
            data: {
              id: result.insertId,
              ...req.body
            }
          })
        } else {
          console.log(err)
          res.status(500).send({
            success: false,
            message: 'Internal Server error'
          })
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'All field must be filled'
      })
    }
  },
  getProduct: (req, res) => {
    const { id } = req.params
    let { page, limit, search, orderBy } = req.query
    let searchKey = ''
    let searchValue = ''
    let orderByKey = ''
    let orderByValue = ''
    console.log(search)
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'name'
      searchValue = search || ''
    }
    if (typeof orderBy === 'object'){
      orderByKey = Object.keys(orderBy)[0]
      orderByValue = Object.values(orderBy)[0]
    } else {
      orderByKey = 'id'
      orderByValue = orderBy || 'ASC'
    }

    if (!limit) {
      limit = 5
    } else {
      limit = parseInt(limit)
    }
    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }
    const offset = (page - 1) * limit

    getProductModel([searchKey, searchValue, limit, offset, orderByKey, orderByValue], (err, result) => {
      if (!err) {
        // untuk pagination
        const pageInfo = {
          count: 0,
          pages: 0,
          currentPage: page,
          limitPerPage: limit,
          nextLink: null,
          prevLink: null
        }
        if (result.length) {
            getProductModelData((data) => {
            const { count } = data[0]
            pageInfo.count = count
            pageInfo.pages = Math.ceil(count / limit)

            const { pages, currentPage } = pageInfo
            console.log(req.query)
            if (currentPage < pages) {
              pageInfo.nextLink = `http://localhost:8080/products?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
            }

            if (currentPage > 1) {
              pageInfo.prevLink = `http://localhost:8080/products?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
            }

            res.send({
              success: true,
              message: 'List of Products',
              data: result,
              pageInfo
            })
          })
        } else {
          res.status(400).send({
            success: false,
            message: 'No data on this page'
          })
        }
      } else {
        console.log(err)
        res.status(500).send({
          success: false,
          message: 'Internal Server error'
        })
      }
    })
  },
  updateProduct: (req, res) => {
    let { id } = req.params
    id = Number(id)
    const { name = '', price = '', store = '', rating_id = '', category_id = '' } = req.body
    if (name.trim() && price.trim() && store.trim() && rating_id.trim() && category_id.trim()) {
        updateProductModel([name, price, store, rating_id, category_id], id, (err, result) => {
        console.log(err)
        if (!err) {
          if (result.affectedRows && result.warningCount === 0) { // untuk mengecek apakah price nya sebuah angka pake warningCount
            res.send({
              success: true,
              message: `Product with id ${id} Has been updated!`
            })
          } else if (!result.affectedRows) {
            res.send({
              success: false,
              message: `id ${id} not found!`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed to update data!'
            })
          }
        } else if (err) {
          res.send({
            success: false,
            message: `invalid Input value at ${err.message}`
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: 'All fields must be filled'
      })
    }
  },
  updatePartial: (req, res) => {
    let { id } = req.params
    id = Number(id)
    const { name = '', price = '', store = '', rating_id = '', category_id = '' } = req.body
    if (name.trim() || price.trim() || store.trim() || rating_id.trim() || category_id.trim()) {
      const data = Object.entries(req.body).map(element => {
        return parseInt(element[1]) > 0 ? `${element[0]}=${element[1]}` : `${element[0]}='${element[1]}'`
      })
      console.log(data)
      updatePartialModel([data, id], (err, result) => {
        console.log(result)
        if (!err) {
          if (result.affectedRows && result.warningCount === 0) { // untuk mengecek result.warningCount === 0 jika warningCount nya tidak sama dengan 0, apakah price nya sebuah angka pake warningCount
            res.send({
              success: true,
              message: `Product with id ${id} Has been updated!`
            })
          } else if (!result.affectedRows) {
            res.send({
              success: false,
              message: `id ${id} not found!`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed to update data!'
            })
          }
        } else if (err) {
          res.send({
            success: false,
            message: `invalid Input value at ${err.message}`
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: 'At least fill one column!'
      })
    }
  },
  deleteProduct: (req, res) => {
    const { id } = req.params
    deleteProductModel(id, (err, result) => {
      console.log(err)
      if (!err) {
        if (result.affectedRows) {
          res.send({
            success: true,
            message: `Product with id ${id} Has been deleted!`
          })
        } else if (!result.affectedRows) {
          res.send({
            success: false,
            message: `id ${id} not found!`
          })
        } else {
          res.send({
            success: false,
            message: 'Failed to delete product!'
          })
        }
      } else if (err) {
        res.send({
          success: false,
          message: `invalid Input value at ${err.message}`
        })
      }
    })
  }
}
