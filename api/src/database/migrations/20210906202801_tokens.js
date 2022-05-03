
exports.up = function(knex) {
    return knex.schema.createTable('tbl_tokens', function(table){
        table.increments('id_token'),
        table.string('token').notNullable(),
        table.integer('user_id').unsigned().notNullable(),

        table.foreign('user_id')
            .references('id_paciente')
            .inTable('tbl_paciente')
            .onDelete('no action')
            .onUpdate('cascade');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tbl_tokens');
};
