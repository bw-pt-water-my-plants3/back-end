const request = require('supertest');
const server = require('./server')
const model = require('../plant/plant-model')
const db = require('../data/connection');

const testUser = {"username":"testy","password":"tesy","phoneNumber":"12345678910"}
const badUser = {"password":"tesy","phoneNumber":"12345678910"}
const unRegUser = {"username":"Not Registered","password":"tesy","phoneNumber":"12345678910"}
const validPlant ={"nickname": "test","species": "test","h2oFrequency": "test",}

describe('Login and Register ', () => {
    describe('should be in testing',() => {
        it('should be in testing ENV', () => {
            expect(process.env.NODE_ENV).toBe('testing')
        })
    })
    describe('Get to base URL', () => {
        it('should return welcome message', async () => {
            const res = await request(server).get('/')
            expect(res.type).toBe('application/json')
            expect(res.text).toBe('{\"message\":"Welcome to the Plants Backend\"}')
        })
    })
    
    describe('Register- POST to /auth/register', () => {

        it('sends correct data', async ()=>{
            await db('User').truncate() 
            const res = await request(server)
            .post('/auth/register')
            .send(testUser)
            expect(res.status).toBe(200) 
        })
        it('sends data missing username', async () => {
            await db('User').truncate()
            const res = await request(server)
            .post('/auth/register')
            .send(badUser)
            expect(res.status).toBe(400) 
        })
    })
    describe('Login- POST to /auth/login', () => {
        
        it('sends correct data', async ()=>{
            await db('User').truncate() 
            await request(server)
            .post('/auth/register')
            .send(testUser)
            const res = await request(server)
            .post('/auth/login')
            .send(testUser)
            expect(res.status).toBe(200) 
        })
        it('login data missing username', async () => {
            await db('User').truncate()
            const res = await request(server)
            .post('/auth/login')
            .send(badUser)
            expect(res.status).toBe(500) 
        })
        it('login unregistered username', async () => {
            await db('User').truncate()
            const res = await request(server)
            .post('/auth/login')
            .send(unRegUser)
            expect(res.status).toBe(401) 
        })
    })
})
