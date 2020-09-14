const qs = require('querystring')

const { getNewItemModel } = require('../models/new_item')

// const table = 'items'

module.exports = {
  getNewItem: (req, res) => {
    const { id } = req.params
    console.log(req.params)
    getNewItemModel((err, result) => {
      if (!err) {
        res.send({
          success: true,
          message: `Found`,
          data: result
        })
      } else {
        res.send({
          success: false,
          message: 'not found!'
        })
      }
    })
  }
}