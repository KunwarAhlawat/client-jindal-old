const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const masterGradeModel = sequelize.define('master_grade',{
    gradeId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    gradeType:{
        type: Sequelize.STRING
    }
},{
    timestamps: false
}); 

module.exports = masterGradeModel