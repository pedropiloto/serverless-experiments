const BadRequestError = require('../errors/bad-request-error.js');
const JobRepository = require('../repositories/job-repository.js');
const { JobStatus } = require('../models/job');

const checkPayload = (payload) => !!payload.brand_id && !!payload.offer_id && !!payload.job_id;

const call = async (payload) => {
  if (!checkPayload(payload)) throw new BadRequestError('Invalid Parameters');

  console.log(`doing lots of heavy stuff - job_id: ${payload.job_id} brand_id: ${payload.brand_id} offer_id: ${payload.offer_id}`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await JobRepository.updateStatus(payload.job_id, JobStatus.COMPLETED);

  // TODO Also could be nice to notify of that the job has been completed in this step
};

module.exports = { call };
