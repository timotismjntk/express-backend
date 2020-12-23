const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const responseStandard = require('../helpers/response')
const db = require('../helpers/db')
const joi = require('joi')
const { v4: uuidv4 } = require('uuid')

const userModel = require('../models/authModel')

module.exports = {
  loginController: (req, res) => {
    const { email } = req.body
    const { password } = req.body
    console.log(password)

    if (email && password) {
      db.query("SELECT * FROM `users` WHERE `email` ='" + email + "'", (_err, result) => {
        if (result.length) {
          console.log(result[0].role_id)
          var uid = result[0].id
          var store_name = result[0].name
          var mail = result[0].email
          var role = result[0].role_id
          console.log('ini' + role)
          if (result[0].password) {
            bcrypt.compare(password, result[0].password, (_err, result) => {
              console.log('Ini ', password)
              // console.log('condition ', result)
              console.log('condition ', mail)
              if (result) {
                if (role !== 2) {
                  store_name = ''
                }
                jwt.sign({ role_id: role, store_name, email: mail, id: uid }, process.env.CUST_SECRET_KEY, { expiresIn: '7d' }, (_err, token) => {
                  return responseStandard(res, 'Login Succes', { token: token })
                })
              } else {
                return responseStandard(res, 'Wrong email or password', {}, 400, false)
              }
            })
          }
        } else {
          return responseStandard(res, 'Wrong email or password', {}, 400, false)
        }
      })
    } else {
      return responseStandard(res, 'Please fill the form', {}, 400, false)
    }
  },
  signUpController: async (req, res) => {
    const schema = joi.object({
      name: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().required()
      // phone_number: joi.string().required()
    })

    let { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      // console.log(req)
      const { email } = results
      const isExist = await userModel.getUserByCondition({ email })
      // console.log(isExist)
      if (isExist.length > 0) {
        return responseStandard(res, 'Email already used', {}, 401, false)
      } else {
        const { name } = results
        const salt = await bcrypt.genSalt(10) // untuk generate salt
        const hashedPassword = await bcrypt.hash(results.password, salt) // untuk membuat hash password
        results = {
          ...results,
          role_id: 3,
          password: hashedPassword
          // profile_picture: "https://ui-avatars.com/api/?size=256&name=" + name
        }
        const data = await userModel.createUser(results)
        if (data.affectedRows) {
          results = {
            id: data.insertId,
            ...results,
            password: undefined // untuk membuat password tidak ditampilkan atau agar tidak dilihat oleh user
          }
          return responseStandard(res, 'Success to signup', { results }, 200, true)
        } else {
          return responseStandard(res, 'Failed to signup', {}, 401, false)
        }
      }
    }
  },
  signUpSellerController: async (req, res) => {
    const schema = joi.object({
      name: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().required(),
      phone_number: joi.string().required()
    })

    let { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      // console.log(req)
      const { email } = results
      const isExist = await userModel.getUserByCondition({ email })
      // console.log(isExist)
      if (isExist.length > 0) {
        return responseStandard(res, 'Email already used', {}, 401, false)
      } else {
        const { name } = results
        const salt = await bcrypt.genSalt(10) // untuk generate salt
        const hashedPassword = await bcrypt.hash(results.password, salt) // untuk membuat hash password
        results = {
          ...results,
          role_id: 2,
          password: hashedPassword
        }
        const data = await userModel.createUser(results)
        if (data.affectedRows) {
          results = {
            id: data.insertId,
            ...results,
            password: undefined // untuk membuat password tidak ditampilkan atau agar tidak dilihat oleh user
          }
          return responseStandard(res, 'Signup to seller success', { results }, 200, true)
        } else {
          return responseStandard(res, 'Failed to create user', {}, 401, false)
        }
      }
    }
  },
  getResetCode: async (req, res) => {
    const { email } = req.body
    try {
      const isExist = await userModel.getUserByCondition({ email })
      if (isExist.length) {
        let resetCode = uuidv4()
        resetCode = resetCode.slice(0, 6)
        const results = {
          reset_code: resetCode
        }
        const update = await userModel.resetPassword(results, email)
        if (update.affectedRows) {
          return responseStandard(res, 'Reset Code sent successfully', { result: resetCode })
        }
      } else {
        return responseStandard(res, 'Email isn\'t registered', {}, 404)
      }
    } catch (e) {
      return responseStandard(res, 'Internal Server error', { error: e.message }, 500)
    }
  },
  resetPasswordVerifiyResetCode: async (req, res) => {
    const schema = joi.object({
      email: joi.string().required(),
      reset_code: joi.string().required()
    })
    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { email, reset_code: resetCode } = results
      const isExist = await userModel.getUserByCondition({ email })
      if (isExist.length > 0) {
        if (resetCode === isExist[0].reset_code) {
          return responseStandard(res, 'Reset Code is Same', {})
        } else {
          return responseStandard(res, 'Reset Code doesn\'t Same', {}, 400)
        }
      } else {
        return responseStandard(res, 'Wrong email', {}, 400, false)
      }
    }
  }
}
