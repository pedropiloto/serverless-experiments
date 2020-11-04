const AWS = require('aws-sdk');

const sqsClient = () => new AWS.SQS();

module.exports = { sqsClient };
