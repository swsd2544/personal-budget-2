const db = require('../db');

const getUsers = async (req, res) => {
	try {
		const { rows } = await db.query('SELECT * FROM users');
		res.status(200).send(rows[0]);
	} catch (err) {
		res.status(500).send({
			error: err.message,
		});
	}
};

const getUserById = async (req, res) => {
	const { userId } = req.params;
	try {
		const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [
			userId,
		]);
		res.status(200).send(rows[0]);
	} catch (err) {
		res.status(500).send({
			error: err.message,
		});
	}
};

const createUser = async (req, res) => {
	const { firstName, lastName, email, gender } = req.body;
	try {
		if (firstName && lastName && email && gender) {
			const { rows } = await db.query(
				'INSERT INTO users (first_name, last_name, email, gender) VALUES ($1, $2, $3, $4) RETURNING *',
				[firstName, lastName, email, gender]
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

const updateUserById = async (req, res) => {
	const { userId } = req.params;
	const { firstName, lastName, email, gender } = req.body;
	try {
		let queryData;
		if (firstName) {
			queryData = await db.query(
				'UPDATE users SET first_name = $1 WHERE id = $2 RETURNING *',
				[firstName, userId]
			);
		}
		if (lastName) {
			queryData = await db.query(
				'UPDATE users SET last_name = $1 WHERE id = $2 RETURNING *',
				[lastName, userId]
			);
		}
		if (email) {
			queryData = await db.query(
				'UPDATE users SET email = $1 WHERE id = $2 RETURNING *',
				[email, userId]
			);
		}
		if (gender) {
			queryData = await db.query(
				'UPDATE users SET gender = $1 WHERE id = $2 RETURNING *',
				[gender, userId]
			);
		}
		if (queryData.rowCount > 0) {
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

const deleteUserById = async (req, res) => {
	const { userId } = req.params;
	try {
		await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
		res.status(204).send();
	} catch (err) {
		res.status(500).send({
			message: err.message,
		});
	}
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUserById,
	deleteUserById,
};
