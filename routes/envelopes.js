const router = require('express').Router();

const {
	getEnvelopes,
	getEnvelopeById,
	createEnvelope,
	updateEnvelopeById,
	deleteEnvelopeById,
} = require('../controllers/envelopes');

const envelopeIdMiddleware = require('../middlewares/envelopeIdMiddleware');

router.use('/:envelopeId', envelopeIdMiddleware);

// Routes

router.get('/', getEnvelopes);

router.post('/', createEnvelope);

router.get('/:envelopeId', getEnvelopeById);

router.put('/:envelopeId', updateEnvelopeById);

router.delete('/:envelopeId', deleteEnvelopeById);

module.exports = router;
