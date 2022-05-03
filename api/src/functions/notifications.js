const admin = require('firebase-admin');
const { google } = require('googleapis');
const fetch = require('node-fetch');

const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

function getAcessToken(){
    return new Promise(function(resolve, reject){
        var key = require('../../service_account.json');
        var jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            SCOPES,
            null
        )
        jwtClient.authorize(function(err, tokens){
            if(err){
                reject(err);
                console.log(err)
                return;
            }
            resolve(tokens.access_token)
        })
    })
}


async function Notification(props){
    props.forEach(async(item, index) => {
        if(item.token == ''){
            return
        }
        let apiToken = '';
        
        await getAcessToken().then(function(access_token){
            //console.log(access_token);
            apiToken = access_token;
        })
        
        const message = {
            "message": {
                "token" : `${item.token}`,
                "notification": {
                    "title": "Hora do seu medicamento!⏰",
                    "body": `Tomar ${item.dosagem} de ${item.medicamento}`
                },
                "data": {
                    "title": "Hora do seu medicamento!⏰",
                    "message": `Tomar ${item.dosagem} de ${item.medicamento}`,
                    "scopeKey": '@raineriojr/app_reviver',
                    "name": `${item.medicamento}`,
                    "dosagem": `${item.dosagem}`,
                    "id_medicamento": `${item.id_medcadastrado}`,
                    "id_Paciente": `${item.idPaciente}`,
                    "horario":`${item.horarios}`
                },
                "android": {
                    "direct_boot_ok": true
                }
            }
        }

//envia notificaçao fcm para tomar medicamento
        try {
            const resp = await fetch('https://fcm.googleapis.com/v1/projects/reviver21/messages:send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiToken}`,
                },
                body: JSON.stringify(message)
            })  

            //salva valores de notificacao no banco
                if(resp.status === 200){
                    try {
                        await fetch(process.env.BASE_URL+'/notifications/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                                paciente_id: message.message.data.id_Paciente,
                                medicamento_id: message.message.data.id_medicamento,
                                nome: message.message.data.name,
                                dosagem: message.message.data.dosagem
                        })
                    })
                    } catch (error) {
                        console.error('cadastrar notificação: ', error.message);
                    }
                }

            console.log(resp);
        } catch (error) {
            console.log('notificaçao 2', error.message)
        }

/******************************************** */
//envia notificaçao fcm para FIM DE ESTOQUE SEM RECEITA
        if(item.estoque > 0 && item.estoque < 5){
            const message2 = {
                "message": {
                    "token" : `${item.token}`,
                    "notification": {
                        "title": "Atenção! Medicamento perto do fim!",
                        "body": `O estoque de ${item.medicamento} está próximo de acabar. Verifique seus medicamentos.`
                    },
                    "data": {
                        "title": "Atenção! Medicamento perto do fim!",
                        "message": `O estoque de ${item.medicamento} está próximo de acabar. Verifique seus medicamentos.`,
                        "scopeKey": '@raineriojr/app_reviver',
                        "id_medicamento": `${item.id_medcadastrado}`,
                        "id_Paciente": `${item.idPaciente}`,
                    },
                    "android": {
                        "direct_boot_ok": true
                    }
                }
            }
    
            try {
                const resp2 = await fetch('https://fcm.googleapis.com/v1/projects/reviver21/messages:send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${apiToken}`,
                    },
                    body: JSON.stringify(message2)
                })
                console.log(resp2);
            } catch (error) {
                console.log('notificaçao 2' ,error.message)
            }
        }

//envia notificaçao fcm para RENOVAR RECEITA
        if(item.estoque > 0 && item.estoque < 5 && item.receita === 1){
            const message3 = {
                "message": {
                    "token" : `${item.token}`,
                    "notification": {
                        "title": "ATENÇÃO! RENOVAÇÃO DE RECEITA",
                        "body": `O medicamento ${item.medicamento} necessita de receita. Lembre-se de renová-la.`
                    },
                    "data": {
                        "title": "ATENÇÃO! RENOVAÇÃO DE RECEITA",
                        "message": `O medicamento ${item.medicamento} necessita de receita. Lembre-se de renová-la.`,
                        "scopeKey": '@raineriojr/app_reviver',
                        "id_medicamento": `${item.id_medcadastrado}`,
                        "id_Paciente": `${item.idPaciente}`,
                    },
                    "android": {
                        "direct_boot_ok": true
                    }
                }
            }
    
            try {
                const resp3 = await fetch('https://fcm.googleapis.com/v1/projects/reviver21/messages:send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${apiToken}`,
                    },
                    body: JSON.stringify(message3)
                })
                console.log(resp3);
            } catch (error) {
                console.log('notificaçao 3', error.message)
            }
        }

        let contador = item.contador_alarmes
        let id = item.id_medcadastrado

        let dados = {
            contador: (contador - 1),
            id_medcadastrado: id
        }
        
        try {
            await fetch(`${process.env.BASE_URL}/medicamento/atualiza_contador`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados)
            })
        } catch (error) {
            console.log(error.message)
        }
    })
}

module.exports = Notification;
