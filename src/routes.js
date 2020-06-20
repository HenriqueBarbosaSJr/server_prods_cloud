const express = require('express');
const routes = express.Router();

const SensorController = require('./controllers/SensorController');


routes.get('/produtos', SensorController.index);
routes.get('/produtos/last', SensorController.listLast);
routes.post('/produtos', SensorController.create);

/*
routes.get('/users',UserController.index);
routes.get('/user/:id',UserController.constId);
routes.get('/users/last',UserController.constIdLast);
routes.post('/users',UserController.create);
routes.put('/users/:id',UserController.update);
routes.delete('/users/:id',UserController.delete);
*/

module.exports = routes; 