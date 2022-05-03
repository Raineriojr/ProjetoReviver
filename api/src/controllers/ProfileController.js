const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    async login(req, res){
        const { cpf, senha, token } = req.body;
        
        const user = await connection('tbl_paciente').where('cpf', cpf).first();
        //console.log(token)
        if(!user){ 
            return res.status(500).send({ mensagem: 'Usuário ou senha incorretos' })
        }
        
        const verifyToken = await connection('tbl_tokens').where('user_id', user.id_paciente).select('*');

        if(verifyToken[0] == undefined || null){
            await connection('tbl_tokens').insert({
                token: token,
                user_id: user.id_paciente
            })
        }
        else if (verifyToken[0].token !== token){
            await connection('tbl_tokens').where('user_id', user.id_paciente).update({
                token: token
            })
        }
        
        bcrypt.compare(senha, user.senha).then((result)=>{
            if(result === true){
                 return res.status(200).json(user);
            } else {
                return res.status(500).send({ mensagem: 'Usuário ou senha incorretos' })
            }
        })
    },

    async logout (req, res){
        const { id } = req.body;

        try {
            await connection('tbl_tokens').where('user_id', id).update({
                token: ""
            })
            res.status(200).send({ mensagem: 'ok' })
        } catch (error) {
            console.log(error.message)
            res.send(error)
        }
    }
}

