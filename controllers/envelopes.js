const db = require('../db');

const getEnvelopes = async (req, res) => {
	const { userId } = req.query;
	try {
		if (userId) {
			const userValid =
				(await db.query('SELECT FROM users WHERE id = $1', [userId])).rowCount >
				0;
			if (userValid) {
				const { rows } = await db.query(
					'SELECT * FROM envelopes WHERE user_id = $1',
					[userId]
				);
				res.status(200).send(rows);
			} else {
				res.status(404).send({
					error: 'User not found',
				});
			}
		} else {
			const { rows } = await db.query('SELECT * FROM envelopes');
			res.status(200).send(rows);
		}
	} catch (err) {
		res.status(500).send({
			error: err.message,
		});
	}
};

const getEnvelopeById = async (req, res) => {
	const { envelopeId } = req.params;
	try {
		const { rows } = await db.query('SELECT * FROM envelopes WHERE id = $1', [
			envelopeId,
		]);
		res.status(200).send(rows[0]);
	} catch (err) {
		res.status(500).send({
			error: err.message,
		});
	}
};

const createEnvelope = async (req, res) => {
	const { userId, name, amount } = req.body;
	try {
		const userValid =
			(await db.query('SELECT FROM users WHERE id = $1', [userId])).rowCount >
			0;
		if (userId && name && amount && userValid) {
			const { rows } = await db.query(
				'INSERT INTO envelopes (user_id, name, amount, created_at) VALUES ($1, $2, $3, current_timestamp) RETURNING *',
				[userId, name, amount]
			);
			res.status(201).send(rows[0]);
		} else {
			res.status(401).send({
				error: 'Invalid body supplied',
			});
		}
	} catch (err) {
		res.status(500).send({
			error: err.message,
		});
	}
};

const updateEnvelopeById = async (req, res) => {
	const { envelopeId } = req.params;
	const { userId, name, amount } = req.body;
	try {
		let queryData;
		if (userId) {
			const userValid =
				(await db.query('SELECT FROM users WHERE id = $1', [userId])).rowCount >
				0;
			if (!userValid) {
				res.status(404).send({
					error: 'User not found',
				});
				return;
			}
			queryData = await db.query(
				'UPDATE envelopes SET user_id = $1, created_at = current_timestamp WHERE id = $2 RETURNING *',
				[userId, envelopeId]
			);
		}
		if (name) {
			queryData = await db.query(
				'UPDATE envelopes SET name = $1, created_at = current_timestamp WHERE id = $2 RETURNING *',
				[name, envelopeId]
			);
		}
		if (amount) {
			queryData = await db.query(
				'UPDATE envelopes SET amount = $1, created_at = current_timestamp WHERE id = $2 RETURNING *',
				[amount, envelopeId]
			);
		}
		if (queryData) {
			res.status(201).send(queryData.rows[0]);
		} else {
			res.status(400).send({
				message: 'Invalid body supplied',
			});
		}
	} catch (err) {
		res.status(500).send({
			message: err.message,
		});
	}
};

const deleteEnvelopeById = async (req, res) => {
	const { envelopeId } = req.params;
	try {
		await db.query('DELETE FROM envelopes WHERE id = $1 RETURNING *', [
			envelopeId,
		]);
		res.status(204).send();
	} catch (err) {
		res.status(500).send({
			message: err.message,
		});
	}
};

module.exports = {
	getEnvelopes,
	createEnvelope,
	getEnvelopeById,
	updateEnvelopeById,
	deleteEnvelopeById,
};
