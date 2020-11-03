const BaseError = require('./base-error.js');
const HttpStatusCode = require('../utils/http-status-code');

class NotFoundError extends BaseError {
  constructor(message) {
    super('NotFoundError', message, HttpStatusCode.NOT_FOUND);
  }
}

module.exports = NotFoundError;
