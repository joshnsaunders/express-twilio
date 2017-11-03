const express = require('express');
const router = express.Router();
const database = require('../db/knex');

// get all classes
router.get('/gradclass', function(request, response) {
	database('grad_class').then(function(data) {
		response.json(data);
	});
});

// get one class by id
router.get('/gradclass/id/:id', function(request, response) {
	 database('grad_class')
		.select()
		.where('id', request.params.id)
		.then((data) => {
			response.json(data)
		})
});

// get one class by class_name
router.get('/gradclass/:classname', function(request, response) {
	const classname = parseInt(request.params.classname);
	return database('grad_class')
		.select('id')
		.where('class_name', '=', classname)
		.then((data) => {
			response.json(data)
		})
});


router.post('/gradclass/add', function(req, res) {
	console.log(req.body.class_name)
	return database('grad_class')
		.insert({class_name: req.body.class_name})
		.returning('id')
		.then(data => res.json(data))
})





module.exports = router;

