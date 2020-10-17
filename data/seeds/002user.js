
exports.seed = function(knex) {

  return knex('user').del()
    .then(function () {
      return knex('user').insert([
        {id: 1, username:'test', phoneNumber:'test', password:'test'},
        {id: 2, username:'test2', phoneNumber:'test', password:'test'},
        {id: 3, username:'test3', phoneNumber:'test', password:'test'},
        {id: 4, username:'test4', phoneNumber:'test', password:'test'},
      ]);
    });
};
