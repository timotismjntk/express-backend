const qs = require('querystring')

const { getDetailUserModel, createUserModel, getUserModel, getUserModelData, updateUserModel, updatePartialModel, deleteUserModel } = require('../models/user')

module.exports = {
  getDetailUser: (req, res) => {
    const { id } = req.params
    console.log(req.params)
    getDetailUserModel(id, (err, result) => {
      // console.log(result)
      if (result.length) {
        res.send({
          success: true,
          message: `User with id ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: 'User not found!'
        })
      }
    })
  },
  createUser: (req, res) => {
    const { name, email, phone_number, gender } = req.body
    if (name && email && phone_number && gender) {
      createUserModel([name, email, phone_number, gender], (err, result) => {
        if (!err) {
          res.status(201).send({
            success: true,
            message: 'User has been added',
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
  getUser: (req, res) => {
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
      searchKey = 'id'
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

    getUserModel([searchKey, searchValue, limit, offset, orderByKey, orderByValue], (err, result) => {
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
            getUserModelData((data) => {
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
              message: 'List of User',
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
  updateUser: (req, res) => {
    let { id } = req.params
    id = Number(id)
    const { name = '', email = '', phone_number = '', gender = ''} = req.body
    if (name.trim() && email.trim() && phone_number.trim() && gender.trim()) {
        updateUserModel([name, email, phone_number, gender], id, (err, result) => {
        console.log(err)
        if (!err) {
          if (result.affectedRows && result.warningCount === 0) { // untuk mengecek apakah price nya sebuah angka pake warningCount
            res.send({
              success: true,
              message: `User with id ${id} Has been updated!`
            })
          } else if (!result.affectedRows) {
            res.send({
              success: false,
              message: `User ${id} not found!`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed to update user!'
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
  updatePartialUser: (req, res) => {
    let { id } = req.params
    id = Number(id)
    const { name = '' } = req.body
    if (name.trim()) {
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
              message: `Category with id ${id} Has been updated!`
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
  deleteUser: (req, res) => {
    const { id } = req.params
    deleteUserModel(id, (err, result) => {
      console.log(err)
      if (!err) {
        if (result.affectedRows) {
          res.send({
            success: true,
            message: `User with id ${id} Has been deleted!`
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
