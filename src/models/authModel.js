const db = require('../helpers/db')
const table = 'users'

module.exports = {
  countUsers: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) as count FROM users', (err, result, _fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(result[0].count)
        }
      })
    }
    )
  },
  getUserByCondition: (data) => {
    return new Promise((resolve, reject) => {
      const test = db.query('SELECT * FROM users WHERE ?', data, (err, result, _fields) => {
        // console.log(data)
        if (err) {
          db.rollback(() => {
            reject(err)
          })
        } else {
          resolve(result)
        }
      })
      console.log(test.sql)
    })
  },
  createUser: (data = {}) => {
    return new Promise((resolve, reject) => {
      console.log(data)
      const test = db.query('INSERT INTO users SET ?', data, (err, result, _fields) => {
        if (err) {
          db.rollback(() => {
            reject(err)
          })
        } else {
          resolve(result)
        }
      })
      console.log(test)
    })
  },
  updateUser: (data = {}, id) => {
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
  resetPassword: (data = {}, email) => {
    return new Promise((resolve, reject) => {
      const test = db.query(`UPDATE ${table} SET ? WHERE email = '${email}'`, data, (err, result, _fields) => {
        if (err) {
          db.rollback(() => {
            reject(err)
          })
        } else {
          resolve(result)
        }
      })
      console.log(test.sql)
    })
  }
}
