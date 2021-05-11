const express = require('express');
const routes = express.Router();

const ProdController = require('./controllers/ProdController');


routes.get('/produtos', ProdController.index);
routes.get('/produto/:cod',ProdController.constCod);
routes.get('/produto/last', ProdController.listLast);
routes.get('/produtos/:nome', ProdController.searchName);
routes.get('/produtosfab/:nome', ProdController.searchNameFab);
routes.post('/produto', ProdController.create);
routes.put('/produto/:cod', ProdController.update);
routes.delete('/produto/:cod',ProdController.delete);
routes.get('/favicon.ico', (req, res) => res.status(204));

module.exports = routes; 