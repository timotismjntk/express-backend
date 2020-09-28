const userModel = require('../models/usersModel')
const paging = require('../helpers/pagination')
const responseStandard = require('../helpers/response')
const joi = require('joi')
const bcrypt = require('bcrypt')

const { APP_URL} = process.env

module.exports = {
    read: async (req, res) => {
        const count = await userModel.countUsers()
        const page = paging(req, count)
        const { offset, pageInfo } = page
        const { limitData: limit } = pageInfo
        const results = await userModel.readUsers([limit, offset])
        return responseStandard(res, 'List of Users', {results, pageInfo})
    },
    create: async(req, res) => {
        const schema = joi.object({
            role_id: joi.string().required(),
            name: joi.string().required(),
            email: joi.string().required(),
            password: joi.string().required(),
            phone_number: joi.string().required(),
            address: joi.string().required()
        })

        let { value: results, error } = schema.validate(req.body)
        if (error) {
            return responseStandard(res, 'Error', {error: error.message}, 400, false)
        } else {
            const { email } = results
            const isExist = await userModel.getUserByCondition({ email })
            // console.log(isExist)
            if (isExist.length > 0) {
                return responseStandard(res, 'Email already used', {}, 401, false)
            } else {
                // console.log(req.body)
                if(!req.file) {
                    return responseStandard(res, 'Invalid file type. Only image files are allowed.', {}, 500,)
                } else {
                    if(req.file.size >= 5000) {
                        return responseStandard(res, 'maximum allowed image size is 500 KB', {}, 500,)
                    }
                }
                const salt = await bcrypt.genSalt(10)   // untuk generate salt
                const hashedPassword = await bcrypt.hash(results.password, salt)    //untuk membuat hash password
                let picture = `${APP_URL}uploads/${req.file.filename}`
                results = {
                    ...results,
                    password: hashedPassword,
                    profile_picture: picture
                }
                const data = await userModel.createUser(results)
                if (data.affectedRows) {
                    results = {
                        id: data.insertId,
                        ...results,
                        password: undefined // untuk membuat password tidak ditampilkan atau agar tidak dilihat oleh user
                    }
                    return responseStandard(res, 'Create User Successfully', { results }, 200, true)
                } else {
                    return responseStandard(res, 'Failed to create user', {}, 401, false)
                }
            }
        }
    },
    updateUser: async (req, res) => {
        let { id } = req.params
        id = Number(id)
        const schema = joi.object({
            role_id: joi.string().required(),
            name: joi.string().required(),
            email: joi.string().required(),
            password: joi.string().required(),
            phone_number: joi.string().required(),
            address: joi.string().required()
        })

        let { value: results, error } = schema.validate(req.body)
        if (error) {
            return responseStandard(res, 'Error', {error: error.message}, 400, false)
        } else {
            let picture = `${APP_URL}uploads/${req.file.filename}`
            let { role_id, name, email, password, phone_number, address  } = results
            // const salt = await bcrypt.genSalt(10)   // untuk generate salt
            const hashedPassword = await bcrypt.hash(results.password, 10) //untuk membuat hash password
            role_id = Number(role_id)
            console.log(hashedPassword)
            const update = await userModel.updateUser({role_id, name, email, password: hashedPassword, phone_number, address, profile_picture: picture}, id )
            // console.log(results)
            if(!req.file) {
                    return responseStandard(res, 'Invalid file type. Only image files are allowed.', {}, 500,)
                } else {
                    if(req.file.size >= 5000) {
                        return responseStandard(res, 'maximum allowed image file size is 500 KB', {}, 500,)
                    }
                }
            if(update.affectedRows) {
                return responseStandard(res, `User Has been Updated`, {})
            } else {
                return responseStandard(res, 'User Not found', {}, 401, false)
            }
        }
    },
    updateUserPartial: async (req, res) => {
        let { id } = req.params
        id = Number(id)
        const schema = joi.object({
            role_id: joi.string(),
            name: joi.string(),
            email: joi.string(),
            password: joi.string(),
            phone_number: joi.string(),
            address: joi.string()
        })
        let { value: results, error } = schema.validate(req.body)
        if (error) {
            return responseStandard(res, 'Error', {error: error.message}, 400, false)
        } else {
            
        let { role_id, name, email, password, phone_number, address } = results
            role_id = Number(role_id)
            
            if (password) {
                const salt = await bcrypt.genSalt(10)   // untuk generate salt
                const hashedPassword = await bcrypt.hash(results.password, salt) //untuk membuat hash password
                results = {
                    password: hashedPassword
                }
                console.log(results)
                // console.log(Object.values(results.split('')))
                const update = await userModel.updateUserPartial(results, id )
                // console.log(update)
                // console.log(results)
                if(update.affectedRows) {
                    return responseStandard(res, `User Has been Updated`, {})
                } else {
                    return responseStandard(res, 'User Not found', {}, 401, false)
                }
            } else if (role_id || name || email || phone_number || address){
                results = {
                    ...results,
                    password: undefined
                }
                const update = await userModel.updateUserPartial(results, id )
                // console.log(update)
                // console.log(results)
                if(update.affectedRows) {
                    return responseStandard(res, `User Has been Updated`, {})
                } else {
                    return responseStandard(res, 'User Not found', {}, 401, false)
                }
            } else {
                return responseStandard(res, 'At least fill one column!', '', 400, false)
            }
        }
    },
    getUserId: async (req, res) => {
        const { id } = req.params
        const userId = await userModel.getUserByCondition({ id })
        if(userId.length > 0) {
            return responseStandard(res, `User with Id ${id}`, {userId})
        } else {
            return responseStandard(res, 'User Not found', {}, 401, false)
        }
    },
    deleteUser: async (req, res) => {
        const { id } = req.params
        let uid  = Number(id)
        // console.log(uid)
        const userId = await userModel.deleteUser({id: uid})
        if(userId.affectedRows){
            return responseStandard(res, `User Has been deleted`, {})
        } else {
            return responseStandard(res, 'User Not found', {}, 401, false)
        }
    }
}