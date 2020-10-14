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
            db.query(`SELECT product.id, product.name, product.quantity, product.price, product.store_name, product.description, conditions.condition_name, category.category_name, product_image.url, product.rating_id AS total_rating, product_color.hexcode AS hexcode, product.created_at FROM product INNER JOIN conditions ON product.condition_id = conditions.id INNER JOIN category ON product.category_id = category.id INNER JOIN product_image ON product.id = product_image.product_id INNER JOIN rating ON product.rating_id = rating.rating INNER JOIN product_color ON product.id = product_color.product_id WHERE product.?`, data, (err, result, _fields)=>{
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
            db.query(`SELECT product.id, product.name, product.quantity, product.price, product.store_name, product.description, conditions.condition_name, category.category_name, product_image.url, product.rating_id AS total_rating, product.created_at FROM product INNER JOIN conditions ON product.condition_id = conditions.id INNER JOIN category ON product.category_id = category.id INNER JOIN product_image ON product.id = product_image.product_id INNER JOIN rating ON product.rating_id = rating.rating AND product.${data[0]} LIKE '%${data[1]}%'`)
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
    },
    readPopularProduct: (data=[id, '']) => {
        return new Promise((resolve, reject) =>{
            db.query(`SELECT product.id, product.name, product.quantity, product.price, product.store_name, product.description, conditions.condition_name, category.category_name, product_image.url, product.rating_id AS total_rating, product.created_at FROM product INNER JOIN conditions ON product.condition_id = conditions.id INNER JOIN category ON product.category_id = category.id INNER JOIN product_image ON product.id = product_image.product_id INNER JOIN rating ON product.rating_id = rating.rating AND product.${data[0]} LIKE '%${data[1]}%' ORDER BY ${data[2]} ${data[3]} LIMIT ${data[4]} OFFSET ${data[5]}`, (err, result, _fields) => {
                console.log(data)
                if(err) {
                    reject(err);
                }else { 
                    resolve(result);
                }
            })
        })
    }
}