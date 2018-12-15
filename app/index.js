import express from 'express'

import { products as productsRoutes, orders as ordersRoutes } from 'routes'

const app = express()

app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)

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
