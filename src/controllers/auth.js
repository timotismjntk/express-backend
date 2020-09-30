const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const responseStandard = require('../helpers/response')
const db = require('../helpers/db')
const joi = require('joi')

const userModel = require('../models/authModel')


module.exports = {
    loginController: (req, res) => {
        let {email} = req.body
        let {password} = req.body
        console.log(password)

        if(email && password) {
            const data = db.query("SELECT * FROM `users` WHERE `email` ='"+email+"'", (err, result) => {
            // console.log(data)
            if(result.length) {
                console.log(result[0].role_id)
                var uid = result[0].id
                var mail = result[0].email
                var role = result[0].role_id
                console.log('ini' +role)
                if(result[0].password){
                    bcrypt.compare(password, result[0].password, (err, result) => {
                        console.log('Ini ', password)
                        // console.log('condition ', result)
                        console.log('condition ', mail)
                        if(result) {
                            jwt.sign({role_id: role, email: mail, id: uid}, process.env.CUST_SECRET_KEY, {expiresIn: 1511}, (err, token)=>{
                                return responseStandard(res, `Token ${token}`)
                            }) 
                        }
                        else {
                            return responseStandard(res, 'Wrong email ord password', {}, 400, false)
                        }
                        })
                }
                }else {
                    return responseStandard(res, 'Wrong email or password', {}, 400, false)
                }
            })
        } else {
            return responseStandard(res, 'Please fill the form', {}, 400, false)
        }
    },
    signUpController: async(req, res) => {
        const schema = joi.object({
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
            // console.log(req)
            const { email } = results
            const isExist = await userModel.getUserByCondition({ email })
            // console.log(isExist)
            if (isExist.length > 0) {
                return responseStandard(res, 'Email already used', {}, 401, false)
            } else {
                let { name } = results
                const salt = await bcrypt.genSalt(10)   // untuk generate salt
                const hashedPassword = await bcrypt.hash(results.password, salt)    //untuk membuat hash password
                results = {
                    ...results,
                    role_id: 3,
                    password: hashedPassword,
                    profile_picture: "https://ui-avatars.com/api/?size=256&name=" + name
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
    signUpSellerController: async(req, res) => {
        const schema = joi.object({
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
            // console.log(req)
            const { email } = results
            const isExist = await userModel.getUserByCondition({ email })
            // console.log(isExist)
            if (isExist.length > 0) {
                return responseStandard(res, 'Email already used', {}, 401, false)
            } else {
                let { name } = results
                const salt = await bcrypt.genSalt(10)   // untuk generate salt
                const hashedPassword = await bcrypt.hash(results.password, salt)    //untuk membuat hash password
                results = {
                    ...results,
                    role_id: 2,
                    password: hashedPassword,
                    profile_picture: "https://ui-avatars.com/api/?size=256&name=" + name
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
    }
}