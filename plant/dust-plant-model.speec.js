const request = require('supertest');
const Plants = require('./plant-model')
const User = require('../user/User-model')
const db = require('../data/connection');

const testUser = {"username":"testy","password":"tesy","phoneNumber":"12345678910"}

const validPostPlant ={"nickname": "test","species": "test","h2oFrequency": "test","user_id":1}
const editPostPlant ={"nickname": "edit","species": "edit","h2oFrequency": "edit","user_id":1}


describe('tests plant-model', () => {
    beforeEach(async () => {
        await db('Plant').truncate()
        await db('User').truncate();
    })

    describe('get',  () => {
        it('gets valid plant in DB', async () => {
            const getBefore = await(Plants.get('Plant'))
            expect(getBefore).toHaveLength(0)
            await(User.add(testUser))
            await(Plants.add(validPostPlant,1))
            const getAfter = await(Plants.get('Plant'))
            expect(getAfter).toHaveLength(1)
        }) 
    })

    describe('getById',  () => {
        it('gets valid plant ID in DB', async () => {
            const getBefore = await(Plants.getUserPlants(1))
            expect(getBefore).toHaveLength(0)
            await(User.add(testUser))
            await(Plants.add(validPostPlant,1))
            const getAfter = await(Plants.getUserPlants(1))
            expect(getAfter).toHaveLength(1)
        }) 
    })
    describe('post',  () => {
        it('posts valid plant to DB', async () => {
            await(User.add(testUser))
            await(Plants.add(validPostPlant,1))
            const plants =await db('Plant')
            expect(plants).toHaveLength(1)
        }) 
    })
    describe('delete',  () => {
        it('deletes plant from DB', async () => {
            await(User.add(testUser))
            await(Plants.add(validPostPlant,1))
            const plants =await db('Plant')
            expect(plants).toHaveLength(1)
            const removed = await(Plants.remove(1))
            expect(removed).toBe(1)
        }) 
    })
    describe('edit',  () => {
        it('edits valid plant in DB', async () => {
            await(User.add(testUser))
            await(Plants.add(validPostPlant,1))
            const plants =await db('Plant')
            expect(plants[0].nickname).toBe("test")
            await(Plants.edit(1,editPostPlant))
            const edited = await(Plants.get('Plant'))
            expect(edited[0].nickname).toBe("edit")
        }) 
    })
})