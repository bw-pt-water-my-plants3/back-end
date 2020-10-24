const request = require('supertest');
const server = require('./server')
const db = require('../data/connection');

const testUser = { username: "test", password: "test", phoneNumber: 1234567890 }

describe('User Server Working Correctly', () => {
    describe("send a GET request", () => {
        it("should return an error if not logged in", async () => {
            const res = await request(server).get("/plant")
            expect(res.status).toBe(400)
        });
        it("should return json", async () => {
            const res = await request(server).get("/plant");
            expect(res.type).toBe("application/json")
        });
    });

    describe('Get to base URL', () => {
        it('should return welcome message', async () => {
            const res = await request(server).get('/')
            expect(res.type).toBe('application/json')
            expect(res.text).toBe('{\"message\":"Welcome to the Plants Backend\"}')
        })
    })

    describe("Register a new user", () => {
        it("should return with a status code of 200", async () => {
            await db("User").truncate();
            const res = await request(server).post("/auth/register/").send(testUser);
            expect(res.status).toBe(200);
        });
        it("should return an error on on user with name aleady in database", async () => {
            const res = await request(server).post("/auth/register/").send(testUser);
            expect(res.status).toBe(500);
        });
    });

    describe("Login user", () => {
        it("should return a status code of 200", async () => {
            const res = await request(server).post("/auth/login").send(testUser);
            expect(res.status).toBe(200);
        });
        it("should return with a status code of 401 when given a user not in database", async () => {
            const res = await request(server).post("/auth/login").send({ username: "notvalid", password: "notvalid", phoneNumber: 1234567890 });
            expect(res.status).toBe(401);
        });
    });
})
