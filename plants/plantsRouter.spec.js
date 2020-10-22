const { response } = require('express');
const { expectCt } = require('helmet');
const request = require('supertest');
const server = require('../api/server.js');
const { intersect } = require('../data/dbConfig.js');
const db = require('../data/dbConfig.js');

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

describe('Get /', () => {
    it('should return a 200 with an authorized user', () => {
        return request(server)
            .get('/')
            .then((response) => {
                expect(response.status).toBe(200);
            });
    });
    it('should return JSON with authorized user', () => {
        return request(server)
        .get('/')
        .then((response) => {
            expect(response.type).toBe('application/json');
        });
    });

});



