const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    try{
        console.log('Executando a autorização.....');
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            return res.status(401).send({ error : "Requisição sem token"});
        }
        const partsToken = authHeader.split(' ');
        
        if (partsToken.length != 2){
            return res.status(401).send({error : "Token inválido"});
        }

        const [ scheme, token ] = partsToken;
        
        /* Busca através de expressões regulares
            
            /^Bearer$/i.test(scheme)

            / início e fim do elemento de busca
            ˆ início da verificação
            $ indica o final da verificação
            i insensitive (não case sensitive)
            test método que executa a procura

            ! negação da estrutura condicional if 
        */
        if(!/^Bearer$/i.test(scheme)){
            return res.status(401).send({ error : "Token fora do padrão esperado"});
        } 

        const decode = jwt.verify(token,'segredo');
        req.session = decode;
        next();
    }catch(error){
        return res.status(401).send({mensagem: 'Falha na autenticação - error token'});
    }
    
}

