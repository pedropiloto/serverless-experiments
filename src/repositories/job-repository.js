const { dynamodbClient } = require('../utils/dynamodb-helper');

const save = (job) => dynamodbClient().put({
  TableName: process.env.DYNAMODB_TABLE,
  Item: {
    PK: `JOB#${job.id}`,
    SK: `JOB#${job.id}`,
    JobStatus: job.status,
  },
}).promise();

const updateStatus = (jobId, status) => dynamodbClient().update({
  TableName: process.env.DYNAMODB_TABLE,
  Key: {
    PK: `JOB#${jobId}`,
    SK: `JOB#${jobId}`,
  },
  UpdateExpression: 'SET JobStatus = :JobStatus',
  ExpressionAttributeValues: {
    ':JobStatus': status,
  },
}).promise();

module.exports = {
  save, updateStatus,
};
