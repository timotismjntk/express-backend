const db = require('../helpers/db')
const table = 'users'


module.exports = {
    countUsers: () => {
        return new Promise((resolve, reject) =>{
            db.query('SELECT COUNT(*) as count FROM users', (err, result, _fields) =>{
                if(err) {
                    reject(err);
                }else {
                    resolve(result[0].count);
                }
            })
        }
        )
    },
    getUserByCondition: (data) =>{
        return new Promise((resolve, reject) =>{
            db.query('SELECT * FROM users WHERE ?', data, (err, result, _fields)=>{
                // console.log(data)
                if(err) {
                    reject(err);
                }else {
                    resolve(result)
                }
            })
        })
    },
    createUser: (data={}) => {
        return new Promise((resolve, reject) =>{
            console.log(data)
            db.query('INSERT INTO users SET ?', data, (err, result, _fields)=> {
                if(err) {
                    reject(err);
                }else {
                    resolve(result)
                }
            })
        })
    }
}
