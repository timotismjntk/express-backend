const db = require('../helpers/db')
const table = 'users'

module.exports = {
  getDetailProfile: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table} WHERE ?`, data, (err, result, _fields) => {
        // console.log(data)
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  updateProfile: (data = {}, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE ${table} SET ? WHERE id = ${id}`, data, (err, result, _fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  updatePartial: (data = {}, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE ${table} SET ? WHERE id = ${id}`, data, (err, result, _fields) => {
        if (err) {
          db.rollback(() => {
            reject(err)
          })
        } else {
          resolve(result)
        }
      })
    })
  },
  updateUserPartialPassword: (data = {}, email) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET ? WHERE email = '${email}'`, data, (err, result, _fields) => {
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
