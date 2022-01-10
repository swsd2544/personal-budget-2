const db = require('../db');

module.exports = async (req, res, next) => {
	const { transactionId } = req.params;
	const { rowCount } = await db.query(
		'SELECT FROM transactions WHERE id = $1',
		[transactionId]
	);
	if (rowCount === 0) {
		res.status(404).send({
			error: 'Transaction not found',
		});
	} else {
		next();
	}
};
