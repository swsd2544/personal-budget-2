const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');

dotenv.config({ path: './config/config.env' });

const usersRouter = require('./routes/users');
const envelopesRouter = require('./routes/envelopes');
// const transactionRouter = require('./routes/transactions');
const docsRouter = require('./routes/docs');

const app = express();

const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(logger(morganFormat));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/api-docs', docsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/envelopes', envelopesRouter);
// app.use('/api/v1/transaction', transactionRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
