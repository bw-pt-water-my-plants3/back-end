const request = require('supertest');
const server = require('./server')
const db = require('../data/connection');


describe('server.js', () => {
    it('should return welcome message', async () => {
        const res = await request(server).get('/')
        expect(res.type).toBe('application/json')
        expect(res.text).toBe('{\"message\":"Welcome to the Plants Backend\"}')
    })
}) 