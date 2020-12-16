const db = require('../helpers/db')
const table = 'address'

/*
    INSERT INTO post ? SET ? WHERE ?        // tanda tanya '?' adalah prepare statement yang nantinya akan mengisi kedalamanya value dari sebuah array yang sudah diserialize

    [{title: 'hello'}, {id: 1}]

    akan menghasilkan,
    INSERT INTO post SET title=hello WHERE id=1

    tanda tanya ?? dua akan menghasilkan value string
*/

module.exports = {
    readAddress: (data) => {
        return new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM ${table} WHERE user_id ? LIMIT ? OFFSET ?`, data, (err, result, _fields) => {
                console.log(data)
                if(err) {
                    reject(err);
                }else { 
                    resolve(result);
                }
            })
        })
    },
    countAddress: () => {
        return new Promise((resolve, reject) =>{
            db.query(`SELECT COUNT(*) as count FROM ${table}`, (err, result, _fields) =>{
                if(err) {
                    reject(err);
                }else {
                    resolve(result[0].count);
                }
            })
        }
        )
    },
    getAddressByCondition: (data) =>{
        return new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM ${table} WHERE ?`, data, (err, result, _fields)=>{
                // console.log(data)
                if(err) {
                    reject(err);
                }else {
                    resolve(result)
                }
            })
        })
    },
    getAddressPrimaryByCondition: (data, data2) =>{
        console.log(data)
        // console.log(data2)
        return new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM ${table} WHERE ? AND isPrimary=${data2}`, data, (err, result, _fields)=>{
                // console.log(data)
                if(err) {
                    reject(err);
                }else {
                    resolve(result)
                }
            })
        })
    },
    createAddress: (data={}) => {
        return new Promise((resolve, reject) =>{
            console.log(data)
            db.query(`INSERT INTO ${table} SET ?`, data, (err, result, _fields)=> {
                if(err) {
                    reject(err);
                }else {
                    resolve(result)
                }
            })
        })
    },
    updateAddress: (data={}, id) => {
        return new Promise((resolve, reject) =>{
            db.query(`UPDATE ${table} SET ? WHERE user_id = ${id}`, data, (err, result, _fields)=>{
                if(err) {
                    reject(err)
                }else {
                    resolve(result)
                }
            })
        })
    },
    updateAddressPartial: (data={}, id) => {
        return new Promise((resolve, reject) =>{
            db.query(`UPDATE ${table} SET ? WHERE user_id = ${id}`, data, (err, result, _fields)=>{
                if(err) {
                    reject(err)
                }else {
                    resolve(result)
                }
            })
        })
    },
    deleteAddress: (data) => {
        return new Promise((resolve, reject) =>{
            db.query(`DELETE FROM ${table} WHERE ?`, data, (err, result, _fields)=> {
                if(err) {
                    reject(err)
                }else {
                    resolve(result)
                }
            })
        })
    }
}