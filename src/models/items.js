const db = require('../helpers/db')
const table = 'items'

module.exports = {
  getItemModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id=${id}`, (_err, result, _fields) => {
      cb(result)
    })
  },
  createItemModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (name, price, description)
    VALUES ('${arr[0]}', ${arr[1]}, '${arr[2]}')`, (err, result, _field) => {
      cb(err, result)
    })
  },
  getItemsIdModel: (arr, cb) => {
    db.query(`SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' LIMIT ${arr[2]} OFFSET ${arr[3]}`, (err, data, _fields) => {
      cb(err, data)
    })
  },
  getItemIdModel2: (arr, cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%'`, (_err, result, _fields) => {
      cb(result)
    })
  },
  getItemIdModel3: (cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table} `,
      (_err, data, _fields) => {
        cb(data)
      })
  },
  updateItemModel: (arr, id, cb) => {
    db.query(`UPDATE ${table} SET name='${arr[0]}', price=${arr[1]}, description='${arr[2]}' WHERE id=${id}`,
      (err, result, _fields) => {
        cb(err, result)
      })
  },
  updatePartialItemModel: (arr, cb) => {
    db.query(`UPDATE ${table} SET ${arr[1]} WHERE id=${arr[0]}`, (err, result, _fields) => {
      cb(err, result)
    })
  },
  deleteItemModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id=${id}`, (err, result, _fields) => {
      cb(err, result)
    })
  }
}
