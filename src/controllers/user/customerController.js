const customerModel = require('../../models/customerModel')
const userModel = require('../../models/managesUserModel')
const responseStandard = require('../../helpers/response')
const joi = require('joi')
const bcrypt = require('bcrypt')
const { APP_URL } = process.env

module.exports = {

  detailProfile: async (req, res) => {
    const { id } = req.user
    const userId = await customerModel.getDetailProfile({ id })
    if (userId.length > 0) {
      return responseStandard(res, `Profile with Id ${id}`, { userId })
    } else {
      return responseStandard(res, 'Profile Not found', {}, 401, false)
    }
  },

  updateProfile: async (req, res) => {
    let { id } = req.user
    id = Number(id)
    const schema = joi.object({
      name: joi.string(),
      email: joi.string(),
      password: joi.string(),
      phone_number: joi.string(),
      gender: joi.string(),
      dateOfBirth: joi.string()
    })
    let { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { name, email, password, phone_number, gender, dateOfBirth } = results
      if (password) {
        const salt = await bcrypt.genSalt(10) // untuk generate salt
        const hashedPassword = await bcrypt.hash(results.password, salt) // untuk membuat hash password
        results = {
          password: hashedPassword
        }

        console.log(results)
        // console.log(Object.values(results.split('')))
        const update = await userModel.updateUserPartial(results, id)
        // console.log(update)
        // console.log(results)
        if (update.affectedRows) {
          return responseStandard(res, 'User Has been Updated', { results })
        } else {
          return responseStandard(res, 'User Not found', {}, 401, false)
        }
      } else if (name || email || phone_number || gender || dateOfBirth || req.files) {
        // results = {
        //     ...results,
        //     password: undefined
        // }
        // if (req.files[0].fieldname) {
        //     console.log('true')
        // }

        if (req.files) {
          if (req.files.length === 0) {
            // console.log(req.files)
            const update = await userModel.updateUserPartial(results, id)
            console.log('tanpa')
            if (update.affectedRows) {
              return responseStandard(res, 'User Has been Updated', { results })
            } else {
              return responseStandard(res, 'User Not found', {}, 401, false)
            }
          } else if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
              if (req.files[i].mimetype === 'error') {
                console.log('true')
                return responseStandard(res, 'Invalid file type. Only image files are allowed.', {}, 500, false)
              } else {
                if (req.files[i].size >= 500000) {
                  console.log('true')
                  return responseStandard(res, 'maximum allowed file size 500 KB', {}, 500, false)
                }
              }
            }

            let url = ''
            for (let x = 0; x < req.files.length; x++) {
              const picture = `${APP_URL}uploads/${req.files[x].filename}`
              url += picture
            }
            console.log(url)
            results = {
              ...results,
              profile_picture: url
            }
            const update = await userModel.updateUserPartial(results, id)

            if (update.affectedRows) {
              return responseStandard(res, 'User Has been Updated', { results })
            } else {
              return responseStandard(res, 'User Not found', {}, 401, false)
            }
          }
        } else {
          const update = await userModel.updateUserPartial(results, id)

          if (update.affectedRows) {
            return responseStandard(res, 'User Has been Updated', { results })
          } else {
            return responseStandard(res, 'User Not found', {}, 401, false)
          }
        }
      } else {
        return responseStandard(res, 'At least fill one column!', '', 400, false)
      }
    }
  },
  resetUsersPassword: async (req, res) => {
    const { email, password } = req.body
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10) // untuk generate salt
        const hashedPassword = await bcrypt.hash(password, salt) // untuk membuat hash password
        const update = await customerModel.updateUserPartialPassword({ password: hashedPassword }, email)
        if (update.affectedRows) {
          return responseStandard(res, 'User Has been Updated', { })
        } else {
          return responseStandard(res, 'User Not found', {}, 401, false)
        }
      } else {
        return responseStandard(res, 'At least fill one column!', '', 400, false)
      }
    } catch (e) {
      return responseStandard(res, e.message, {}, 500, false)
    }
  }
}
