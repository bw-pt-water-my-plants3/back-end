
exports.seed = function(knex) {

  return knex('User').del()
    .then(function () {
      return knex('User').insert([
        {username:'test1', password:'$2a$08$66.rWYhq5CkVPLdK03XhBuczqrOqEt623qSjAjGhikKMPxW4QGUAO',phoneNumber:12345678910},
        {username:'test2', password:'$2a$08$66.rWYhq5CkVPLdK03XhBuczqrOqEt623qSjAjGhikKMPxW4QGUAO',phoneNumber:12345678910},
        {username:'test3', password:'$2a$08$66.rWYhq5CkVPLdK03XhBuczqrOqEt623qSjAjGhikKMPxW4QGUAO',phoneNumber:12345678910},
        {username:'test4', password:'$2a$08$66.rWYhq5CkVPLdK03XhBuczqrOqEt623qSjAjGhikKMPxW4QGUAO',phoneNumber:12345678910},
        {username:'test5', password:'$2a$08$66.rWYhq5CkVPLdK03XhBuczqrOqEt623qSjAjGhikKMPxW4QGUAO',phoneNumber:12345678910}
      ]);
    });
};
