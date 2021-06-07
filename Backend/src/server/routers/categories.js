const express = require('express')

const enviroment = {
    database: null
}

async function getCategories(request, response) {
    const {
        categories: categories
    } = enviroment.database.models
    const data = await categories.findAll()
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

async function putCategories(request, response) {
    const {
        categories: categories
    } = enviroment.database.models
    const data = await categories.update(
        {
            name: request.body.name,
            description: request.body.description
        },
        {
            where: {
                id_category: request.body.id_category
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

async function deleteCategories(request, response) {
    const {
        categories: categories
    } = enviroment.database.models
    const data = await categories.destroy(
        {
            where: {
                id_category: request.body.id_category
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

async function postCategories(request, response) {
    const {
        categories: categories
    } = enviroment.database.models
    const data = await categories.create(
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
    router.get('/', getCategories)
    router.post('/', postCategories)
    router.put('/', putCategories)
    router.delete('/', deleteCategories)
    return router
}

module.exports = {
    makeRouter
}