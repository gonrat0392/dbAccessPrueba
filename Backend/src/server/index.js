const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { makeRouter: makeRouterInstructor } = require('./routers/instructors')
const { makeRouter: makeRouterCategories } = require('./routers/categories')
const { makeRouter: makeRouterAreas } = require('./routers/areas')
const { makeRouter: makeRouterCourses } = require('./routers/courses')

const port = 3000

function makeServer(port, database) {
    const app = express()
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json({ limit: '10mb', extended: false}))
    app.use(cors())
    app.use('/api/v1/instructors', makeRouterInstructor(database))
    app.use('/api/v1/categories', makeRouterCategories(database))
    app.use('/api/v1/areas', makeRouterAreas(database))
    app.use('/api/v1/courses', makeRouterCourses(database))
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`)
    })
}

module.exports = {
    makeServer
}