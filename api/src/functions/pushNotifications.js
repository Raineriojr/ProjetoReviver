const connection = require('../database/connection');
const later = require("later");
const Notification = require('./notifications');

let hour = '';

function pushNotifications(){
    let sched = later.parse.recur().every(1).minute(),
    t = later.setInterval(callData, sched);

    function callData() {
        hour = new Date().toTimeString().split(":")[0]+':'+new Date().toTimeString().split(":")[1]
        Alarms();
    }
};

function Alarms(){
    getData().then((returnData)=>{
        if(returnData == ''){
            return null;
        } else {
            Notification(returnData);
        }
    })
}

function getData(){
    //console.log(hour)
    return new Promise(async(resolve, reject) => {
        try {
            const data = await connection('tbl_medcadastrado')
                .where('horarios', 'like', `%${hour}%`)
                .where('status', 1)
                .innerJoin('tbl_tokens', 'tbl_medcadastrado.idPaciente', '=', 'tbl_tokens.user_id')
                .select(['tbl_medcadastrado.*', 'tbl_tokens.token']);

            const data2 = JSON.parse(JSON.stringify(data));
            //console.log('horarios', data2)

            return resolve(data2)
        } catch (error) {
            console.log('consulta hora', error.message)
            return reject('Erro');
        }
    })
}

module.exports = pushNotifications;



