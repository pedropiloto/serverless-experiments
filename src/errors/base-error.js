class BaseError extends Error {
  constructor(name, message, httpStatusCode) {
    super(message);
    this.name = name;
    this.httpStatusCode = httpStatusCode;
  }

  toApiResponse() {
    return {
      statusCode: this.httpStatusCode,
      body: JSON.stringify(
        {
          message: this.message,
        },
        null,
        2,
      ),
    };
  }

  toString() {
    return `Error ${this.name}  - ${this.description}`;
  }
}

module.exports = BaseError;
