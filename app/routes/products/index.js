import { Router } from 'express'

import * as handlers from './handlers'

const router = Router()

router
    .route('/')
    .get(handlers.getProducts)
    .post(handlers.createProduct)

router
    .route('/:productId')
    .get(handlers.getProduct)
    .put(handlers.changeProduct)
    .delete(handlers.deleteProduct)

export default router
