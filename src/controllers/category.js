const qs = require('querystring')

const { getDetailCategoryModel, createCategoryModel, getCategoryModel, getCategoryModelData, updateCategoryModel, updatePartialModel, deleteProductModel } = require('../models/category')

module.exports = {
  getDetailCategory: (req, res) => {
    const { id } = req.params
    console.log(req.params)
    getDetailCategoryModel(id, (err, result) => {
      // console.log(result)
      if (!err) {
        res.send({
          success: true,
          message: `Category with id ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: 'Category not found!'
        })
      }
    })
  },
  createCategory: (req, res) => {
    const { category_name } = req.body
    if (category_name) {
      createCategoryModel(category_name, (err, result) => {
        if (!err) {
          res.status(201).send({
            success: true,
            message: 'Category has been created',
            data: {
              category_id: result.insertId,
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
  getCategory: (req, res) => {
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
      searchKey = 'category_id'
      searchValue = search || ''
    }
    if (typeof orderBy === 'object'){
      orderByKey = Object.keys(orderBy)[0]
      orderByValue = Object.values(orderBy)[0]
    } else {
      orderByKey = 'category_id'
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

    getCategoryModel([searchKey, searchValue, limit, offset, orderByKey, orderByValue], (err, result) => {
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
            getCategoryModelData((data) => {
            const { count } = data[0]
            pageInfo.count = count
            pageInfo.pages = Math.ceil(count / limit)

            const { pages, currentPage } = pageInfo
            console.log(req.query)
            if (currentPage < pages) {
              pageInfo.nextLink = `http://localhost:8080/category?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
            }

            if (currentPage > 1) {
              pageInfo.prevLink = `http://localhost:8080/category?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
            }

            res.send({
              success: true,
              message: 'List of Category',
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
  updateCategory: (req, res) => {
    let { category_id } = req.params
    category_id = Number(category_id)
    const { category_name = '' } = req.body
    if (category_name.trim()) {
        updateCategoryModel(category_name, (err, result) => {
        console.log(err)
        if (!err) {
          if (result.affectedRows && result.warningCount === 0) { // untuk mengecek apakah price nya sebuah angka pake warningCount
            res.send({
              success: true,
              message: `Category with id ${category_id} Has been updated!`
            })
          } else if (!result.affectedRows) {
            res.send({
              success: false,
              message: `Category ${category_id} not found!`
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
  updatePartialCategory: (req, res) => {
    let { category_id } = req.params
    category_id = Number(category_id)
    const { category_name = '' } = req.body
    if (category_name.trim()) {
      const data = Object.entries(req.body).map(element => {
        return parseInt(element[1]) > 0 ? `${element[0]}=${element[1]}` : `${element[0]}='${element[1]}'`
      })
      console.log(data)
      updatePartialModel([data, category_id], (err, result) => {
        console.log(result)
        if (!err) {
          if (result.affectedRows && result.warningCount === 0) { // untuk mengecek result.warningCount === 0 jika warningCount nya tidak sama dengan 0, apakah price nya sebuah angka pake warningCount
            res.send({
              success: true,
              message: `Category with id ${category_id} Has been updated!`
            })
          } else if (!result.affectedRows) {
            res.send({
              success: false,
              message: `id ${category_id} not found!`
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
  deleteCategory: (req, res) => {
    const { category_id } = req.params
    deleteProductModel(category_id, (err, result) => {
      console.log(err)
      if (!err) {
        if (result.affectedRows) {
          res.send({
            success: true,
            message: `Category with id ${category_id} Has been deleted!`
          })
        } else if (!result.affectedRows) {
          res.send({
            success: false,
            message: `id ${category_id} not found!`
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
