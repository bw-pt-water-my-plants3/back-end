const db = require('../data/connection.js');

module.exports = {
  get
};

function get() {
    return db("Plant");
}

