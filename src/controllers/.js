const qs = require('querystring')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


process.env.SECRET_KEY = 'secret' // sebuah secret_key yang   diperlukan untuk menghasilkan sebuah token

module.exports = {
  createUser: (req, res) => {
    const today = new Date()
    let { name, email, password, phone_number, address } = req.body

    User.findOne({
      where: {
        email: email
      }
    }).then(user => {
      console.log(user)
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash)=>{
          password = hash
          User.create({name, email, password, phone_number, address, created})
          .then(user => {
            res.json({status: user.email + ' registered'})
          }).catch(err => {
            res.send('error: ' + err)
          })
        })
      }else {
        res.json({error: "User already exist"})
      }
    }).catch(err => {
      res.send('error: ' + err)
    })
  },
  userLogin: (req, res) => {
    let { email, password } = req.body
    User.findOne({    // untuk mencari email jika sudah ada di database
      where: {
        email: email
      }
    }).then(user => {     // mengembalikan promise yg mereturn user
        if (user) {
            if(bcrypt.compareSync(password, user.password)) {  // untuk membandingkan enkripsi password yang didatabase dengan enkripsi password yang user kirimkan
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                  expiresIn: 1440
                })
                res.send(token)
              }
        }else {
          res.status(400).json({error: 'User does not exist'}) // jika tidak ada maka akan mengembalikan  error
        }
    }).catch(err => {
      // res.status(400).json({error: err.message})
      console.log(err.message)
    })
  }
}