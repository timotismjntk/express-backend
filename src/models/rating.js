const db = require('../helpers/db')
const table = 'rating'

module.exports = {
    getDetailRatingModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id=${id}`, (_err, result, _fields) => {
      cb(result)
    })
  },
  getDetailRatingModel2: (arr, cb) => {
    db.query(`SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[4]} ${arr[5]} LIMIT ${arr[2]} OFFSET ${arr[3]}`, (err, data, _fields) => {
      cb(err, data)
    })
  },
  createRatingModel: (rating_total, cb) => {
    db.query(`INSERT INTO ${table} (rating_total) VALUES (${rating_total})`, (err, result, _field) => {
      cb(err, result)
    })
  },
  getRatingModelData: (cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table} `,
      (_err, data, _fields) => {
        cb(data)
      })
  },
  getRatingModel: (arr, cb) => {
    db.query(`SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[4]} ${arr[5]} LIMIT ${arr[2]} OFFSET ${arr[3]}`, (err, data, _fields) => {
      cb(err, data)
    })
  },
  updateRatingModel: (arr, id, cb) => {
    db.query(`UPDATE ${table} SET name="${arr[0]}", price=${arr[1]}, store='${arr[2]}', rating=${arr[3]}, category='${arr[4]}' WHERE id=${id}`,
      (err, result, _fields) => {
        cb(err, result)
      })
  },
  updatePartialModel: (arr, cb) => {
    db.query(`UPDATE ${table} SET ${arr[0]} WHERE id=${arr[1]}`, (err, result, _fields) => {
      cb(err, result)
    })
  },
  deleteRatingModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id=${id}`, (err, result, _fields) => {
      cb(err, result)
    })
  }
}
