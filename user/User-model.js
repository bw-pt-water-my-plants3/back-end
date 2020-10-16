const db = require('../data/connection')

module.exports= {
    add,
    find,
    findBy,
    findById,
    userUpdate,
    userRemove
}

function find(){
    return db('user as u')
    .select('u.id', 'u.username')
}

function findBy(filter){
    return db('user as u')
    .select('u.id', 'u.username', 'u.password')
    .where(filter).orderBy('u.id')
}

async function add(user){
    console.log('add start')
    console.log("user in plantsmodel add:",user)
    try{
 const [id] = await db('user').insert(user,'id');
 console.log('added')
    
        return findById(id)
    }catch (err) {
        console.log('error in the catch:', err)
        throw error
    }
}

function findById(id) {
    return db('user').where({id}).first()
}

function userUpdate(changes,id) {
    return db('user').where({id}).update(changes)
}

function userRemove(id) {
    return db('user').where({id}).del()
}