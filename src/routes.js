const express = require('express');
const routes = express.Router();

const ProdController = require('./controllers/ProdController');
const UsersController = require('./controllers/UsersController');
const authorization = require('../middleware/authorization');

routes.get('/produtos', ProdController.index);
routes.get('/produto/:cod',ProdController.constCod);
routes.get('/produto/last', ProdController.listLast);
routes.get('/produtos/:nome', ProdController.searchName);
routes.get('/produtosfab/:nome', ProdController.searchNameFab);
routes.post('/produto', ProdController.create);
routes.put('/produto/:cod', ProdController.update);
routes.delete('/produto/:cod',ProdController.delete);
routes.get('/favicon.ico', (req, res) => res.status(204));

routes.post('/sproduto', authorization ,ProdController.create);
routes.put('/sproduto/:cod', authorization , ProdController.update);
routes.delete('/sproduto/:cod', authorization , ProdController.delete);

routes.post('/createuser', UsersController.createUser);
routes.get('/usersall', UsersController.searchUsersAll);
routes.post('/userauth', UsersController.searchUsers);


module.exports = routes; 
