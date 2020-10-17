const db = require('../helpers/db')
const table = 'product_image'

/*
    INSERT INTO post ? SET ? WHERE ?        // tanda tanya '?' adalah prepare statement yang nantinya akan mengisi kedalamanya value dari sebuah array yang sudah diserialize

    [{title: 'hello'}, {id: 1}]

    akan menghasilkan,
    INSERT INTO post SET title=hello WHERE id=1

    tanda tanya ?? dua akan menghasilkan value string
*/

module.exports = {
    readProductImage: (data=[id, '']) => {
        return new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM ${table} WHERE ${data[0]} LIKE '%${data[1]}%' ORDER BY product_image.${data[2]} ${data[3]} LIMIT ${data[4]} OFFSET ${data[5]}`, (err, result, _fields) => {
                console.log(data[1])
                if(err) {
                    reject(err);
                }else { 
                    resolve(result);
                }
            })
        })
    },
    countProductImage: () => {
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
    getProductImageByCondition: (data) =>{
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
    createProductImage: (data={}) => {
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
    updateProductImage: (data={}, id) => {
        return new Promise((resolve, reject) =>{
            db.query(`UPDATE ${table} SET ? WHERE id = ${id}`, data, (err, result, _fields)=>{
                if(err) {
                    reject(err)
                }else {
                    resolve(result)
                }
            })
        })
    },
    updateProductImagePartial: (data={}, id) => {
        return new Promise((resolve, reject) =>{
            db.query(`UPDATE ${table} SET ? WHERE id = ${id}`, data, (err, result, _fields)=>{
                if(err) {
                    reject(err)
                }else {
                    resolve(result)
                }
            })
        })
    },
    deleteProductImage: (data) => {
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