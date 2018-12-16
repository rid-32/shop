export const getOrders = (req, res) => {
    res.status(200).json({
        message: 'Orders were fetched',
    })
}

export const createOrder = (req, res) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity,
    }

    res.status(201).json({
        message: 'Order was created',
        order,
    })
}

export const getOrder = (req, res) => {
    const orderId = req.params.orderId

    res.status(200).json({
        message: 'Order details',
        orderId,
    })
}

export const deleteOrder = (req, res) => {
    const orderId = req.params.orderId

    res.status(200).json({
        message: 'Order was deleted',
        orderId,
    })
}
