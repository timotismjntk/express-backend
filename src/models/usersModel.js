const db = require('../helpers/db')
const table = 'users'

/*
    INSERT INTO post ? SET ? WHERE ?        // tanda tanya '?' adalah prepare statement yang nantinya akan mengisi kedalamanya value dari sebuah array yang sudah diserialize

    [{title: 'hello'}, {id: 1}]

    akan menghasilkan,
    INSERT INTO post SET title=hello WHERE id=1

    tanda tanya ?? dua akan menghasilkan value string
*/

module.exports = {
  readUsers: (data = [5, 0]) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users LIMIT ? OFFSET ?', data, (err, result, _fields) => {
        console.log(data)
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
      db.query('INSERT INTO users SET ?', data, (err, result, _fields) => {
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
  updateUser: (data = {}, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET ? WHERE id = ${id}`, data, (err, result, _fields) => {
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
  updateUserPartial: (data = {}, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET ? WHERE id = ${id}`, data, (err, result, _fields) => {
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
  deleteUser: (data) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE ?', data, (err, result, _fields) => {
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
