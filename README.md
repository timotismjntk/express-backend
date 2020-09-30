<h1 align="center">ExpressJS - Database Blanja</h1>



This is a simple Database Administrator application specially for backend only. Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.18.3-green.svg?style=rounded-square)](https://nodejs.org/)
[![jsonwebtoken](https://jwt.io/img/pic_logo.svg)](https://jwt.io/)
[![node.bcrypt.js](https://udehiro.files.wordpress.com/2019/04/bcrypt-logo.jpg)[https://github.com/kelektiv/node.bcrypt.js#readme]

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:8080/)
8. You can see all the end point [here](#end-point)

## End Point

# express-backend

**1. GET**

* `/manage/product`(Get All product)
* `/manage/product/:id`(Get product by id)
* `/color/product`(Get All color product)
* `/color/product/:id`(Get color product by id)
* `/rating`(Get All rating)
* `/rating/:id`(Get rating by id)
* `/manage/category`(Get All category)
* `/manage/category/:id`(Get category by id)
* `/image/product`(Get All image product)
* `/image/product/:id`(Get image product by id)
* `/manage/user`(Get User By role_id)

**2. POST**

* `/manage/product`(Get All product)
* `/color/product`(Get All color product)
* `/rating`(Get All rating)
* `/manage/category`(Get All category)
* `/image/product`(Get All image product)
* `/manage/user`(Get User By role_id) 

**3. PUT**

* `/manage/product/:id`(Get product by id)
* `/color/product/:id`(Get color product by id)
* `/rating/:id`(Get rating by id)
* `/manage/category/:id`(Get category by id)
* `/image/product/:id`(Get image product by id)

**4. PATCH**

* `/manage/product/:id`(Get product by id)
* `/color/product/:id`(Get color product by id)
* `/rating/:id`(Get rating by id)
* `/manage/category/:id`(Get category by id)
* `/image/product/:id`(Get image product by id) 

**5. DELETE**

* `/manage/product/:id`(Get product by id)
* `/color/product/:id`(Get color product by id)
* `/rating/:id`(Get rating by id)
* `/manage/category/:id`(Get category by id)
* `/image/product/:id`(Get image product by id)
