const db = require('../helpers/db')
const table = 'category'

module.exports = {
  getDetailCategoryModel: (id, cb) => {
    db.query(`SELECT product.id, product.name, product.price, product.store, category.category_name FROM product INNER JOIN category ON product.category_id=category.category_id WHERE product.category_id=${id}`, (err, result, _fields) => {
      cb(err, result)
    })
  },
  getDetailCategoryModel2: (arr, cb) => {
    db.query(`SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[4]} ${arr[5]} LIMIT ${arr[2]} OFFSET ${arr[3]}`, (err, data, _fields) => {
      cb(err, data)
    })
  },
  createCategoryModel: (category_name, cb) => {
    db.query(`INSERT INTO ${table} (category_name)
    VALUES ("${category_name}")`, (err, result, _field) => {
      cb(err, result)
    })
  },
  getCategoryModelData: (cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table} `,
      (_err, data, _fields) => {
        cb(data)
      })
  },
  getCategoryModel: (arr, cb) => {
    db.query(`SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[4]} ${arr[5]} LIMIT ${arr[2]} OFFSET ${arr[3]}`, (err, data, _fields) => {
      cb(err, data)
    })
  },
  updateCategoryModel: (arr, id, cb) => {
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
  deleteCategoryModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id=${id}`, (err, result, _fields) => {
      cb(err, result)
    })
  }
}
