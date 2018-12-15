import express from 'express'

import { products as productsRoutes } from 'api/routes'

const app = express()

app.use('/products', productsRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found')

    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
    })
})

export default app
