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
        db.query(`SELECT product.name, cart.quantity, product.price, cart.summary FROM cart INNER JOIN product ON cart.product_id = product.id WHERE ?`, data, (err, result, _fields) => {
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
    getCartByCondition: (data={}) =>{
        return new Promise((resolve, reject) =>{
            db.query(`SELECT product.id, product_image.url AS url, product.name AS name,
            product.price AS price FROM product 
            LEFT JOIN product_image ON product_image.product_id = product.id WHERE ?`, data, (err, result, _fields)=>{
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
    updateCart: (data={}, id) => {
        return new Promise((resolve, reject) =>{
          console.log(data)
            db.query(`UPDATE ${table} SET ? WHERE user_id = ${id}`, data, (err, result, _fields)=>{
                if(err) {
                    reject(err)
                }else {
                    resolve(result)
                }
            })
        })
    },
    updateCartPartial: (data={}, id) => {
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
    deleteCart: (data) => {
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
        db.query(`SELECT product.name, cart.quantity, product.price, cart.summary FROM cart INNER JOIN product ON cart.product_id = product.id WHERE ?`, data, (err, result, _fields) => {
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