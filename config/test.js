const MONGODB_URL = `${process.env.DEV_MONGODB_URL}:${
    process.env.DEV_MONGODB_PORT
}/${process.env.TEST_MONGODB_NAME}`

module.exports = {
    NODE_ENV: 'test',
    MONGODB_URL,
}
