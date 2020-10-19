
exports.seed = function(knex) {
  return knex('Plant').del()
    .then(function () {
      return knex('Plant').insert([
        {id: 1, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 1},
        {id: 2, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 1},
        {id: 3, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 1},
        {id: 4, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 2},
        {id: 5, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 2},
        {id: 6, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 3},
        {id: 7, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 4},

      ]);
    });
};
