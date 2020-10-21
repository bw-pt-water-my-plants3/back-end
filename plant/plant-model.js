const db = require('../data/connection.js');

module.exports = {
  get,
  getUserPlants,
  add,
  edit,
  remove,
};

function get() {
  return db("Plant");
}

function getUserPlants(id) {
  return db("Plant").where('user_id', id);
}

async function add(plant) {
  try {
    const [id] = await db("Plant")
      .insert(plant, 'user_id')
      return findPlantId(id)
  } catch (err) {
    console.log(err)
  }
}

function edit(id, changes) {
  return db("Plant").where("id", id).update(changes);
}

function remove(id) {
  return db("Plant").where("id", id).del();
}

function findPlantId(id) {
  return db("Plant").where({id}).first()
}
