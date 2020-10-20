const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');

describe('server.js', () => {
    describe('GET request for plant list', () => {
        it('should return a 200 status when successful', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });
    });
    it('should return JSON', async () => {
        const res = await request(server).get('/');
        expect(res.type).toBe('application/json');
    });
});