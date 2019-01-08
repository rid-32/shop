import mongoose from 'mongoose'

import Product from 'models/product'

/* Получение всех продуктов из БД */
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .select('name price _id')
            .exec()
        const payload = {
            data: products,
            total: products.length,
        }

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
        const product = await Product.findById(id).exec()

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

/* Удаление  продукта по id
 При удалении никак не учитывается, что данный продукт может быть к каком-то
 заказе. Если продукт указан в незавершённом заказе, то либо не должно быть
 произведено удаление продукта, либо продукт должен быть удалён из заказа,
 либо заказ должен быть завершен (самый плохой вариант)
*/
export const deleteProduct = async (req, res) => {
    const productId = req.params.productId

    try {
        await Product.deleteOne({ _id: productId })

        res.status(200).json({
            message: 'Product was deleted',
        })
    } catch (error) {
        res.status(403).json({
            message: 'Product was not deleted',
        })
    }
}
