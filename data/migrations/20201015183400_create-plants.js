
exports.up = function (knex) {
    return knex.schema
        .createTable('User', user => {
            user.increments();
            user.string('username', 128).unique().notNullable();
            user.string('phoneNumber', 128).notNullable();
            user.string('password', 128).notNullable();
        })
        .createTable('Plant', plant => {
            plant.increments();
            plant.string('nickname', 128);
            plant.string('species', 128);
            plant.string('h2oFrequency', 128);
            plant.string('image').nullable();
            plant.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('User')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('Plant')
        .dropTableIfExists('User')
        .dropTableIfExists('user');
};
