 require('dotenv').config();

const mongoose = require('mongoose');
const _config = {
  PORT: process.env.PORT,
  dbURL:process.env.MONGO_URL,
  debug: true
};


const config =Object.freeze(_config);

module.exports = config;
