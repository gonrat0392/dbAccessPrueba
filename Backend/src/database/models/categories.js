const { Sequelize, DataTypes} = require('sequelize')

function makeModel(database) {
    const Category = database.define('categories', {
        id_category:{
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
    return Category
}

module.exports = {
    makeModel
}