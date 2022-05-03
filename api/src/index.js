require('dotenv/config');

const dotenv = require('dotenv');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const pushNotifications = require('./functions/pushNotifications');

const App = express();

App.use(cors());
App.use(express.static('public'))
App.use(express.json());
App.use(routes);

App.listen(process.env.PORT || 3000, ()=>{
    console.log('Servidor iniciado na porta: '+process.env.PORT);
})

dotenv.config();
App.listen(()=>{
    console.log('inicia controle de notificações');
    pushNotifications();
})
