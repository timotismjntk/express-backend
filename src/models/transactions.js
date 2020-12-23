const db = require('../helpers/db')
const table = 'transactions'

module.exports = {
  read: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT cart.id, cart.product_id, product.name, SUM(cart.quantity) AS quantity, SUM(price*cart.quantity) AS price, product_image.url, cart.summary FROM cart INNER JOIN product ON cart.product_id = product.id INNER JOIN product_image ON product.id = product_image.product_id WHERE cart. ? GROUP BY cart.product_id', data, (err, result, _fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  createTransaction: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${table} SET ?`, data, (err, result, _fields) => {
        if (err) {
          db.rollback(() => {
            reject(err)
          })
        } else {
          resolve(result)
        }
      })
    })
  }
}
