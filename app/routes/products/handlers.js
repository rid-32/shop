import mongoose from 'mongoose'

import Product from 'models/product'

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()

        res.status(200).json(products)
    } catch (error) {
        res.status(404)
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
        res.status(400).json({ message: 'Product was not created' })
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
        res.status(400).json({
            message: 'Invalid id',
        })
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
