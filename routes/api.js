const express = require('express');
const router = express.Router();
const Joi = require('joi');

const { User } = require('../models');

router.get('/news', (req, res) => {
	const items = User.findAll()
		.then(users => {
			res.send(users);
		})
		.catch(err => {
			console.log(err);
		});
});

router.get('/news/:id', (req, res) => {
	const item = news.find(x => x.id === parseInt(req.params.id));
	if (!item) return res.status(404).send('404');

	res.send(item);
});

router.post('/news', (req, res) => {
	const { error } = validateItem(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	var item = User.create({
		name: req.body.name,
	})
		.then(x => res.send(x))
		.catch(err => {
			if (err) console.log(err);
		});
});

router.put('/news/:id', (req, res) => {
	const item = news.find(x => x.id === parseInt(req.params.id));
	if (!item) return res.status(404).send('404');

	try {
		const { error } = validateItem(req.body);

		if (error) return res.status(400).send(error.details[0].message);
	} catch (err) {}

	item.name = req.body.name;
	res.send(item);
});

router.delete('/news/:id', (req, res) => {
	User.findOne({ where: { id: parseInt(req.params.id) } })
		.then(item => {
			User.destroy({ where: { id: parseInt(req.params.id) } }).catch(
				err => {
					console.log(err);
				}
			);
			res.send('deleted');
		})
		.catch(err => {
			console.log(err);
		});
});

function validateItem(item) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	return schema.validate({ name: item.name });
}

module.exports = router;
