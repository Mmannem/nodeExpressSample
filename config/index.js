// require('dotenv').load();
// const fs = require('fs');
// const path = require('path');

/**
 * This module is used to maintain all the required configuration properties,
 * like environment vars, in one place so they are not scattered all over the whole codebase
 */

const devConfig = {
  name: process.env.NODE_ENV || 'dev',
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  MONGO_URL: process.env.MONGO_URL_DEV,
};

const testConfig = {
  name: process.env.NODE_ENV || 'test',
  JWT_SECRET: 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$',
  MONGO_URL: 'mongodb://localhost/Whatsapp',
};

const prodConfig = {
  name: process.env.NODE_ENV || 'prod',
  JWT_SECRET: process.env.JWT_SECRET_PROD,
  MONGO_URL: process.env.MONGO_URL_PROD,
};

function envConfig(env) {
  switch (env) {
    case 'prod':
      return prodConfig;
    case 'test':
      return testConfig;
    default:
      return devConfig;
  }
}

const env = process.env.NODE_ENV || 'dev';
const config = {
  PORT: process.env.PORT || 3000,
  env: env,
  envConfig: envConfig(env),
};

module.exports = config;