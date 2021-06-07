const express = require('express')

const enviroment = {
    database: null
}

async function getCourses(request, response) {
    const {
        courses: courses
    } = enviroment.database.models
    const data = await courses.findAll()
    try {
        response.json(
            {
                codStatus: 200,
                status: 'Proceso exitoso',
                data: data
            }
        )
    } catch (error) {
        response.json(
            {
                codStatus: 300,
                status: 'Ocurrio un error',
                data: error
            }
        )
    }
}

async function putCourses(request, response) {
    const {
        courses: courses
    } = enviroment.database.models
    const data = await courses.update(
        {
            numberStudents: request.body.numberStudents,
            name: request.body.name,
            categoryIdCategory: request.body.categoryIdCategory
        },
        {
            where: {
                id_course: request.body.id_course
            }
        }
    )
    try {
        response.json(
            {
                codStatus: 200,
                status: 'Proceso exitoso',
                description: 'Se realizo la actualización de los datos'
            }
        )
    } catch (error) {
        response.json(
            {
                codStatus: 300,
                status: 'Ocurrio un error',
                data: error
            }
        )
    }
}

async function deleteCourses(request, response) {
    const {
        courses: courses
    } = enviroment.database.models
    const data = await courses.destroy(
        {
            where: {
                id_course: request.body.id_course
            }
        }
    )
    try {
        response.json(
            {
                codStatus: 200,
                status: 'Proceso exitoso',
                description: 'Se elomino el registro correctamente'
            }
        )
    } catch (error) {
        response.json(
            {
                codStatus: 300,
                status: 'Ocurrio un error',
                data: error
            }
        )
    }
}

async function postCourses(request, response) {
    const {
        courses: courses
    } = enviroment.database.models
    const data = await courses.create(
        {
            numberStudents: request.body.numberStudents,
            name: request.body.name,
            categoryIdCategory: request.body.categoryIdCategory
        }
    )
    try {
        response.json(
            {
                codStatus: 200,
                status: 'Proceso exitoso',
                description: 'Se realizo la inserccin de los datos'
            }
        )
    } catch (error) {
        response.json(
            {
                codStatus: 300,
                status: 'Ocurrio un error',
                data: error
            }
        )
    }
}

function makeRouter(database) {
    enviroment.database = database
    const router = express.Router()
    router.get('/', getCourses)
    router.post('/', postCourses)
    router.put('/', putCourses)
    router.delete('/', deleteCourses)
    return router
}

module.exports = {
    makeRouter
}