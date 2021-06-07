const { Sequelize, DataTypes} = require('sequelize')

function makeModel(database) {
    const Schedule = database.define('schedule', {
        id_schedule:{
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fecha:{
            type: DataTypes.DATE,
            allowNull: false
        },
        hora_inicio:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        hora_final:{
            type: DataTypes.STRING(20),
            allowNull: false
        }
    });
    return Schedule
}

module.exports = {
    makeModel
}