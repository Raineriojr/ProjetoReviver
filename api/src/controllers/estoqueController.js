const connection = require('../database/connection');

module.exports = {
    async decrement(req, res) {
        const idPaciente = req.headers.authorization;
        const id = req.query.id;

        try {
            const response = await connection('tbl_medcadastrado')
            .where('id_medcadastrado', id)
            .where('idPaciente', idPaciente)
            .select('estoque')
            .first()

            const estoque = JSON.parse(JSON.stringify(response));
            
            let newValue = Number(estoque.estoque) - 1;

            await connection('tbl_medcadastrado')
            .where('id_medcadastrado', id)
            .where('idPaciente', idPaciente)
            .update({
                estoque: newValue
            })
            
            res.status(200).send({message: 'Atualizado com sucesso.'})
        } catch (error) {
            res.status(500).send(error.message);
        }        
    }
}