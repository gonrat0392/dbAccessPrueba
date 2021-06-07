const express = require('express')

const enviroment = {
    database: null
}

async function getInstructors(request, response) {
    const {
        instructors: instructors,
        courses: courses
    } = enviroment.database.models
    const data = await instructors.findAll({
        include: courses
    })
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

async function putInstructors(request, response) {
    const {
        instructors: instructors
    } = enviroment.database.models
    const data = await instructors.update(
        {
            firtsName: request.body.firtsName,
            secondName: request.body.secondName,
            firtsLastname: request.body.firtsLastname,
            secondLastname: request.body.secondLastname,
            gender: request.body.gender,
            areaIdArea: request.body.areaIdArea
        },
        {
            where: {
                documents: request.body.documents
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

async function deleteInstructors(request, response) {
    const {
        instructors: instructors
    } = enviroment.database.models
    const data = await instructors.destroy(
        {
            where: {
                documents: request.body.documents
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

async function postInstructors(request, response) {
    const {
        instructors: instructors
    } = enviroment.database.models
    console.log('request.body.documents: ', instructors);
    const data = await instructors.create(
        {
            documents: request.body.documents,
            firtsName: request.body.firtsName,
            secondName: request.body.secondName,
            firtsLastname: request.body.firtsLastname,
            secondLastname: request.body.secondLastname,
            gender: request.body.gender,
            areaIdArea: request.body.areaIdArea
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
    router.get('/', getInstructors)
    router.post('/', postInstructors)
    router.put('/', putInstructors)
    router.delete('/', deleteInstructors)
    return router
}

module.exports = {
    makeRouter
}