const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes')

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(morgan(':method :url :status :response-time ms'));
/* morgan('combined') informações completas
   morgan('tiny') informa o método o endereço e o tempo de acesso

/* Tratamento de error caso o cliente digite uma
   rota deconhecida pelo servidor
*/
app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
    console.log("acesso ao end errado");
})


/* catch all (capturar todos os erros)
   links de HTTP Status de erros
   https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status 
*/
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: error.message });
})

app.listen(3334, ()=> console.log('Servidor ON - Rodando na porta 3334'));
