module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	});

	return User;
};
