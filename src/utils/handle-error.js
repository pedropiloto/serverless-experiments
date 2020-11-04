const BaseError = require('../errors/base-error');

const handleAPIError = (error) => {
  if (error instanceof BaseError) {
    return error.toApiResponse();
  }
  console.error('Unhandled Error:', error.stack);
  return {
    statusCode: 500,
    body: JSON.stringify(
      {
        message: 'Unhandled Error',
      },
      null,
      2,
    ),
  };
};

module.exports = { handleAPIError };
