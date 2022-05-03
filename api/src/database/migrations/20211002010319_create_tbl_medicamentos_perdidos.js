
exports.up = function(knex) {
    return knex.schema.createTable('tbl_med_perdido', function(table){
        table.increments('id'),
        table.integer('medicamento_id').unsigned(),
        table.integer('paciente_id').unsigned(),
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
    return knex.schema.dropTable('tbl_med_perdido');
};
