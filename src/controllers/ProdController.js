const knex = require('../database');

module.exports = {

    async index(req, res){

        const results = await knex('prods');
        
        return res.json(results);
    },


    async constCod(req, res, next){
        try {
            const { cod } = req.params;
            const result = await knex ('prods')
            .where({ cod });
            
            return res.json(result);

        } catch (error) {
            next(error)
        }
    },

    async listLast (req, res, next){
        try {
            const result = await knex ('prods').orderBy('cod', 'desc').limit(1);
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

    async update (req, res, next){
        try {
            const { nome } = req.body;
            const { descri } = req.body;
            const { qtda } = req.body;
            const { fabricante } = req.body;
            const { cod } = req.params;
            await knex ('prods')
            .update({ nome , descri, qtda, fabricante  })
            .where({ cod });

            return res.send();

        } catch (error) {
            next(error)
        }
    },

    async delete(req, res, next){
        try {
            const { cod } = req.params;
            await knex ('prods')
            .where({cod })
            .del();

            return res.send();
        } catch (error) {
            next(error);
            
        }
    }
}