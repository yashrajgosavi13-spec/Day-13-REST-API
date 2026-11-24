
const morgan = require('morgan');

// Custom request logger
const logger = morgan(':method :url :status - :response-time ms');

module.exports = logger;
