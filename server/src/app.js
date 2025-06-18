const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', "./src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const auth = require('./routes/auth.route');

app.use('/api/auth', auth);

module.exports = app;