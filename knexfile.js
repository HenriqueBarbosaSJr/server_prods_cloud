// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host:'3.130.56.128',
      user : 'admin',
      password : 'adm123456',
      database : 'bancoProd'
    },

    migrations:{
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }

  },

};
