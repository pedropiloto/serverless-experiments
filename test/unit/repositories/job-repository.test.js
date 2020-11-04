const Job = require('../../../src/models/job');
const { JobStatus } = require('../../../src/models/job');

const dynamodbHelper = require('../../../src/utils/dynamodb-helper');
const JobRepository = require('../../../src/repositories/job-repository');

jest.mock('../../../src/utils/dynamodb-helper');

describe('Job Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('given a call to save an offer', () => {
    const dynamodbClientPutFunction = jest.fn().mockReturnValue({ promise: () => {} });
    beforeEach(() => {
      dynamodbHelper.dynamodbClient.mockReturnValue({
        put: dynamodbClientPutFunction,
      });
    });

    it('should call the put function to dynamodb with the item', () => {
      JobRepository.save(new Job({
        id: 'job_id',
        status: 'CREATED',
      }));
      expect(dynamodbClientPutFunction).toHaveBeenCalledTimes(1);
      expect(dynamodbClientPutFunction).toHaveBeenCalledWith({
        Item: {
          PK: 'JOB#job_id',
          SK: 'JOB#job_id',
          JobStatus: 'CREATED',
        },
        TableName: undefined,
      });
    });
  });

  describe('given a call to increment the locations of an offer', () => {
    const dynamodbClientUpdateFunction = jest.fn().mockReturnValue({ promise: () => {} });
    beforeEach(() => {
      dynamodbHelper.dynamodbClient.mockReturnValue({
        update: dynamodbClientUpdateFunction,
      });
    });

    it('should call the put function to dynamodb with the item', () => {
      JobRepository.updateStatus('job_id', JobStatus.COMPLETED);
      expect(dynamodbClientUpdateFunction).toHaveBeenCalledTimes(1);
      expect(dynamodbClientUpdateFunction).toHaveBeenCalledWith({
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          PK: 'JOB#job_id',
          SK: 'JOB#job_id',
        },
        UpdateExpression: 'SET JobStatus = :JobStatus',
        ExpressionAttributeValues: {
          ':JobStatus': JobStatus.COMPLETED,
        },
      });
    });
  });
});
