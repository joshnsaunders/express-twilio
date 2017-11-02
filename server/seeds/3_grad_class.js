
exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex("grad_class")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("grad_class").insert([
				{
					id: 1,
					class_name: "2017_F",
				},
				{
					id: 2,
					class_name: "2017_S",
				},
				{
					id: 3,
					class_name: "2016_S",
				},
				{
					id: 4,
					class_name: "2016_F",
				},
			]);
		})
		.then(function() {
			return knex.raw("alter sequence grad_class_id_seq restart with 5");
		});
};
