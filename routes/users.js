const router = require('express').Router();

const {
	getUsers,
	getUserById,
	createUser,
	updateUserById,
	deleteUserById,
} = require('../controllers/users');

const userIdMiddleware = require('../middlewares/userIdMiddleware');

router.use('/:userId', userIdMiddleware);

// Routes

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:userId', getUserById);

router.put('/:userId', updateUserById);

router.delete('/:userId', deleteUserById);

module.exports = router;
