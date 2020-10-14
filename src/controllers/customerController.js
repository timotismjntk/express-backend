const customerModel = require('../models/customerModel')
const paging = require('../helpers/pagination')
const responseStandard = require('../helpers/response')
const joi = require('joi')
const bcrypt = require('bcrypt')

const { APP_URL} = process.env

module.exports = {

    detailProfile: async (req, res) => {
        let { id } = req.user
        const userId = await customerModel.getDetailProfile({ id })
        if(userId.length > 0) {
            return responseStandard(res, `Profile with Id ${id}`, {userId})
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
            phone_number: joi.string()
        })
        let { value: results, error } = schema.validate(req.body)
        if (error) {
            return responseStandard(res, 'Error', {error: error.message}, 400, false)
        } else {
            
        let { name, email, password, phone_number } = results
            if (password) {
                const salt = await bcrypt.genSalt(10)   // untuk generate salt
                const hashedPassword = await bcrypt.hash(results.password, salt) //untuk membuat hash password
                results = {
                    password: hashedPassword
                }
                
                console.log(results)
                const update = await customerModel.updateUserPartial(results, id )
                if(update.affectedRows) {
                    return responseStandard(res, `Profile Has been Updated`, {results})
                } else {
                    return responseStandard(res, 'Profile Not found', {}, 401, false)
                }
            } else if (name || email || phone_number || req.files){
        
                if(req.files) {
                    console.log(req.files)
                    const update = await customerModel.updateUserPartial(results, id)
                    console.log('tanpa')
                    if(update.affectedRows) {
                        return responseStandard(res, `Profile Has been Updated`, {results})
                    } else {
                        return responseStandard(res, 'Profile Not found', {}, 401, false)
                    }
                    } if(!req.file) {
                        return responseStandard(res, 'Invalid file type. Only image files are allowed.', {}, 500,)
                    } else {
                        if(req.file.size >= 50000) {
                            return responseStandard(res, 'maximum allowed file size 500 KB', {}, 500,)
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
                        return responseStandard(res, `Profile Has been Updated`, {results})
                    } else {
                        return responseStandard(res, 'Profile Not found', {}, 401, false)
                    }
            } else {
                return responseStandard(res, 'At least fill one column!', '', 400, false)
            }
        }
    }
}