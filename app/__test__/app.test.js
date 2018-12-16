import request from 'supertest'

import app from '../index'

describe('Testing errors handler', () => {
    test('root endpoint should return 404 status code', () =>
        request(app)
            .get('/')
            .expect(404, {
                message: 'Not found',
            }))
})

describe('CORS handler', () => {
    test('should return Access-Control-Allow headers', () =>
        request(app)
            .get('/')
            .expect('Access-Control-Allow-Origin', '*')
            .expect(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            ))

    test('should return Access-Control-Allow-Methods and 200 status', () =>
        request(app)
            .options('/')
            .expect(200)
            .expect(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE, PATCH'
            ))
})
