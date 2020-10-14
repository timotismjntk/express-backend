const userModel = require('../models/managesUserModel')
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
    updateUser: async (req, res) => {
        let id = req.user.id
        const schema = joi.object({
            name: joi.string().required(),
            email: joi.string().required(),
            password: joi.string().required(),
            phone_number: joi.string().required(),
            // address: joi.string().required()
        })

        let { value: results, error } = schema.validate(req.body)
        if (error) {
            return responseStandard(res, 'Error', {error: error.message}, 400, false)
        } else {
            if(req.files.length === 0) {
                return responseStandard(res, 'Images cannot be empty', {}, 500, false)
            }
            if (req.files[0].fieldname) {
                console.log('true')
            }

            for (let i = 0; i < req.files.length; i++) {
                if (req.files[i].mimetype === 'error') {
                    console.log('true')
                    return responseStandard(res, 'Invalid file type. Only image files are allowed.', {}, 500, false)
                } else {
                    if(req.files[i].size >= 50000) {
                        console.log('true')
                        return responseStandard(res, 'maximum allowed file size 500 KB', {}, 500, false)
                    }
                }
            }
            // let {profile_picture} = req.body
            let url = ''
            for (let x = 0; x < req.files.length; x++) {
                    let picture = `${APP_URL}uploads/${req.files[x].filename}`
                    url += picture
                }
            console.log(url)
            results = {
            ...results,
            profile_picture: url
            }
            // const salt = await bcrypt.genSalt(10)   // untuk generate salt
            const hashedPassword = await bcrypt.hash(results.password, 10) //untuk membuat hash password
            // role_id = Number(role_id)
            results = {
                ...results,
                password: hashedPassword
            }
            console.log(hashedPassword)
            const update = await userModel.updateUser(results, id )
            // console.log(results)
            if(update.affectedRows) {
                return responseStandard(res, `User Has been Updated`, {})
            } else {
                return responseStandard(res, 'User Not found', {}, 401, false)
            }
        }
    },
    updateUserPartial: async (req, res) => {
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
            return responseStandard(res, 'Error', {error: error.message}, 400, false)
        } else {
            
        let { name, email, password, phone_number, gender, dateOfBirth } = results
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
                    return responseStandard(res, `User Has been Updated`, {results})
                } else {
                    return responseStandard(res, 'User Not found', {}, 401, false)
                }
            } else if (name || email || phone_number || gender || dateOfBirth || req.files){
                // results = {
                //     ...results,
                //     password: undefined
                // }
                // if (req.files[0].fieldname) {
                //     console.log('true')
                // }
        
                if (req.files) {
                    if(req.files.length === 0) {
                        // console.log(req.files)
                        const update = await userModel.updateUserPartial(results, id)
                        console.log('tanpa')
                        if(update.affectedRows) {
                            return responseStandard(res, `User Has been Updated`, {results})
                        } else {
                            return responseStandard(res, 'User Not found', {}, 401, false)
                        }
                    } else if (req.files) {
                        for (let i = 0; i < req.files.length; i++) {
                            if (req.files[i].mimetype === 'error') {
                                console.log('true')
                                return responseStandard(res, 'Invalid file type. Only image files are allowed.', {}, 500, false)
                            } else {
                                if(req.files[i].size >= 500000) {
                                    console.log('true')
                                    return responseStandard(res, 'maximum allowed file size 500 KB', {}, 500, false)
                                }
                            }
                        }
                        
                        let url = ''
                        for (let x = 0; x < req.files.length; x++) {
                                let picture = `${APP_URL}uploads/${req.files[x].filename}`
                                url += picture
                            }
                            console.log(url)
                        results = {
                        ...results,
                        profile_picture: url
                        }
                        const update = await userModel.updateUserPartial(results, id)
                        
                    if(update.affectedRows) {
                        return responseStandard(res, `User Has been Updated`, {results})
                    } else {
                        return responseStandard(res, 'User Not found', {}, 401, false)
                    }
                    }
                }
                else {
                    const update = await userModel.updateUserPartial(results, id)
                        
                    if(update.affectedRows) {
                        return responseStandard(res, `User Has been Updated`, {results})
                    } else {
                        return responseStandard(res, 'User Not found', {}, 401, false)
                    }
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
        const delUser = await userModel.deleteUser({id: uid})
        if(delUser.affectedRows){
            return responseStandard(res, `User Has been deleted`, {})
        } else {
            return responseStandard(res, 'User Not found', {}, 401, false)
        }
    }
}