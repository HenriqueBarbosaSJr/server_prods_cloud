const express = require('express');
const routes = express.Router();

const ProdController = require('./controllers/ProdController');


routes.get('/produtos', ProdController.index);
routes.get('/produtos/:cod',ProdController.constCod);
routes.get('/produto/last', ProdController.listLast);
routes.post('/produtos', ProdController.create);
routes.put('/produtos/:cod', ProdController.update);
routes.delete('/produtos/:cod',ProdController.delete);
routes.get('/favicon.ico', (req, res) => res.status(204));

module.exports = routes; 