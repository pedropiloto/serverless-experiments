const BaseError = require('./base-error');
const HttpStatusCode = require('../utils/http-status-code');

class BadRequestError extends BaseError {
  constructor(message) {
    super('BadRequest', message, HttpStatusCode.BAD_REQUEST);
  }
}

module.exports = BadRequestError;
