const request = require('supertest');
const server = require('./server')
const db = require('../data/connection')

const validPlant ={"nickname": "teest","species": "test","h2oFrequency": "test",}
const editPlant ={"nickname": "edit","species": "test","h2oFrequency": "test",}

let current;
let token;

beforeAll(async(done) => {
    await db('User').truncate()
    request(server)
    .post('/auth/register')
    .send({
        "username":"testynpmtest", 
        "password":"990234jdksd",
        "phoneNumber":"12345678910"
    })
    .end((err,response) => {
        token = response.body.token;
        done();
    })
})

describe('tests the endpoint',() => {

    describe('GET to the endpoint',() => {
        it('returns from the GET',() => {
            return request(server)
                .get('/plant')
                .set('Authorization', `Bearer ${token}`)
                .then((res) => {
                    expect(res.type).toBe('application/json')
                    expect(res.status).toBe(200)
                })
        })
    })

    describe('Post to the endpoint',() => {
        it('posts successfully',() => {
            return request(server)
                .post('/plant/1')
                .set('Authorization', `Bearer ${token}`)
                .send(validPlant)
                .then((res) => {
                    expect(res.type).toBe('application/json')
                    expect(res.status).toBe(201)
                })
        })
    })

    describe('EDIT to the endpoint',() => {
        it('posts successfully',() => {
            return request(server)
                .put('/plant/2')
                .set('Authorization', `Bearer ${token}`)
                .send(editPlant)
                .then((res) => {
                    expect(res.status).toBe(200)
                    expect(res.type).toBe('application/json')
                })
        })
    })

    describe('GETBYID to the endpoint',() => {
        it('returns from the GET',() => {
            return request(server)
                .get('/plant/1')
                .set('Authorization', `Bearer ${token}`)
                .then((res) => {
                    expect(res.status).toBe(200)
                    expect(res.type).toBe('application/json')
                })
        })
    })

    describe('delete to the endpoint',() => {
        it('deletes successfully',async() => {
            return request(server)
            .delete('/plant/9')
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.status).toBe(200)
                expect(res.type).toBe('application/json')
            })
        })
    })
})