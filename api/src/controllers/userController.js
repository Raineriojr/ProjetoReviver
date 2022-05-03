const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {

    async create(req, res){
        const { 
            nomePaciente, 
            cpf,
            nascPaciente,
            sexoPaciente,
            contatoPaciente,
            diagnostico,
            nomeCuidador,
            nascCuidador,
            sexoCuidador,
            contatoCuidador,
            senha           
        } = req.body;

        const user = await connection('tbl_paciente').where('cpf', cpf).first();

        if(user){
            return res.status(500).send({ mensagem: 'Usuário já cadastrado'})
        }

//inverte data para enviar ao banco com campo date;
        function convertDate(e){
            const dia = e.split('/')[0];
            const mes = e.split('/')[1];
            const ano = e.split('/')[2];
            
            e = ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
            return e;
        }
        
        bcrypt.hash(senha, 10, async (errBcrypt, hash) => {
            if(errBcrypt){
                return res.status(500).send({erro: errBcrypt})
            }
            const senha = hash;
            try{
                const [ id ] = await connection('tbl_paciente').insert({
                    nomePaciente, 
                    cpf,
                    nascPaciente: convertDate(nascPaciente),
                    sexoPaciente,
                    contatoPaciente,
                    diagnostico,
                    nomeCuidador,
                    nascCuidador: convertDate(nascCuidador),
                    sexoCuidador,
                    contatoCuidador,
                    senha,
                    id_img: "1",
                    status: true,
                })
    
                return res.status(200).json({ id })
    
            } catch (error){
                console.log(error.message)
                return res.status(500).send({mensagem: 'Erro ao realizar cadastro. Tente novamente!'})
            }
        })     
        
    },

    async index(req, res){
        try {
            const users = await connection('tbl_paciente').select('id_paciente','nomePaciente', 'cpf');

            return res.status(200).json(users);

        } catch (error) {
            console.log(error.message)
            return res.status(500).send({mensagem: 'Erro ao listar usuários'})
        }
    },


}

