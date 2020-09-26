const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  env: {
    GQL_URI: process.env.GQL_URI,
  },
};
