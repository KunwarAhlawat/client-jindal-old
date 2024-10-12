const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const masterTeamsModel = sequelize.define('master_teams',{
    teamId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    teamMember: {
        type: Sequelize.STRING
    },
    teamLeader: {
        type: Sequelize.STRING,
        
    }
}); 

module.exports = masterTeamsModel