const dotenv = require('dotenv');
dotenv.config();

const withTM = require('next-transpile-modules')([
  '@mui/material',
  '@mui/system',
]);

module.exports = withTM({
  env: {
    GQL_URI: process.env.GQL_URI,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    PRISMIC_API_ENDPOINT: process.env.PRISMIC_API_ENDPOINT,
    PRISMIC_ACCESS_TOKEN: process.env.PRISMIC_ACCESS_TOKEN,
  },
  images: {
    domains: ['images.prismic.io'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/styled-engine': '@mui/styled-engine-sc',
    };
    return config;
  }
});
