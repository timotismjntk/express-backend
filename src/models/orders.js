const db = require('../helpers/db')
const table = 'orders'

module.exports = {
  read: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table} WHERE ? ORDER BY id DESC`, data, (err, result, _fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  detailOrder: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT transactions.id,
      transactions.order_id,
      orders.userId,
      orders.tracking_number,
      orders.summary,
      orders.total_quantity,
      orders.delivery_address,
      orders.delivery_fee,
      transactions.product_id,
      transactions.quantity,
      product.id,
      product.name,
      product_image.url,
      product.price,
      product.store_name,
      product.description,
      transactions.created_at
      FROM transactions
      INNER JOIN orders ON transactions.order_id = orders.id
      INNER JOIN product ON transactions.product_id = product.id
      INNER JOIN product_image ON product.id = product_image.product_id
      WHERE orders.userId = ${data[0]} AND orders.id = ${data[1]}`,
      (err, result, _fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  createOrder: (data = {}) => {
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
