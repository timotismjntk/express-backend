const Sequelize = require('sequelize')
const user = {}
const sequelize = new Sequelize("ecommerce", "root", "", {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

user.sequelize = sequelize
user.Sequelize = Sequelize

module.exports = user