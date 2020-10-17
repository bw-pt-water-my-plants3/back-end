
exports.seed = function(knex) {
  return knex('plant').del()
    .then(function () {
      return knex('plant').insert([
        {id: 1, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 1},
        {id: 2, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 1},
        {id: 3, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 1},
        {id: 4, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 2},
        {id: 5, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 2},
        {id: 6, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 3},
        {id: 7, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 3},
        {id: 8, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 3},
        {id: 9, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 3},
        {id: 10, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 3},
        {id: 11, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 3},
        {id: 12, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 3},
        {id: 13, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 3},
        {id: 14, nickname: 'test', species: 'test', h2oFrequency: 'test', user_id: 4}
      ]);
    });
};
