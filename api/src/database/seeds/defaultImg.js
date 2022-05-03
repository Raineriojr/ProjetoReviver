
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tbl_imagem').del()
    .then(function () {
      // Inserts seed entries
      return knex('tbl_imagem').insert([
        {id_imagem: '1', nome: 'defaultImage', tamanho: '1', chave: '1', url: 'url'},
      ]);
    });
};
