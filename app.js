require('dotenv/config');

const express = require('express');
const { Sequelize } = require('sequelize');
const db = require('./models');
const app = express();

const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');

app.use(express.json());
app.use(webRoutes);
app.use('/api', apiRoutes);

db.sequelize.sync().then(req => {
	// PORT
	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log(`Listening on port ${port}...`);
	});
});
