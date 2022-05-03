
exports.up = function(knex) {
    return knex.schema.alterTable('tbl_registros', function(table){
        table.integer("finger_tap").notNullable()
    })
}

exports.down = function(knex) {
  
};
