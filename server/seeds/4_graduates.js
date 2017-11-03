
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('graduates').del()
    .then(function () {
      // Inserts seed entries
      return knex('graduates').insert([
        {
          id:1,
          first_name:'Josh',
          last_name:'Saunders',
          email:'joshnsaunders@gmail.com',
          opt_in_status:true,
          phone_number:'+12072130205',
          class_name:1,
        },
        {
          id:2,
          first_name:'Joscelyn',
          last_name:'James',
          email:'jos@gmail.com',
          opt_in_status:true,
          phone_number:'+13036380055',
          class_name:1,
        },
        {
          id:3,
          first_name:'Kyle',
          last_name:'Reubendale',
          email:'kyl@gmail.com',
          opt_in_status:true,
          phone_number:'+15038902873',
          class_name:1,
        },
        {
          id:4,
          first_name:'Lindsay',
          last_name:'Chapin',
          email:'lindsay@gmail.com',
          opt_in_status:true,
          phone_number:'+13072863435',
          class_name:1,
        },
        {
          id:5,
          first_name:'Kim',
          last_name:'Schlessinger',
          email:'kim@gmail.com',
          opt_in_status:true,
          phone_number:'+17194294381',
          class_name:1,
        },
        {
          id:6,
          first_name:'Miriam',
          last_name:'Quintana',
          email:'kim@gmail.com',
          opt_in_status:true,
          phone_number:'+17204213769',
          class_name:1,
        },
        {
          id:7,
          first_name:'Chelcie',
          last_name:'Britt',
          email:'kim@gmail.com',
          opt_in_status:true,
          phone_number:'+13039943688',
          class_name:1,
        },
        {
          id:8,
          first_name:'Maire',
          last_name:'Chew',
          email:'kim@gmail.com',
          opt_in_status:true,
          phone_number:'+15058016291',
          class_name:1,
        },
        {
          id:9,
          first_name:'Nate',
          last_name:'Bauer',
          email:'nate@gmail.com',
          opt_in_status:true,
          phone_number:'+18102943376',
          class_name:1,
        }
      ]);
    }).then(function(){
      return knex.raw('alter sequence graduates_id_seq restart with 5')
    })
};
