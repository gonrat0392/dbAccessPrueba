const Sequelize = require('sequelize')
const { makeModel: makeModelArea } = require('./models/areas')
const { makeModel: makeModelCategory } = require('./models/categories')
const { makeModel: makeModelCourse } = require('./models/course')
const { makeModel: makeModelInstructor } = require('./models/instructor')
const { makeModel: makeModelSchedule } = require('./models/schedule')

async function initDatabase(db_info) {
    const {
        DATABASE_PORT,
        DATABASE_HOST,
        DATABASE_USERNAME,
        DATABASE_DATABASE
    } = db_info
    const database = new Sequelize({
        username: DATABASE_USERNAME,
        database: DATABASE_DATABASE,
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        dialect: 'mariadb'
    })

    const Area = makeModelArea(database)
    const Category = makeModelCategory(database)
    const Course = makeModelCourse(database)
    const Instructor = makeModelInstructor(database)
    const Schedule = makeModelSchedule(database)

    Instructor.belongsToMany(Course, { through: 'Instructor_Course' })
    Course.belongsToMany(Instructor, { through: 'Instructor_Course' })
    Course.belongsToMany(Schedule, { through: 'Course_Schedule' })
    Schedule.belongsToMany(Course, { through: 'Course_Schedule' })
    Category.hasMany(Course)
    Course.belongsTo(Category)
    Area.hasMany(Instructor)
    Instructor.belongsTo(Area)

    try {
        //await database.authenticate()
        //await database.sync()
        console.log('Conexion establecida con la base de datos')
        return database
    } catch (error) {
        console.log('No se pudo conectar con la base de datos el inconveniente es: ',error)
    }
    return null
}

module.exports = {
    initDatabase
}