const qs = require('querystring')

const { getDetailRatingModel, createRatingModel, getRatingModel, getRatingModelData, updateRatingModel, deleteProductModel } = require('../models/rating')

module.exports = {
  getDetailRating: (req, res) => {
    const { rating_id } = req.params
    console.log(req.params)
    getDetailRatingModel(id, (result) => {
      // console.log(result)
      if (result.length) {
        res.send({
          success: true,
          message: `Rating with id ${rating_id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: 'Rating not found!'
        })
      }
    })
  },
  createRating: (req, res) => {
    const { rating_total } = req.body
    if (rating_total) {
      createRatingModel(rating_total, (err, result) => {
        if (!err) {
          res.status(201).send({
            success: true,
            message: 'Rating has been created',
            data: {
              rating_id: result.insertId,
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
  getRating: (req, res) => {
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
      searchKey = 'Rating_id'
      searchValue = search || ''
    }
    if (typeof orderBy === 'object'){
      orderByKey = Object.keys(orderBy)[0]
      orderByValue = Object.values(orderBy)[0]
    } else {
      orderByKey = 'Rating_id'
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

    getRatingModel([searchKey, searchValue, limit, offset, orderByKey, orderByValue], (err, result) => {
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
            getRatingModelData((data) => {
            const { count } = data[0]
            pageInfo.count = count
            pageInfo.pages = Math.ceil(count / limit)

            const { pages, currentPage } = pageInfo
            console.log(req.query)
            if (currentPage < pages) {
              pageInfo.nextLink = `http://localhost:8080/rating?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
            }

            if (currentPage > 1) {
              pageInfo.prevLink = `http://localhost:8080/rating?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
            }

            res.send({
              success: true,
              message: 'List of Rating',
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
  updateRating: (req, res) => {
    let { rating_id } = req.params
    rating_id = Number(rating_id)
    const { rating_total = '' } = req.body
    if (rating_total.trim()) {
        updateRatingModel(rating_total, (err, result) => {
        console.log(err)
        if (!err) {
          if (result.affectedRows && result.warningCount === 0) { // untuk mengecek apakah price nya sebuah angka pake warningCount
            res.send({
              success: true,
              message: `Rating with id ${rating_id} Has been updated!`
            })
          } else if (!result.affectedRows) {
            res.send({
              success: false,
              message: `Category ${rating_id} not found!`
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
  updatePartialRating: (req, res) => {
    let { rating_id } = req.params
    rating_id = Number(rating_id)
    const { rating_total = '' } = req.body
    if (rating_total.trim()) {
      const data = Object.entries(req.body).map(element => {
        return parseInt(element[1]) > 0 ? `${element[0]}=${element[1]}` : `${element[0]}='${element[1]}'`
      })
      console.log(data)
      updatePartialRating([data, rating_id], (err, result) => {
        console.log(result)
        if (!err) {
          if (result.affectedRows && result.warningCount === 0) { // untuk mengecek result.warningCount === 0 jika warningCount nya tidak sama dengan 0, apakah price nya sebuah angka pake warningCount
            res.send({
              success: true,
              message: `Category with id ${rating_id} Has been updated!`
            })
          } else if (!result.affectedRows) {
            res.send({
              success: false,
              message: `id ${rating_id} not found!`
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
  deleteRating: (req, res) => {
    const { rating_id } = req.params
    deleteRatingModel(rating_id, (err, result) => {
      console.log(err)
      if (!err) {
        if (result.affectedRows) {
          res.send({
            success: true,
            message: `Category with id ${rating_id} Has been deleted!`
          })
        } else if (!result.affectedRows) {
          res.send({
            success: false,
            message: `id ${rating_id} not found!`
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
