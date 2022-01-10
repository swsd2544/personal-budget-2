const e = require('express');
const db = require('../db');

const getTransactions = async (req, res) => {
	const { envelopeId } = req.query;
	try {
		if (envelopeId) {
			const envelopeValid =
				(await db.query('SELECT FROM envelopes WHERE id = $1', [envelopeId]))
					.rowCount > 0;
			if (envelopeValid) {
				const { rows } = await db.query(
					'SELECT * FROM transactions WHERE envelope_id = $1',
					[envelopeId]
				);
				res.status(200).send(rows);
			} else {
				res.status(404).send({
					error: 'Envelope not found',
				});
			}
		} else {
			const { rows } = await db.query('SELECT * FROM transactions');
			res.status(200).send(rows);
		}
	} catch (err) {
		res.status(500).send({
			error: err.message,
		});
	}
};

const getTransactionById = async (req, res) => {
	const { transactionId } = req.params;
	try {
		const { rows } = await db.query(
			'SELECT * FROM Transactions WHERE id = $1',
			[transactionId]
		);
		res.status(200).send(rows[0]);
	} catch (err) {
		res.status(500).send({
			error: err.message,
		});
	}
};

const createTransaction = async (req, res) => {
	const { envelopeId, name, amount } = req.body;
	try {
		const envelopeValid =
			(await db.query('SELECT FROM envelopes WHERE id = $1', [envelopeId]))
				.rowCount > 0;
		if (envelopeId && name && amount && envelopeValid) {
			const { rows } = await db.query(
				'INSERT INTO Transactions (user_id, name, amount, created_at) VALUES ($1, $2, $3, current_timestamp) RETURNING *',
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

const updateTransactionById = async (req, res) => {
	const { TransactionId } = req.params;
	const { envelopeId, name, amount } = req.body;
	try {
		let queryData;
		if (envelopeId) {
			queryData = await db.query(
				'UPDATE Transactions SET name = $1, created_at = current_timestamp WHERE id = $2 AND user_id = $3 RETURNING *',
				[name, TransactionId, userId]
			);
		}
		if (name) {
			queryData = await db.query(
				'UPDATE Transactions SET name = $1, created_at = current_timestamp WHERE id = $2 AND user_id = $3 RETURNING *',
				[name, TransactionId, userId]
			);
		}
		if (amount) {
			queryData = await db.query(
				'UPDATE Transactions SET amount = $1, created_at = current_timestamp WHERE id = $2 RETURNING *',
				[amount, TransactionId, userId]
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

const deleteTransactionById = async (req, res) => {
	const { TransactionId } = req.params;
	try {
		await db.query('DELETE FROM Transactions WHERE id = $1 RETURNING *', [
			TransactionId,
		]);
		res.status(204).send();
	} catch (err) {
		res.status(500).send({
			message: err.message,
		});
	}
};

module.exports = {
	getTransactions,
	createTransaction,
	getTransactionById,
	updateTransactionById,
	deleteTransactionById,
};
