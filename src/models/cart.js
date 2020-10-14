const db = require('../helpers/db')
const table = 'cart'

/*
    INSERT INTO post ? SET ? WHERE ?        // tanda tanya '?' adalah prepare statement yang nantinya akan mengisi kedalamanya value dari sebuah array yang sudah diserialize

    [{title: 'hello'}, {id: 1}]

    akan menghasilkan,
    INSERT INTO post SET title=hello WHERE id=1

    tanda tanya ?? dua akan menghasilkan value string
*/

module.exports = {
    read: (data={}) => {
      return new Promise((resolve, reject) =>{
        db.query(`SELECT cart.id, cart.product_id, product.name, SUM(cart.quantity) AS quantity, SUM(price*cart.quantity) AS price, product_image.url, cart.summary FROM cart INNER JOIN product ON cart.product_id = product.id INNER JOIN product_image ON product.id = product_image.product_id WHERE cart. ? GROUP BY cart.product_id`, data, (err, result, _fields) => {
          if(err) {
            reject(err);
          }else {
              resolve(result);
          }
        })
      })
    },
    sumProduct: () => {
        return new Promise((resolve, reject) =>{
            db.query(`SELECT SUM(quantity) FROM ${table}`, (err, result, _fields) =>{
                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            })
        }
        )
    },
    getPrice: (data={}) =>{
      return new Promise((resolve, reject) =>{
        console.log(data)
        db.query(`SELECT product.price AS price FROM product
        WHERE id=${data}`, (err, result, _fields)=> {
          if(err) {
            reject(err);
          }else {
              resolve(result)
          }
        })
      })
    },
    getCartByCondition: (data) =>{
        console.log(data)
        return new Promise((resolve, reject) =>{
            db.query(`SELECT cart.id, cart.product_id, product.name, SUM(cart.quantity) AS quantity, SUM(price*cart.quantity) AS price, product_image.url, cart.summary FROM cart INNER JOIN product ON cart.product_id = product.id INNER JOIN product_image ON product.id = product_image.product_id WHERE cart.product_id=${data[0]} AND cart.user_id=${data[1]} GROUP BY cart.product_id`, (err, result, _fields)=>{
                console.log(data)
                if(err) {
                    reject(err);
                }else {
                    resolve(result)
                }
            })
        })
    },
    createCart: (data={}) => {
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
    updateCart: (data={}, id, product_id) => {
        return new Promise((resolve, reject) =>{
          console.log(data)
            db.query(`UPDATE ${table} SET ? WHERE user_id = ${id} AND product_id=${product_id}`, data, (err, result, _fields)=>{
                if(err) {
                    reject(err)
                }else {
                    resolve(result)
                }
            })
        })
    },
    updateCartPartial: (data={}, id, product_id) => {
        return new Promise((resolve, reject) =>{
            db.query(`UPDATE ${table} SET ? WHERE id = ${id} AND product_id=`, data, (err, result, _fields)=>{
                if(err) {
                    reject(err)
                }else {
                    resolve(result)
                }
            })
        })
    },
    deleteCart: (data1, data2) => {
        return new Promise((resolve, reject) =>{
            console.log(data2)
            console.log(data1)
            db.query(`DELETE FROM ${table} WHERE cart.user_id=${data1} and cart.id=${data2}`, (err, result, _fields)=> {
                if(err) {
                    reject(err)
                }else {
                    resolve(result)
                }
            })
        })
    },
      showCart: () => {
        return new Promise((resolve, reject) =>{
          db.query(`SELECT * FROM ${table}`, (err, result, _fields)=> {
              if(err) {
                  reject(err)
              }else {
                  resolve(result)
              }
          })
      })
    },
    checkOut: (data={}) => {
      console.log(data)
      return new Promise((resolve, reject) =>{
        db.query(`SELECT product.name, cart.quantity, product.price, product_image.url, cart.summary FROM cart INNER JOIN product ON cart.product_id = product.id INNER JOIN product_image ON product.id = product_image.product_id WHERE ?`, data, (err, result, _fields) => {
          // console.log(data)
          if(err) {
            reject(err);
          }else {
              resolve(result);
          }
        })
      })
    }
}