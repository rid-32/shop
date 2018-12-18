import mongoose from 'mongoose'
import request from 'supertest'
import dotenv from 'dotenv'

import app from 'index'
import mongodb from 'dbs/mongodb'
import Product from 'models/product'

dotenv.config()

const cleanDb = () => Product.remove()

const createApples = () =>
    new Product({
        _id: mongoose.Types.ObjectId(),
        name: 'Apples',
        price: 50,
    })

describe('Products', () => {
    beforeAll(async () => {
        // Подключемся к БД
        await mongodb
        // Очищаем БД
        await cleanDb()
        // Сохраняем документ
        createApples().save()
    })

    afterAll(() => cleanDb())

    test('Fetch all products', () =>
        request(app)
            .get('/products')
            .expect(200)
            .expect(res => console.log(res.body)))
})
