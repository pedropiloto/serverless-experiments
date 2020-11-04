const BadRequestError = require('../errors/bad-request-error.js');
const JobRepository = require('../repositories/job-repository.js');
const Job = require('../models/job');
const { sqsClient } = require('../utils/sqs-helper');

const checkPayload = (payload) => !!payload.brand_id && !!payload.offer_id;

const call = async (payload) => {
  if (!checkPayload(payload)) throw new BadRequestError('Invalid Parameters');

  const job = new Job({});

  const accountId = payload.account_id;
  const queueUrl = `https://sqs.eu-west-1.amazonaws.com/${accountId}/MyQueue`;

  // SQS message parameters
  const params = {
    MessageBody: JSON.stringify({
      job_id: job.id, brand_id: payload.brand_id, offer_id: payload.offer_id,
    }),
    QueueUrl: queueUrl,
  };

  await sqsClient().sendMessage(params).promise();

  await JobRepository.save(job);
  return job;
};

module.exports = { call };
