exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('auth').del()
    .then(function() {
      // Inserts seed entries
      return knex('auth').insert([{
        id: 1,
        email: 'joshnsaunders@gmail.com',
        hash: 'password',
      }, {
        id: 2,
        email: 'null@null.com',
        hash: 'password',
      }, {
        id: 3,
        email: 'ping@pong.com',
        hash: 'password',
      }]);
    });
};
