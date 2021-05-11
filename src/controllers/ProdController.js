const knex = require('../database');

module.exports = {

    async index(req, res){

        const results = await knex('produtos');
        
        return res.json(results);
    },


    async constCod(req, res, next){
        try {
            const { cod } = req.params;
            const result = await knex ('produtos')
            .where({ cod });
            
            return res.json(result);

        } catch (error) {
            next(error)
        }
    },

    async listLast (req, res, next){
        try {
            const result = await knex ('produtos').orderBy('cod', 'desc').limit(1);
            return res.json(result);

        } catch (error) {
            next(error)
        }
    },

    async searchName(req, res){
        try{
            const { nome } = req.params;        
            const results = await knex('produtos')
                .where('nome' , 'like' , '%' + nome + '%');
    
            return res.json(results);
        }catch(error){
            next(error)
        }

    },

    async searchNameFab(req, res){
        try{
            const { nome } = req.params;        
            const results = await knex('produtos')
                .where('fabricante' , 'like' , '%' + nome + '%');
    
            return res.json(results);
        }catch(error){
            next(error)
        }

    },


    async create(req, res, next){
        
        try{
            const { nome } = req.body;
            const { descri } = req.body;
            const { qtda } = req.body;
            const { fabricante } = req.body;
            await knex ('produtos')
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
            await knex ('produtos')
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
            await knex ('produtos')
            .where({cod })
            .del();

            return res.send();
        } catch (error) {
            next(error);
            
        }
    }
}