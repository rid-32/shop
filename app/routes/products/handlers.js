export const getProducts = (req, res) => {
    const products = {
        bananas: 47,
        tomatos: 118,
    }

    res.status(200).json(products)
}

export const createProduct = (req, res) => {
    res.status(201).json({ message: 'New product was created' })
}

export const getProduct = (req, res) => {
    const id = req.params.productId

    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id,
        })
    } else {
        res.status(200).json({ message: 'You passed an ID' })
    }
}

export const changeProduct = (req, res) => {
    res.status(200).json({
        message: 'Product was changed',
    })
}

export const deleteProduct = (req, res) => {
    res.status(200).json({
        message: 'Product was deleted',
    })
}
