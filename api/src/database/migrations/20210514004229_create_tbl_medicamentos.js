
exports.up = function(knex) {
  return knex.schema.createTable('tbl_medicamentos', function(table){
      table.increments('id_med'),
      table.string('nome')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tbl_medicamentos');
};
