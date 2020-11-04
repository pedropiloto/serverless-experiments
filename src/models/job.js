const uuid = require('uuid');

const JobStatus = {
  CREATED: 'CREATED',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
};

class Job {
  constructor(params) {
    this.id = params.id ? params.id : uuid.v1();
    this.status = params.status ? params.status : JobStatus.CREATED;
  }
}

module.exports = Job;
module.exports.JobStatus = JobStatus;
