
exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('questions').del()
		.then(function () {
			// Inserts seed entries
			return knex('questions').insert([
				{
					id:1,
					question_text:`Are you attending a community college or post high school program of less than 2 years. Text yes, no or stop to opt out.`
				},
				{
					id:2,
					question_text:`Are you attending a university or post high school program of more than 2 years. Text yes, no or stop to opt out.`
				},
				{
					id:3,
					question_text:`When do you intend to complete the post high school program you are attending? Text stop to opt out.`
				},
				{
					id:4,
					question_text:`Are you currently working in customer service or retail? Text yes, no or stop to opt out.`,
				},
				{
					id:5,
					question_text:`How long have you have your current job? Text stop to opt out.`
				},
				{
					id:6,
					question_text:`Are you currently working a technical or skilled job? Text stop to opt out.`
				},
				{
					id:7,
					question_text:`Did you recieve your training on the job or before beginning work? Text stop to opt out.`
				},
				{
					id:8,
					question_text:`Did you pay for your training? Text yes, no or stop to opt out.`
				},
				{
					id:9,
					question_text:`Did anything you learned or experienced at Pathways help you in your current career or education? Text stop to opt out.`
				},
				{
					id:10,
					question_text:`Is there anything you wish you would have learned at Pathways to help your in your current career or education? Text stop to opt out.`
				},
			]);
		});
};
