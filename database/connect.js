const Sequelize = require('sequelize');

const sequelize = new Sequelize('jindaltrading','uday','Uddeshya@123',{
    dialect: 'mysql',
    host: 'localhost'
});
 
module.exports = sequelize;  