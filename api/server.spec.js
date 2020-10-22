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

let token;

beforeAll((done) => {
    request(server)
        .post('/register')
        .send({
            username: 'new user1', phone_number: '9138312137',
            password: 'testPatch'
        })
        .end((err, response) => {
            token = response.body.token;
            done();
        });
});

describe('Get /api/plants', () => {
    it('should return a 200 with an authorized user', () => {
        return request(server)
            .get('/api/plants')
            .then((response) => {
                expect(response.status).toBe(200);
            });
    });
    it('should return JSON with authorized user', () => {
        return request(server)
            .get('/api/plants')
            .then((response) => {
                expect(response.type).toBe('application/json');
            });
    });
});

describe('Post /api/plants', () => {
    it('should return a 201 with created plant info', () => {
        return request(server)
            .post('/api/plants')
            .send({ nickname: 'Foxglove', species: 'Digitalis purpurea' })
            .then((response) => {
                expect(response.status).toBe(201);
            });
    });
    it('should return JSON with created plant info', () => {
        return request(server)
            .post('/api/plants')
            .send({ nickname: 'Foxglove', species: 'Digitalis purpurea' })
            .then((response) => {
                expect(response.type).toBe('application/json');
            });
    });
})
