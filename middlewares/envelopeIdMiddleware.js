const db = require('../db');

module.exports = async (req, res, next) => {
	const { envelopeId } = req.params;
	const { rowCount } = await db.query('SELECT FROM envelopes WHERE id = $1', [
		envelopeId,
	]);
	if (rowCount === 0) {
		res.status(404).send({
			error: 'Envelope not found',
		});
	} else {
		next();
	}
};
