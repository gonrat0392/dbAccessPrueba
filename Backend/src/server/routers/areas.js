const express = require('express')

const enviroment = {
    database: null
}

async function getAreas(request, response) {
    const {
        areas: areas
    } = enviroment.database.models
    const data = await areas.findAll()
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

async function putAreas(request, response) {
    const {
        areas: areas
    } = enviroment.database.models
    const data = await areas.update(
        {
            name: request.body.name,
            description: request.body.description
        },
        {
            where: {
                id_area: request.body.id_area
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

async function deleteAreas(request, response) {
    const {
        areas: areas
    } = enviroment.database.models
    const data = await areas.destroy(
        {
            where: {
                id_area: request.body.id_area
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

async function postAreas(request, response) {
    const {
        areas: areas
    } = enviroment.database.models
    const data = await areas.create(
        {
            name: request.body.name,
            description: request.body.description
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
    router.get('/', getAreas)
    router.post('/', postAreas)
    router.put('/', putAreas)
    router.delete('/', deleteAreas)
    return router
}

module.exports = {
    makeRouter
}