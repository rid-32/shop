import mongoose from 'mongoose'

import Product from 'models/product'

/* Получение всех продуктов из БД */
const getProductsPayload = products => {
    const total = products.length
    const data = products.map(product => ({
        _id: product._id,
        name: product.name,
        price: product.price,
        request: {
            type: 'GET',
            url: `http://localhost:9090/products/${product._id}`,
        },
    }))

    return {
        total,
        data,
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .select('name price _id')
            .exec()
        const payload = getProductsPayload(products)

        res.status(200).json(payload)
    } catch (error) {
        res.status(404).json('Not found')
    }
}

/* Создание нового продукта */
const createProductObject = config =>
    new Product({
        _id: mongoose.Types.ObjectId(),
        name: config.name,
        price: config.price,
    })

export const createProduct = async (req, res) => {
    const product = createProductObject(req.body)

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

/* Получение продукта по указанному id */
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

/* Изменение продукта по указанному id */
const setNewProductProps = props => {
    const keys = Object.keys(props) || []

    return keys.reduce(
        (acc, key) =>
            key === 'name' || key === 'price'
                ? { ...acc, [key]: props[key] }
                : acc,
        {}
    )
}

export const changeProduct = async (req, res) => {
    const productId = req.params.productId
    const newProductProps = setNewProductProps(req.body)

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

/* Удаление  продукта по id */
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
