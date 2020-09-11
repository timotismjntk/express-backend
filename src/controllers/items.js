const qs = require('querystring')

const { getItemModel, createItemModel, getItemsIdModel, getItemIdModel3, updateItemModel, updatePartialItemModel, deleteItemModel } = require('../models/items')

module.exports = {
  getDetailItem: (req, res) => {
    const { id } = req.params
    getItemModel(id, (result) => {
      console.log(result)
      if (result.length) {
        res.send({
          success: true,
          message: `Item with id ${id}`,
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
  createItem: (req, res) => {
    const { name, price, description } = req.body
    if (name && price && description) {
      createItemModel([name, price, description], (err, result) => {
        if (!err) {
          res.status(201).send({
            success: true,
            message: 'Item has been created',
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
  getItems: (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'name'
      searchValue = search || ''
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

    getItemsIdModel([searchKey, searchValue, limit, offset], (err, result) => {
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
          getItemIdModel3((data) => {
            const { count } = data[0]
            pageInfo.count = count
            pageInfo.pages = Math.ceil(count / limit)

            const { pages, currentPage } = pageInfo

            if (currentPage < pages) {
              pageInfo.nextLink = `http://localhost:8080/items?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
            }

            if (currentPage > 1) {
              pageInfo.prevLink = `http://localhost:8080/items?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
            }

            res.send({
              success: true,
              message: 'List of items',
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
        res.status(500).send({
          success: false,
          message: 'Internal Server error'
        })
      }
    })
  },
  updateItem: (req, res) => {
    let { id } = req.params
    id = Number(id)
    const { name = '', price = '', description = '' } = req.body
    if (name.trim() && price.trim() && description.trim()) {
      updateItemModel([name, price, description], id, (err, result) => {
        console.log(err)
        if (!err) {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Item with id ${id} Has been updated!`
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
  updatePartialItem: (req, res) => {
    let { id } = req.params
    id = Number(id)
    const { name = '', price = '', description = '' } = req.body
    if (name.trim() || price.trim() || description.trim()) {
      const data = Object.entries(req.body).map(element => {
        return parseInt(element[1]) > 0 ? `${element[0]}=${element[1]}` : `${element[0]}='${element[1]}'`
      })
      console.log(data)
      updatePartialItemModel([id, data], (err, result) => {
        console.log(err)
        if (!err) {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Item with id ${id} Has been updated!`
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
  deleteItem: (req, res) => {
    const { id } = req.params
    deleteItemModel(id, (err, result) => {
      console.log(err)
      if (!err) {
        if (result.affectedRows) {
          res.send({
            success: true,
            message: `Item with id ${id} Has been deleted!`
          })
        } else if (!result.affectedRows) {
          res.send({
            success: false,
            message: `id ${id} not found!`
          })
        } else {
          res.send({
            success: false,
            message: 'Failed to delete item!'
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
