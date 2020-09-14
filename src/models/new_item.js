const db = require('../helpers/db')
const table = 'product'

module.exports = {
  getNewItemModel: (cb) => {
    db.query(`SELECT * FROM ${table} ORDER BY created_at ASC`, (err, result, _fields) => {
      cb(err, result)
    })
  }
}