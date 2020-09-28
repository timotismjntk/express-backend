const db = require('../helpers/db')
const table = 'roles'

/*
    INSERT INTO post ? SET ? WHERE ?        // tanda tanya '?' adalah prepare statement yang nantinya akan mengisi kedalamanya value dari sebuah array yang sudah diserialize

    [{title: 'hello'}, {id: 1}]

    akan menghasilkan,
    INSERT INTO post SET title=hello WHERE id=1

    tanda tanya ?? dua akan menghasilkan value string
*/

module.exports = {
    readRoles: (data = [5, 0]) => {
        return new Promise((resolve, reject) =>{
            db.query('SELECT * FROM roles LIMIT ? OFFSET ?', data, (err, result, _fields) => {
                console.log(data)
                if(err) {
                    reject(err);
                }else { 
                    resolve(result);
                }
            })
        })
    },
    countRoles: () => {
        return new Promise((resolve, reject) =>{
            db.query('SELECT COUNT(*) as count FROM roles', (err, result, _fields) =>{
                if(err) {
                    reject(err);
                }else {
                    resolve(result[0].count);
                }
            })
        }
        )
    },
    getRolesByCondition: (data) =>{
        return new Promise((resolve, reject) =>{
            db.query('SELECT * FROM roles WHERE ?', data, (err, result, _fields)=>{
                // console.log(data)
                if(err) {
                    reject(err);
                }else {
                    resolve(result)
                }
            })
        })
    },
    createRoles: (data={}) => {
        return new Promise((resolve, reject) =>{
            console.log(data)
            db.query('INSERT INTO roles SET ?', data, (err, result, _fields)=> {
                if(err) {
                    reject(err);
                }else {
                    resolve(result)
                }
            })
        })
    },
    updateRoles: (data={}, id) => {
        return new Promise((resolve, reject) =>{
            db.query(`UPDATE roles SET ? WHERE id = ${id}`, data, (err, result, _fields)=>{
                if(err) {
                    reject(err)
                }else {
                    resolve(result)
                }
            })
        })
    },
    updateRolesPartial: (data={}, id) => {
        return new Promise((resolve, reject) =>{
            db.query(`UPDATE roles SET ? WHERE id = ${id}`, data, (err, result, _fields)=>{
                if(err) {
                    reject(err)
                }else {
                    resolve(result)
                }
            })
        })
    },
    deleteRoles: (data) => {
        return new Promise((resolve, reject) =>{
            db.query('DELETE FROM roles WHERE ?', data, (err, result, _fields)=> {
                if(err) {
                    reject(err)
                }else {
                    resolve(result)
                }
            })
        })
    }
}