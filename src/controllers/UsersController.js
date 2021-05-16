const knex = require('../database');
const bcrypt = require('bcrypt');

module.exports = {
    async auth(req, res, next){
        try{
            const { email } = req.body;

            const password = await bcrypt.hash(req.body.password, 10);
                       
            console.log(password);
            await knex('users')
            .insert({ email, password });
            return res.status(201).send();
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
            const   [ result ]  = await knex ('users').where( { email } )
 
            if (result != undefined){
                bcrypt.compare(req.body.password, result.password,(err, respok)=>{
                    if (err){
                        return res.status(401).send({mensagem: 'Falha na autenticação'});
                    }
                    if (respok){
                        return res.status(200).send({mensagem: 'Autenticação com sucesso'});
                    }
                    return res.status(401).send({mensagem: 'Falha na autenticação'});
                });
            }else{
                console.log({result});
                return res.status(401).send({mensagem: 'Falha na autenticação'});
            }

        } catch (error) {
          console.log(error);
          next(error)
        }
    },


}



