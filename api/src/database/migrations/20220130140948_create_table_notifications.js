
exports.up = function(knex) {
  return knex.schema.createTable('notifications', function(table){
    table.increments('id'),
    table.integer('medicamento_id').notNullable().unsigned(),
    table.integer('paciente_id').notNullable().unsigned(),
    table.string('nome').notNullable(),
    table.string('dosagem').notNullable(),
    table.boolean('status').notNullable().defaultTo(0),
    table.timestamp('date').notNullable(),

    table.foreign('medicamento_id')
        .references('id_medcadastrado')
        .inTable('tbl_medcadastrado')
        .onDelete('cascade')
        .onUpdate('cascade'),

    table.foreign('paciente_id')
        .references('id_paciente')
        .inTable('tbl_paciente')
        .onDelete('cascade')
        .onUpdate('cascade')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('notifications');
};
