const { Sequelize, DataTypes} = require('sequelize')

function makeModel(database) {
    const Instructor = database.define('instructors', {
        documents:{
            type: DataTypes.INTEGER(50),
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        },
        firtsName:{
            type: DataTypes.STRING(50), 
            allowNull: false
        },
        secondName:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        firtsLastname:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        secondLastname:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        gender:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        areaIdArea:{
            type: DataTypes.INTEGER(20),
            allowNull: false
        }
    });
    return Instructor
}

module.exports = {
    makeModel
}