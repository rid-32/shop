import http from 'http'
import config from 'config'

import app from './app'
import dbs from 'dbs'

const port = config.get('APP_PORT')
const server = http.createServer(app)

dbs.init()
    .then(() => {
        console.log('Connection with databases was established successfully!')

        server.listen(port, () => console.log(`Server started on port ${port}`))
    })
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
