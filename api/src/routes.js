const express = require('express');

const userController = require('./controllers/userController');
const medController = require('./controllers/medController');
const profileController = require('./controllers/ProfileController');
const registerController = require('./controllers/registerController');
const feedbackController = require('./controllers/feedbackController');
const medTomadosController = require('./controllers/medTomadosController');
const NotificationController = require('./controllers/notificationController');
const EstoqueController = require('./controllers/estoqueController');

const routes = express.Router();

routes.get('/usuarios', userController.index);
routes.post('/cadastro', userController.create);

routes.post('/login', profileController.login);
routes.post('/logout', profileController.logout);

routes.post('/medicamento/novo', medController.create);
routes.post('/medicamento/update', medController.updateRemedy);
routes.get('/medicamento/lista/:id', medController.index);
routes.post('/medicamento/atualiza_contador', medController.update);
routes.post('/medicamento/atualiza_status', medController.updateStatus);
routes.delete('/medicamento/delete/:id', medController.delete);

routes.post('/registros/novo', registerController.create);
routes.get('/registros/lista', registerController.index);

routes.post('/medicamento_tomado', medTomadosController.create);
routes.delete('/medicamento_tomado/delete/:id', medTomadosController.delete);

routes.post('/feedbacks', feedbackController.create);
routes.get('/feedbacks/lista', feedbackController.index);

routes.get('/notifications/:status', NotificationController.index);
routes.post('/notifications/create', NotificationController.create);
routes.post('/notifications/update', NotificationController.update);

routes.get('/estoque/update', EstoqueController.decrement);

module.exports = routes;