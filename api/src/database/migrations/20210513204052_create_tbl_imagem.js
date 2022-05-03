
exports.up = function(knex) {
  return knex.schema.createTable('tbl_imagem', function(table){
      table.string('id_imagem').primary().notNullable(),
      table.string('nome').notNullable(),
      table.string('tamanho').notNullable(),
      table.string('chave').notNullable(),
      table.string('url').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tbl_imagem');
};
