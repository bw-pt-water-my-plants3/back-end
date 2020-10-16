
exports.seed = function(knex) {

  return knex('user').del()
    .then(function () {
      return knex('user').insert([
        {username:'test', password:'$2a$08$66.rWYhq5CkVPLdK03XhBuczqrOqEt623qSjAjGhikKMPxW4QGUAO',phoneNumber:12345678910},
      ]);
    });
};
