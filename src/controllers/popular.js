const qs = require('querystring')

const { getPopularItemModel } = require('../models/popular')

// const table = 'items'

module.exports = {
  getPopularItem: (req, res) => {
    const { id = 'DESC' } = req.params
    console.log(req.params)
    getPopularItemModel(id, (err, result) => {
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