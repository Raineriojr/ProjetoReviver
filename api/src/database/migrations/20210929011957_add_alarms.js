
exports.up = function(knex) {
    return knex.schema.alterTable('tbl_medcadastrado', function(table){
        table.integer('contador_alarmes').notNullable(),
        table.boolean('status').notNullable();
    })
};

exports.down = function(knex) {
    return;
};
