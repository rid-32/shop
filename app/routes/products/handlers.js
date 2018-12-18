import mongoose from 'mongoose'

import Product from 'models/product'

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()

        res.status(200).json(products)
    } catch (error) {
        res.status(404).json('Not found')
    }
}

export const createProduct = async (req, res) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    })

    try {
        const createdProduct = await product.save()

        res.status(201).json({
            message: 'New product was created',
            product: createdProduct,
        })
    } catch (error) {
        res.status(403).json({ message: 'Product was not created' })
    }
}

export const getProduct = async (req, res) => {
    const id = req.params.productId

    try {
        const product = await Product.findById(id)

        if (product) {
            res.status(200).json(product)
        } else {
            res.status(404).json({ message: 'Product was not found' })
        }
    } catch (error) {
        res.status(403).json({
            message: 'Invalid id',
        })
    }
}

export const changeProduct = async (req, res) => {
    const productId = req.params.productId
    const keys = Object.keys(req.body) || []
    const newProductProps = keys.reduce(
        (acc, key) =>
            key === 'name' || key === 'price'
                ? { ...acc, [key]: req.body[key] }
                : acc,
        {}
    )

    try {
        await Product.updateOne({ _id: productId }, newProductProps)

        res.status(200).json({
            message: 'Product was updated',
        })
    } catch (error) {
        res.status(403).json({
            message: 'Product was not updated',
            error,
        })
    }
}

export const deleteProduct = async (req, res) => {
    const productId = req.params.productId

    try {
        await Product.remove({ _id: productId })

        res.status(200).json({
            message: 'Product was deleted',
        })
    } catch (error) {
        res.status(403).json({
            message: 'Product was not deleted',
        })
    }
}
