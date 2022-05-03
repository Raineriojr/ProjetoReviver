const connection = require('../database/connection');
const moment = require('moment');

module.exports = {
    async create(req, res){
        const { medicamento_id, paciente_id, resp } = req.body;

        let date = new Date().toLocaleDateString();
        
        function convertDate(e){
            //let time = new Date().toLocaleTimeString();

            let time = moment().format("HH:mm:ss")

            const dia = e.split('/')[0];
            const mes = e.split('/')[1];
            const ano = e.split('/')[2];
            
            e = ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2) + ' ' + time;
            return e;
        }

        if(resp == 0){
            try {
                const resposta = await connection('tbl_med_perdido').insert({
                    medicamento_id,
                    paciente_id,
                    date: convertDate(date),
                })
    
                if(resposta) return res.status(200).json(resposta)
            } catch (error) {
                console.log(error.message)
            }
            

        } else if (resp == 1){
            try {
                const resposta = await connection('tbl_med_tomado').insert({
                    medicamento_id,
                    paciente_id,
                    date: convertDate(date),
                })
    
                if(resposta)
                return res.status(200).json(resposta)
            } catch (error) {
                console.log(error.message);
            }
        }
        
    },

    async delete(req, res){
        const id = req.params;
        const idPaciente = req.headers.authorization;

        await connection('tbl_med_tomado')
            .where('id', id)
            .where('paciente_id', idPaciente)
            .delete();

        res.send('deletado')
    }
}