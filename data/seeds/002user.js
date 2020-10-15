
exports.seed = function(knex) {

  return knex('user').del()
    .then(function () {
      return knex('user').insert([
        {username:'test', password:'test'},
      ]);
    });
};
