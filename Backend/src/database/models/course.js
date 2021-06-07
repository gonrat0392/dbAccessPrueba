const { Sequelize, DataTypes} = require('sequelize')

function makeModel(database) {
    const Course = database.define('courses', {
        id_course:{
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        numberStudents:{
            type: DataTypes.INTEGER(50),
            allowNull: false
        },
        name:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        categoryIdCategory:{
            type: DataTypes.INTEGER(20),
            allowNull: false
        }
    });
    return Course
}

module.exports = {
    makeModel
}