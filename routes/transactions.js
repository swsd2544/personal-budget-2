const router = require('express').Router();

const {
	getTransactions,
	getTransactionById,
	createTransaction,
	updateTransactionById,
	deleteTransactionById,
} = require('../controllers/transactions');

const transactionIdMiddleware = require('../middlewares/transactionIdMiddleware');

router.use('/:transactionId', transactionIdMiddleware);

// Routes

router.get('/', getTransactions);

router.post('/', createTransaction);

router.get('/:id', getTransactionById);

router.put('/:id', updateTransactionById);

router.delete('/:id', deleteTransactionById);

module.exports = router;
