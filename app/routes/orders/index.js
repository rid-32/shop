import { Router } from 'express'

import * as handlers from './handlers'

const router = Router()

router
    .route('/')
    .get(handlers.getOrders)
    .post(handlers.createOrder)

router
    .route('/:orderId')
    .get(handlers.getOrder)
    .delete(handlers.deleteOrder)

export default router
