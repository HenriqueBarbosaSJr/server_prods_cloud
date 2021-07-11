const jwt = require('jsonwebtoken');



module.exports = (req, res, next)=>{

	try{
		console.log('Executando a autorizaçao.....');
		const authHeader = req.headers.authorization;

		if(!authHeader){
			return res.status(401).send({ error : "Requisição sem token"});
		}

		const partsToken = authHeader.split(' ');

		if(partsToken.length != 2){
			return res.status(401).send({error : "Token inválido"});
		} 

		const [ scheme, token ] = partsToken;

		if(!/^Bearer$/i.test(scheme)){
			return res.status(401).send({ error : "Token fora do padrão esperado"});
		}

		const decode = jwt.verify(token,'segredo');
		req.session = decode;
		next();

	}catch(error){
		return res.status(401).send({ mensagem:'Falha na autenticaçao - error token'});
	}

}
