const db = require('../helpers/db')
const table = 'product'

module.exports = {
  getNewItemModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} ORDER BY createdAt ${id}`, (err, result, _fields) => {
      cb(err, result)
    })
  }
}
