const db = require('../helpers/db')
const table = 'product'

module.exports = {
    getDetailProductModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id=${id}`, (_err, result, _fields) => {
      cb(result)
    })
  },
  createProductModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (name, price, store, rating_id, category_id)
    VALUES ("${arr[0]}", '${arr[1]}', '${arr[2]}', ${arr[3]}, '${arr[4]}')`, (err, result, _field) => {
      cb(err, result)
    })
  },
  getProductModel: (arr, cb) => {
    db.query(`SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[4]} ${arr[5]} LIMIT ${arr[2]} OFFSET ${arr[3]}`, (err, data, _fields) => {
      cb(err, data)
    })
  },
  getProductModel2: (arr, cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%'`, (_err, result, _fields) => {
      cb(result)
    })
  },
  getProductModelData: (cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table}`,
      (_err, data, _fields) => {
        cb(data)
      })
  },
  updateProductModel: (arr, id, cb) => {
    db.query(`UPDATE ${table} SET name="${arr[0]}", price=${arr[1]}, store='${arr[2]}', rating_id=${arr[3]}, category_id=${arr[4]} WHERE id=${id}`,
      (err, result, _fields) => {
        cb(err, result)
      })
  },
  updatePartialModel: (arr, cb) => {
    db.query(`UPDATE ${table} SET ${arr[0]} WHERE id=${arr[1]}`, (err, result, _fields) => {
      cb(err, result)
    })
  },
  deleteProductModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id=${id}`, (err, result, _fields) => {
      cb(err, result)
    })
  }
}
