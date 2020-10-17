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

function add(plant) {
  return db("Plant")
    .insert(plant, 'user_id')
    .then(([id]) => get(id));
}

function edit(id, changes) {
  return db("Plant").where("id", id).update(changes);
}

function remove(id) {
  return db("Plant").where("id", id).del();
}
