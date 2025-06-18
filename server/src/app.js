const express = require('express');
 const cors = require('cors')
const app = express();

app.set('view engine', 'ejs');
app.set('views', "./src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:'http://localhost:5173',  credentials: true  }))

const auth = require('./routes/auth.route');

app.use('/api/auth', auth);

module.exports = app;