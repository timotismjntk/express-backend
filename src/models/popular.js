const db = require('../helpers/db')
const tableProduct = 'product'
const tableRating = 'rating'

module.exports = {
    getPopularItemModel: (id, cb) => {
        db.query(`SELECT product.id, product.name, product.price, product.store, rating.rating_total FROM ${tableProduct} INNER JOIN ${tableRating} ON product.rating_id=rating.rating_id ORDER BY rating.rating_total ${id}`, (err, result, _fields) => {
          cb(err, result)
        })
      }
}