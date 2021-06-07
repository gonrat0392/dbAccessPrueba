const { Sequelize, DataTypes} = require('sequelize')

function makeModel(database) {
    const Area = database.define('areas', {
        id_area:{
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        description:{
            type: DataTypes.STRING(150),
            allowNull: false
        }
    });
    return Area
}

module.exports = {
    makeModel
}