const connection = require('../database/connection');

module.exports={

    async index (req, res){
        const { id } = req.params;

        const [count] = await connection('tbl_medcadastrado').where('idPaciente', id).count();
        
        res.header('X-Total-Count', count['count(*)']);

        const medCadastrados = await connection('tbl_medcadastrado').where('idPaciente', id).select('*');

        return res.status(200).json(medCadastrados);
    },

    async create(req, res){

        const idPaciente = req.headers.authorization;

        const {
            medicamento,
            receita,
            frequencia,
            dosagem,
            horarios,
            qntDias,
            duracao,
            estoque,
            instrucao,
            dataInicio,
            dataFim,
        } = req.body;
    
        //inverte data para enviar ao banco com campo date
        function convertDate(e){
            const dia = e.split('/')[0];
            const mes = e.split('/')[1];
            const ano = e.split('/')[2];
            
            e = ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
            return e;
        }

        function CalculateAmountAlarms(e){
            if( duracao === 1 ){
                e = 9999999;
                
            } else if ( duracao === 2 ){
                let a = convertDate(dataInicio);   
                let b = convertDate(dataFim);     

                let inicio = new Date(
                    parseInt(String(a).split('-')[0]),
                    parseInt(String(a).split('-')[1]),
                    parseInt(String(a).split('-')[2]))

                let fim = new Date(
                    parseInt(String(b).split('-')[0]),
                    parseInt(String(b).split('-')[1]),
                    parseInt(String(b).split('-')[2]))
                
                e = (fim - inicio) / (60 * 60 * 24 * 1000); //verifica quantidade de dias em intervalo de datas
                
            } else if ( duracao === 3 ){
                e = qntDias * frequencia
            }
            return e;
        }

        const [ id ] = await connection('tbl_medcadastrado').insert({
            medicamento,
            receita,
            frequencia,
            dosagem,
            horarios,
            qntDias,
            estoque,
            duracao,
            instrucao,
            dataInicio: dataInicio !== '' ? convertDate(dataInicio) : null,
            dataFim: dataFim !== '' ? convertDate(dataFim) : null,
            idPaciente,
            contador_alarmes: CalculateAmountAlarms(),
            status: 1
        })

        return res.status(200).json({ id });
    },

    async updateStatus(req, res){ //atualiza status
        const dados = req.body;  
        const idPaciente = req.headers.authorization;

        try {
            await connection('tbl_medcadastrado')
            .where('id_medcadastrado', dados.id_medcadastrado)
            .where('idPaciente', idPaciente)
            .update({
                status: dados.status
            })
            
            res.status(200).send({ mensagem: 'ok'});
        } catch (error) {
            console.log(error.message)
            res.send({ message: 'erro'})
        }

    },

    async update(req, res){ //atualiza contador
        const dados = req.body;  

        if ( dados.contador <= 0 ){
            try {
                await connection('tbl_medcadastrado')
                .where('id_medcadastrado', dados.id_medcadastrado)
                .update({
                    contador_alarmes: dados.contador,
                    status: 0
                })

                res.status(200).send('ok');
            } catch (error) {
                console.log(error.message)
                res.send({ message: 'erro'})
            }

        } else {
            try {
                await connection('tbl_medcadastrado')
                .where('id_medcadastrado', dados.id_medcadastrado)
                .update({
                    contador_alarmes: dados.contador
                })

                res.status(200).send('ok');
            } catch (error) {
                console.log(error.message);
                res.send({ message: 'erro'})
            }
        }
    },

    async delete(req, res){
        const { id } = req.params;
        const idPaciente = req.headers.authorization;
        
        try {
            await connection('tbl_medcadastrado')
                .where('idPaciente', idPaciente)
                .where('id_medcadastrado', id)
                .delete();
        
            res.status(200).send('Deletado')

        } catch (error) {
            console.log(error.message)
            res.send("Erro")
        }
        
    },

    async updateRemedy(req, res){
        const data = req.body;
        const idPaciente = req.headers.authorization;
        
        //inverte data para enviar ao banco com campo date
        function convertDate(e){
            const dia = e.split('/')[0];
            const mes = e.split('/')[1];
            const ano = e.split('/')[2];
            
            e = ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
            return e;
        }

        function CalculateAmountAlarms(e){
            
            if( data.duracao === 1 ){
                e = 9999999;
                
            } else if ( data.duracao === 2 ){
                let a = convertDate(data.dataInicio);   
                let b = convertDate(data.dataFim);     

                let inicio = new Date(
                    parseInt(String(a).split('-')[0]),
                    parseInt(String(a).split('-')[1]),
                    parseInt(String(a).split('-')[2]))

                let fim = new Date(
                    parseInt(String(b).split('-')[0]),
                    parseInt(String(b).split('-')[1]),
                    parseInt(String(b).split('-')[2]))
                
                e = (fim - inicio) / (60 * 60 * 24 * 1000); //verifica quantidade de dias em intervalo de datas
                
            } else if ( data.duracao === 3 ){
                e = data.qntDias * data.frequencia
            }
            return e;
        }
        
        try {
            await connection('tbl_medcadastrado')
                .where('idPaciente', idPaciente)
                .where('id_medcadastrado', data.id_medcadastrado)
                .update({
                    medicamento: data.medicamento,
                    receita: data.receita,
                    frequencia: data.frequencia,
                    dosagem: data.dosagem,
                    horarios: data.horarios,
                    qntDias: data.qntDias,
                    estoque: data.estoque,
                    duracao: data.duracao,
                    instrucao: data.instrucao,
                    dataInicio: data.dataInicio !== '' ? convertDate(data.dataInicio) : null,
                    dataFim: data.dataFim !== '' ? convertDate(data.dataFim) : null,
                    contador_alarmes: CalculateAmountAlarms(),
                })
        
            res.status(200).send('Atualizado com sucesso')

        } catch (error) {
            console.log(error.message)
            res.send('Erro')
        }
    }

}