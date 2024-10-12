const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const masterCategoriesModel = sequelize.define('master_categorie',{
    categoriesId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoriesType:{
        type: Sequelize.STRING
    }
},{
    timestamps: false
}); 

module.exports = masterCategoriesModel