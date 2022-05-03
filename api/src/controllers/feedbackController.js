const connection = require('../database/connection');
const { index } = require('./registerController');

module.exports={
    async create (req, res){
        const { 
            feedback_cadastro, 
            feedback_sinaisVitais,
            feedback_registros,
            feedback_bugs,
            feedback_comentario 
        } = req.body;

        const idPaciente = req.headers.authorization;

        const [ id ] = await connection('tbl_feedbacks').insert({
            feedback_cadastro, 
            feedback_sinaisVitais,
            feedback_registros,
            feedback_bugs,
            feedback_comentario,
            idPaciente
        })

        return res.status(200).json({ id })
        
    },

    async index(req, res){

        const [count] = await connection('tbl_registros').count();
        
        res.header('X-Total-Count', count['count(*)']);

        const registros = await connection('tbl_registros').select('*');

        return res.status(200).json(registros)
    }
}