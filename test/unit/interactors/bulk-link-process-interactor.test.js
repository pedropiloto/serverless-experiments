const JobRepository = require('../../../src/repositories/job-repository');
const BulkLinkProcessInteractor = require('../../../src/interactors/bulk-link-process-interactor');
const { JobStatus } = require('../../../src/models/job');

const BadRequestError = require('../../../src/errors/bad-request-error');

jest.mock('../../../src/repositories/job-repository');
jest.mock('../../../src/models/job');
jest.mock('../../../src/utils/dynamodb-helper');

describe('Bulk Link Init', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('given a call to process a bulk link operation', () => {
    describe('when the payload is not valid', () => {
      const payload = {
        brand_id: 'brand_id',
      };
      it('should throw a bad request error', async () => {
        try {
          await BulkLinkProcessInteractor.call(payload);
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestError);
        }
      });
    });

    describe('when the payload is valid', () => {
      const payload = {
        brand_id: 'brand_id',
        offer_id: 'offer_id',
        job_id: 'job_id',
      };
      beforeEach(() => {
        JobRepository.updateStatus.mockReturnValue({});
      });

      it('should send an event with the id of the created job', async () => {
        await BulkLinkProcessInteractor.call(payload);
        expect(JobRepository.updateStatus).toHaveBeenCalledTimes(1);
        expect(JobRepository.updateStatus).toHaveBeenCalledWith('job_id', JobStatus.COMPLETED);
      });
    });
  });
});
