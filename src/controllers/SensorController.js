const knex = require('../database');

module.exports = {

    async index(req, res){

        const results = await knex('prods');
        
        return res.json(results);
    },

    
    async listLast (req, res, next){
        try {
            const result = await knex ('prods').orderBy('id', 'desc').limit(1);
            
            return res.json(result);

        } catch (error) {
            next(error)
        }
    },


    async create(req, res, next){
        
        try{
            const { nome } = req.body;
            const { descri } = req.body;
            const { qtda } = req.body;
            const { fabricante } = req.body;
            await knex ('prods')
            .insert({ nome , descri, qtda, fabricante });
            
            return res.status(201).send();
        } catch (error){
            next(error);

        }   
    },

}