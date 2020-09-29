const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const responseStandard = require('../helpers/response')
const db = require('../helpers/db')

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
                    bcrypt.compare(password, result[0].password, function(err, result) {
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
    }
}