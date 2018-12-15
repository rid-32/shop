export const getOrders = (req, res) => {
    res.status(200).json({
        message: 'Orders were fetched',
    })
}

export const createOrder = (req, res) => {
    res.status(201).json({
        message: 'Order was created',
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
