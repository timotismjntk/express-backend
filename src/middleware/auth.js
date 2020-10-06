const qs = require('querystring')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const responseStandard = require('../helpers/response')

module.exports = {
    authUser: (req, res, next) => {
        const {authorization} = req.headers
        if(authorization && authorization.startsWith('Bearer ')){
            const token = authorization.slice(7, authorization.length)
            try{
                const payload = jwt.verify(token, process.env.CUST_SECRET_KEY)
                if(payload){
                    // console.log('this' +res)
                    req.user = payload
                    next()
                }else {
                    return responseStandard(res, 'Unauthorized', {}, 401, false)
                }
            }
            catch(err){
                return responseStandard(res, err.message, {}, 500, false)
            }
        }else {
            return responseStandard(res, 'Forbidden Access', {}, 403, false )
        }
    },
    authRole: (role) => {       // authentication to access admin page
        return (req, res, next) => {
            // // console.log(req.user)
            // const listRole = [ 1, 2, 3 ]
            // let index = listRole.indexOf(role)
            // if (listRole[index] === 1) {
            //     let user = 'Super Admin'
            // } else if (listRole[index] === 2) {
            //     let user = 'Seller'
            // } else if (listRole[index] === 3) {
            //     let user = 'General User'
            // }
            
            if (req.user.role_id !== role) {
                return responseStandard(res, 'You dont Have Access', {}, 401, false)
            } 
            console.log(role)
            next();
        }
    }
}

