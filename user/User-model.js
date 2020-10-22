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
    return db('User as u')
    .select('u.id', 'u.username')
}

function findBy(filter){
    return db('User as u')
    .select('u.id', 'u.username', 'u.password')
    .where(filter).orderBy('u.id')
}

async function add(user){
    // console.log('add start')
    // console.log("user in plantsmodel add:",user)
    try{
 const [id] = await db('User').insert(user,'id');
 console.log('added')
    
        return findById(id)
    }catch (err) {
        // console.log('error in the catch:', err)
        throw err
    }
}

function findById(id) {
    return db('User').where({id}).first()
}

function userUpdate(changes,id) {
    return db('User').where({id}).update(changes)
}

function userRemove(id) {
    return db('User').where({id}).del()
}