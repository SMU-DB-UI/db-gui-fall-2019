
const { log } = require('@rama41222/node-logger');

//set up some configs for express. 
const config = {
  name: 'HR-express',
  port: 3000,
  host: '0.0.0.0',
};

const logger = log({ console: true, file: false, label: config.name });

function error(message) {
  logger.error(message);
}

function info(message) {
  logger.info(message);
}

function debug(message) {
  logger.debug(message);
}

module.exports = {
  error,
  info,
  debug
}