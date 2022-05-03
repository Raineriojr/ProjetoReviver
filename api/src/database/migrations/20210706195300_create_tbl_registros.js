
exports.up = function(knex) {
    return knex.schema.createTable('tbl_registros', function(table){
        table.increments('id_registro'),

        table.string('pressao'),
        table.string('freqCardiaca'),
        table.string('saturacao'),
        table.integer('glicemia'),

        table.integer('emoji').notNullable(),
        table.integer('motivacao').notNullable(),
        table.integer('depressao').notNullable(),

        table.integer('fala').notNullable(),
        table.integer('degluticao').notNullable(),
        table.integer('higiene').notNullable(),
        table.integer('movimentoNaCama').notNullable(),
        table.integer('caminhar').notNullable(),
        table.integer('levantar').notNullable(),
        table.integer('postura').notNullable(),
        table.integer('marcha').notNullable(),
        table.integer('lentidao').notNullable(),
        table.integer('tremor').notNullable(),

        table.timestamp('date_create').notNullable(),

        table.integer('idPaciente').unsigned(),

        table.foreign('idPaciente')
            .references('id_paciente')
            .inTable('tbl_paciente')
            .onDelete('cascade')
            .onUpdate('cascade')
})
}

exports.down = function(knex) {
    return knex.schema.dropTable('tbl_registros');
}
