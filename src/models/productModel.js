const db = require('../helpers/db')
const table = 'product'

/*
    INSERT INTO post ? SET ? WHERE ?        // tanda tanya '?' adalah prepare statement yang nantinya akan mengisi kedalamanya value dari sebuah array yang sudah diserialize

    [{title: 'hello'}, {id: 1}]

    akan menghasilkan,
    INSERT INTO post SET title=hello WHERE id=1

    tanda tanya ?? dua akan menghasilkan value string
*/

module.exports = {
    readProduct: (data=[id, '']) => {
        return new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM ${table} WHERE ${data[0]} LIKE '%${data[1]}%' ORDER BY product.${data[2]} ${data[3]} LIMIT ${data[4]} OFFSET ${data[5]}`, (err, result, _fields) => {
                console.log(data[1])
                if(err) {
                    reject(err);
                }else { 
                    resolve(result);
                }
            })
        })
    },
    countProduct: () => {
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
    getProductDetail: (data) =>{
        return new Promise((resolve, reject) =>{
            db.query(`SELECT product.id, product_image.url AS url, product.name AS name, category.category_name AS category, conditions.condition_name AS conditions, product.description AS description, product.price AS price
            FROM product
                LEFT JOIN conditions ON product.condition_id = conditions.id
                LEFT JOIN category ON product.category_id = category.id
                LEFT JOIN product_image ON product_image.product_id = product.id
            WHERE product.?`, data, (err, result, _fields)=>{
                // console.log(data)
                if(err) {
                    reject(err);
                }else {
                    resolve(result)
                }
            })
        })
    },
    getProductByCondition: (data) =>{
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
    getNewProduct: (data=[id, '']) => {
        return new Promise((resolve, reject) =>{
            db.query(`SELECT product.id, product.name, product.quantity, product.price, product.description, conditions.name, category.name FROM product INNER JOIN conditions ON product.condition_id = conditions.id INNER JOIN category ON product.category_id = category.id WHERE conditions.id = ${1} AND product.${data[0]} LIKE '%${data[1]}%' ORDER BY product.${data[2]} ${data[3]} LIMIT ${data[4]} OFFSET ${data[5]}`)
            console.log(data[2])
        })
    },
    createProduct: (data={}) => {
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
    updateProduct: (data={}, id) => {
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
    updateProductPartial: (data={}, id) => {
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
    deleteProduct: (data) => {
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