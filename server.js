import http from 'http'
import config from 'config'

import app from './app'

const port = config.get('APP_PORT')
const server = http.createServer(app)

server.listen(port, () => console.log(`Server started on port ${port}`))
