const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbConfig.js');
const testUser = { username: 'new user1', phone_number: '5551234567', password: 'testing' };

describe('authRouter.js', () => {
    describe('registering new user', () => {
        it('should return a 201 when adding new user', async () => {
            await db('users').truncate();
            const res = await request(server)
                .post('/api/auth/register')
                .send(testUser);
            expect(res.status).toBe(201);
        });
        it('should return a 500 with an invaalid user', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({ user: 'test', pass: 'test' });
            expect(res.status).toBe(500);
        });
    });

    describe('login with user', () => {
        it('should return a 200 with testUser', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send(testUser);
            expect(res.status).toBe(200);
        });
        it('should return a 401 when given a non-valid user', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({ username: 'does not exist', password: 'does not exist' });
            expect(res.status).toBe(401);
        });
    });

    describe('user information updates', () => {
        it('should return a 200 with the correct user id and validation', async () => {
            const res = await request(server)
                .patch('/api/auth/1')
                .send({ username: 'new user1', phone_number: '9138312137', password: 'testPatch' });
            expect(res.status).toBe(200);
        });
        it('should return a 404 with an incorrect user id', async () => {
            const res = await request(server)
                .patch('/api/auth/4')
                .send({ username: 'new user1', phone_number: '9138312137', password: 'testPatch' });
            expect(res.status).toBe(404);
        });
    });
});