
exports.up = function(knex) {
  return knex.schema.createTable('tbl_medcadastrado', function(table){
      table.increments('id_medcadastrado'),
      table.string('medicamento', 50).notNullable(),
      table.boolean('receita').notNullable(),
      table.string('frequencia', 35).notNullable(),
      table.string('horarios'),
      table.integer('qntDias'),
      table.integer('duracao').notNullable(),
      table.string('dosagem', 35),
      table.date('dataInicio'),
      table.date('dataFim'),
      
      table.string('instrucao'),
      table.integer('estoque'),

      table.integer('idPaciente').unsigned(),

      table.foreign('idPaciente')
        .references('id_paciente')
        .inTable('tbl_paciente')
        .onDelete('no action')
        .onUpdate('cascade')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tbl_medcadastrado');
};
