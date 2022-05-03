const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const authorization = req.headers.authorization;
        const { status } = req.params;

        try {
            const list = await connection('notifications')
                .where('paciente_id', authorization)
                .where('status', status)
                .select('*')
            
            return res.status(200).json(list)
        } catch (error) {
            return res.status(401).json({ message: 'Falha ao listar notificações'})
        }
    },

    async create(req, res) {
        const data = req.body;

        try {
            const resp = await connection('notifications').insert({
                paciente_id: data.paciente_id,
                medicamento_id: data.medicamento_id,
                nome: data.nome,
                dosagem: data.dosagem,
                date: new Date()
            })

            return res.status(200).json(resp);
        } catch (error) {
            return res.json({ message: 'Falha ao cadastrar'})
        }
    }, 

    async update(req, res){
        const authorization = req.headers.authorization;
        const { id } = req.body;
        
        try {
            await connection('notifications')
                .where('paciente_id', authorization)
                .where('id', id)
                .update({
                    status: 1
                })

            return res.status(200).json({ message: 'Atualizado com sucesso' })
        } catch (error) {
            return res.send({ message: 'Erro ao atualizar dados' })
        }
    }
}