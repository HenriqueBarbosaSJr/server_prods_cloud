
exports.up = (knex) => knex.schema.createTable('sensores', (table)=>{
    table.increments('id').primary()
    table.float('sensor1')
    table.float('sensor2')
    table.float('sensor3')
    
    table.timestamp('datahora').notNullable()
})


exports.down = (knex) => {

  return knex.schema.dropTable('sensores')

};