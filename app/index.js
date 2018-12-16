import express from 'express'
import morgan from 'morgan'
import config from 'config'

import { products as productsRoutes, orders as ordersRoutes } from 'routes'

const app = express()

if (config.get('NODE_ENV') !== 'test') {
    if (config.get('NODE_ENV') === 'development') {
        app.use(morgan('dev'))
    } else {
        app.use(morgan('combined'))
    }
}

app.use(
    express.urlencoded({
        extended: false,
    })
)

app.use(express.json())

// обработка CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, PATCH'
        )

        return res.status(200).json({})
    }

    next()
})

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
