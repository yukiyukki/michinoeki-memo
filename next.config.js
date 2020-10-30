const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  env: {
    GQL_URI: process.env.GQL_URI,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },
  images: {
    domains: ['images.prismic.io'],
  },
};
