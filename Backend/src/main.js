const dotenv = require("dotenv")
const { initDatabase } = require("./database")
const { makeServer } = require("./server")

async function main() {
    dotenv.config()
    //process.env
    const database = await initDatabase(process.env)
    if (database) {
        //console.log('Si entro aqui: ', database);
        makeServer(process.env.SERVER_PORT, database)
    }
}

main()