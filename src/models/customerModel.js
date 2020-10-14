const db = require('../helpers/db')
const table = 'users'

/*
    INSERT INTO post ? SET ? WHERE ?        // tanda tanya '?' adalah prepare statement yang nantinya akan mengisi kedalamanya value dari sebuah array yang sudah diserialize

    [{title: 'hello'}, {id: 1}]

    akan menghasilkan,
    INSERT INTO post SET title=hello WHERE id=1

    tanda tanya ?? dua akan menghasilkan value string
*/

module.exports = {
    getDetailProfile: (data) =>{
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
    updateProfile: (data={}, id) => {
        return new Promise((resolve, reject) =>{
            db.query(`UPDATE users SET ? WHERE id = ${id}`, data, (err, result, _fields)=>{
                if(err) {
                    reject(err)
                }else {
                    resolve(result)
                }
            })
        })
    }
}