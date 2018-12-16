const dotenv = require('dotenv')

dotenv.config()

const APP_PORT = process.env.APP_PORT || 3000

const MONGODB_URL = `${process.env.DEV_MONGODB_URL}:${
    process.env.DEV_MONGODB_PORT
}/${process.env.DEV_MONGODB_NAME}`

module.exports = {
    NODE_ENV: 'production',
    APP_PORT,
    MONGODB_URL,
}
