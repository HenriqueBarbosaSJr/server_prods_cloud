const knex = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    async createUser(req, res, next){
        try{
            const { nome } = req.body;
            const { email } = req.body;
            const { level } = req.body;
            const password = await bcrypt.hash(req.body.password, 10);
            const result = await knex ('users').where( { email } );
            if(result.length === 1){
                return res.status(400).send({ error:'E-mail já cadastrado !!!' });
                       
            }      
            console.log(password);
            await knex('users')
            .insert({ nome, email, password, level });
            return res.status(201).send( { nome, email, password, level});
        }catch (error){
            next(error); 
        }
    },

    async searchUsersAll(req, res){

        const results = await knex('users');
        
        return res.json(results);
    },

    async searchUsers(req, res, next){
        try {
            const { email } = req.body;
            const   [ result ]  = await knex ('users').where( { email } );
            console.log(result);
            if (result != undefined){
                bcrypt.compare(req.body.password, result.password,(err, respok)=>{
                    if (err){     
                              /* As mensagens de retorno precisam ser genéricas sem indicar o tipo de erro, 
                                 para não comprometer a segurança */

                        return res.status(401).send({mensagem: 'Falha na autenticação - error interno bcrypt'});
                    }
                    if (respok){
                        const token = jwt.sign({
                            idUser:result.id,
                            nome:result.nome,
                            email:result.email,
                            level:result.level
                        },'segredo',
                        {
                            expiresIn:'1h'
                        }
                        );
                        return res.status(200).send({
                            token:token,
                            mensagem: 'Autenticação com sucesso'});
                    }
                    return res.status(401).send({mensagem: 'Falha na autenticação - error password'});
                });
            }else{
                console.log({result});
                return res.status(401).send({mensagem: 'Falha na autenticação - email'});
            }

        } catch (error) {
          console.log(error);
          next(error)
        }
    },
}



