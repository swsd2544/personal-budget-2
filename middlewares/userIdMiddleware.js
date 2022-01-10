const db = require('../db');

module.exports = async (req, res, next) => {
	const { userId } = req.params;
	const { rowCount } = await db.query('SELECT FROM users WHERE id = $1', [
		userId,
	]);
	if (rowCount === 0) {
		res.status(404).send({
			error: 'User not found',
		});
	} else {
		next();
	}
};
