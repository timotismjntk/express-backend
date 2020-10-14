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
    read: (data=[id, '']) => {
        return new Promise((resolve, reject) =>{
            db.query(`SELECT product.id, product.name, product.quantity, product.price, product.description, rating.rating_name, category.category_name FROM product INNER JOIN rating ON product.rating_id = rating.id INNER JOIN category ON product.category_id = category.id WHERE rating.id = ${1} AND product.${data[0]} LIKE '%${data[1]}%' ORDER BY product.${data[2]} ${data[3]} LIMIT ${data[4]} OFFSET ${data[5]}`, (err, result, _fields) => {
                console.log(data[1])
                if(err) {
                    reject(err);
                }else { 
                    resolve(result);
                }
            })
        })
    },
    count: () => {
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
    }
}