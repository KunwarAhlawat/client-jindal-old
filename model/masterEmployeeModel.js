const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const masterEmployeeModel = sequelize.define('master_employee',{
    empId:{
        type: Sequelize.STRING, 
        autoIncrement: true,
        primaryKey: true
    },
    employeeName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    designation: {
        type: Sequelize.STRING
    },
    dateOfJoining: {
        type: Sequelize.STRING
    },
    dateOfLeaving: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    dateOfBirth: {
        type: Sequelize.STRING
    },
    bloodGroup: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    primaryMobileNumber: {
        type: Sequelize.BIGINT
    },
    emailId: {
        type: Sequelize.STRING
    },
    fatherName: {
        type: Sequelize.STRING
    },
    motherName: {
        type: Sequelize.STRING
    },
    fatherMobileNumber: {
        type: Sequelize.STRING
    },
    motherMobileNumber: {
        type: Sequelize.STRING
    },
    spouseName: {
        type: Sequelize.STRING
    },
    spouseMobileNumber: {
        type: Sequelize.STRING
    },
    bankName: {
        type: Sequelize.STRING
    },
    bankAccountNumber: {
        type: Sequelize.STRING
    },
    ifscCode: {
        type: Sequelize.STRING
    },
    aadharNumber: {
        type: Sequelize.STRING
    },
    panNumber: {
        type: Sequelize.STRING
    },
    reference: {
        type: Sequelize.STRING
    },
    referenceContactNumber: {
        type: Sequelize.STRING
    },
    photo: {
        type: Sequelize.STRING
    }
},{
    timestamps: false
}); 

module.exports = masterEmployeeModel