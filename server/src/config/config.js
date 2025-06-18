 require('dotenv').config();
 
const _config = {
  PORT: process.env.PORT,
  dbURL:process.env.MONGO_URL,
  JWT_SECRET:process.env.JWT_SECRET,
  debug: true
};


const config =Object.freeze(_config);

module.exports = config;
