// const qs = require('querystring')

const { getNewItemModel } = require('../models/new_item')

// const table = 'items'

module.exports = {
  getNewItem: (req, res) => {
    const { id = 'DESC' } = req.params
    console.log(req.params)
    getNewItemModel(id, (err, result) => {
      if (!err) {
        res.send({
          success: true,
          message: 'New Products',
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
