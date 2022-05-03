
exports.up = function(knex) {
  return knex.schema.createTable('tbl_paciente', function(table){
      table.increments('id_paciente'),
      table.string('nomePaciente', 60).notNullable(),
      table.string('cpf', 11).notNullable().unique(),
      table.date('nascPaciente').notNullable(),
      table.string('contatoPaciente', 14).notNullable(),
      table.specificType('sexoPaciente', 'char(1)').notNullable(),
      table.string('diagnostico', 25).notNullable(),
      table.string('senha').notNullable(),
      table.boolean('status').defaultTo(true),
      table.string('nomeCuidador', 60).notNullable(),
      table.string('contatoCuidador', 14).notNullable(),
      table.date('nascCuidador').notNullable(),
      table.specificType('sexoCuidador', 'char(1)').notNullable()
      
      table.string('id_img').notNullable();
              
      table.foreign('id_img')
            .references('id_imagem')
            .inTable('tbl_imagem')
            .onDelete('no action')
            .onUpdate('cascade');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tbl_paciente');
};
