
exports.seed = function (knex, Promise) {
  return knex('users').insert([
    { username: 'PoisonIvy', phone_number: '5551234567', password: 'Itchy1' },
    { username: 'Jenny', phone_number: '5558675309', password: 'Music80' },
    { username: 'Audrey2', phone_number: '2125556789', password: 'FeedMe86' },
  ]);
};
