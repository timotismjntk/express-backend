// const db = require('../helpers/db')
// const table = 'user'

const Sequelize = require("sequelize")
const user = require("../helpers/user_db")

module.exports = user.sequelize.define(
  'user',
  {
      userid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
  },
  {
      timestamps: false
  }
)

// module.exports = {
//   getDetailUserModel: (id, cb) => {
//     db.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, result, _fields) => {
//       cb(err, result)
//     })
//   },
//   getDetailUserModel2: (arr, cb) => {
//     db.query(`SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[4]} ${arr[5]} LIMIT ${arr[2]} OFFSET ${arr[3]}`, (err, data, _fields) => {
//       cb(err, data)
//     })
//   },
//   createUserModel: (arr, cb) => {
//     db.query(`INSERT INTO ${table} (name, email, phone_number, gender)
//     VALUES ("${arr[0]}", "${arr[1]}", ${arr[2]}, '${arr[3]}')`, (err, result, _field) => {
//       cb(err, result)
//     })
//   },
//   getUserModelData: (cb) => {
//     db.query(`SELECT COUNT(*) AS count FROM ${table} `,
//       (_err, data, _fields) => {
//         cb(data)
//       })
//   },
//   getUserModel: (arr, cb) => {
//     db.query(`SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[4]} ${arr[5]} LIMIT ${arr[2]} OFFSET ${arr[3]}`, (err, data, _fields) => {
//       cb(err, data)
//     })
//   },
//   updateUserModel: (arr, id, cb) => {
//     db.query(`UPDATE ${table} SET name="${arr[0]}", email='${arr[1]}', phone_number=${arr[2]}, gender='${arr[3]}', alamat=${arr[4]} WHERE id=${id}`,
//       (err, result, _fields) => {
//         cb(err, result)
//       })
//   },
//   updatePartialModel: (arr, cb) => {
//     db.query(`UPDATE ${table} SET ${arr[0]} WHERE id=${arr[1]}`, (err, result, _fields) => {
//       cb(err, result)
//     })
//   },
//   deleteUserModel: (id, cb) => {
//     db.query(`DELETE FROM ${table} WHERE id=${id}`, (err, result, _fields) => {
//       cb(err, result)
//     })
//   }
// }
