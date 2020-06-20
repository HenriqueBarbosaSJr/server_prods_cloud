
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sensores').del()
    .then(function () {
      // Inserts seed entries
      return knex('sensores').insert([
        {sensor1: '35.4', sensor2: '25.4', sensor3: '45.4'},
        {sensor1: '45.4', sensor2: '75.4', sensor3: '65.4'},
        {sensor1: '5.4', sensor2: '2.4', sensor3: '85.4'}
      ]);
    });
};
