const Sequelize =  require("sequelize");
const Connection = require("../database/database");



const Admin = Connection.define("users",{
    email: {type: Sequelize.STRING, allowNull:false},
    password: {type: Sequelize.STRING, allowNull: false},
})


Admin.sync({force:false})

module.exports = Admin;