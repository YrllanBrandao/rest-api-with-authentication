const Sequelize =  require("sequelize");
const Connection = require("../database/database");



const Game = Connection.define("game",{
    title: {type: Sequelize.STRING, allowNull:false},
    price: {type: Sequelize.DECIMAL, allowNull: false},
    year:{ type:Sequelize.INTEGER, allowNull:false}
})


Game.sync({force:false})

module.exports = Game;