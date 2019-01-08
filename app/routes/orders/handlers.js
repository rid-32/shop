import mongoose from 'mongoose'

import Order from 'models/order'
import Product from 'models/product'

/* Получение списока всех заказов */
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .select('product quantity')
            .populate('product', 'name price')
            .exec()

        res.status(200).json({
            data: orders,
            total: orders.length,
        })
    } catch (error) {
        res.status(404).json({
            message: 'Not found',
        })
    }
}

/* 
    Создание нового заказа 
    При создании заказа нужно убедиться, что переданный от пользователя
    productId существует. Для этого запрашиваем продукт из БД
*/
const getProductById = async id => {
    let response = null

    try {
        response = await Product.findById(id).exec()

        if (!response) {
            const error = new Error('Product not found')

            response = Promise.reject(error)
        }
    } catch (err) {
        const error = new Error('Error during finding the product')

        response = Promise.reject(error)
    }

    return response
}

export const createOrder = async (req, res) => {
    try {
        const product = await getProductById(req.body.productId)

        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            product: product._id,
            quantity: req.body.quantity,
        })

        await order.save()

        res.status(201).json({
            message: 'Order was created',
        })
    } catch (error) {
        res.status(403).json({
            message: 'Order was not created',
        })
    }
}

/* Получение заказа по указанному id */
export const getOrder = async (req, res) => {
    const orderId = req.params.orderId

    try {
        const order = await Order.findById(orderId)
            .select('_id product quantity')
            .populate('product', 'name price')
            .exec()

        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
            })
        }

        res.status(200).json(order)
    } catch (error) {
        res.status(403).json({
            message: 'Error during finding the order',
        })
    }
}

/* Удаление заказа по указанному id */
export const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId

    try {
        await Order.deleteOne({ _id: orderId })

        res.status(200).json({
            message: 'Order was removed',
            orderId,
        })
    } catch (error) {
        res.status(403).json({
            message: 'Error during removing the order',
        })
    }
}
