const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');
let token;
beforeAll((done) => {
    request(server)
      .post('/api/auth/login')
      .send({
        username: 'test', phone_number: 1234,
        password: 'test'
      })
      .end((err, response) => {
        token = response.body.token; // save the token!
        done();
      });
  });
describe('server.js', () => {
    describe('GET users', () => {
        it('should return a 200 status when successful', async () => {
            const res = await request(server).get('/')
            expect(res.status).toBe(200);
        });
    });
    it('should return JSON', async () => {
        const res = await request(server).get('/');
        expect(res.type).toBe('application/json');
    });
});
describe('Get /api/plants', () => {
    test('It returns status code of 400 without auth', () => {
        return request(server)
          .get('/api/plants')
          .then((res) => {
            expect(res.status).toBe(400);
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
    it('should return a 404 with incorrect endpoint', () => {
        return request(server)
            .post('/')
            .set('Authorization', `Bearer ${token}`)
            .send({ nickname: 'test', species: 'test purpurea' })
            .then((response) => {
                expect(response.status).toBe(404);
            });
    });
    it('should return JSON with created plant info', () => {
        return request(server)
            .post('/api/plants')
            .send({ nickname: 'test', species: 'Digitalis purpurea' })
            .then((response) => {
                expect(response.type).toBe('application/json');
            });
    });
})