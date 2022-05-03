const connection = require('../database/connection');

module.exports={
    //lista finger tap para grafico
    async index (req, res){
        const authorization = req.headers.authorization;

        const [count] = await connection('tbl_registros').where('idPaciente', authorization).count();
        
        res.header('X-Total-Count', count['count(*)']);

        const medCadastrados = await connection('tbl_registros')
            .where('idPaciente', authorization)
            .select('*');

        return res.status(200).json(medCadastrados)
    },

    /* async index_humor (req, res){
        const authorization = req.headers.authorization;

        const [count] = await connection('tbl_registros').where('idPaciente', authorization).count();

        res.header('X-Total-Count', count['count(*)']);

        const medCadastrados = await connection('tbl_registros')
            .where('idPaciente', authorization)
            .select('emoji','motivacao', 'depressao');

        return res.status(200).json(medCadastrados)
    }, */

    async create(req, res){
        const dados = req.body;
        const idPaciente = req.headers.authorization;

        //console.log(dados.sinaisVitais)
        //console.log(idPaciente)

        const [ id ] = await connection('tbl_registros').insert({
            pressao: dados.sinaisVitais.pressao1 ? `${dados.sinaisVitais.pressao1}X${dados.sinaisVitais.pressao2}` : null, 
            freqCardiaca: dados.sinaisVitais.freqCardiaca,
            saturacao: dados.sinaisVitais.saturacao,
            glicemia: dados.sinaisVitais.glicemia ? dados.sinaisVitais.glicemia : null,

            emoji: dados.humor.emoji,
            depressao: dados.humor.depressao,
            motivacao: dados.humor.motivacao,

            fala: dados.sintomas.fala,
            degluticao: dados.sintomas.degluticao,
            higiene: dados.sintomas.higiene,
            movimentoNaCama: dados.sintomas.movimentoNaCama,
            caminhar: dados.sintomas.caminhar,
            levantar: dados.sintomas.levantar,
            postura: dados.sintomas.postura,
            marcha: dados.sintomas.marcha,
            lentidao: dados.sintomas.lentidao,
            tremor: dados.sintomas.tremor,

            finger_tap: dados.fingerTap,

            idPaciente,
            date_create: new Date()
        })

        return res.status(200).json({ id })
    }
}