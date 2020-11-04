const JobRepository = require('../../../src/repositories/job-repository');
const BulkLinkInitInteractor = require('../../../src/interactors/bulk-link-init-interactor');
const sqsHelper = require('../../../src/utils/sqs-helper');
const Job = require('../../../src/models/job');
const { JobStatus } = require('../../../src/models/job');

const BadRequestError = require('../../../src/errors/bad-request-error');

jest.mock('../../../src/repositories/job-repository');
jest.mock('../../../src/models/job');
jest.mock('../../../src/utils/sqs-helper');

describe('Bulk Link Init', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('given a call to initiate a bulk link operation', () => {
    describe('when the payload is not valid', () => {
      const payload = {
        brand_id: 'brand_id',
      };
      it('should throw a bad request error', () => {
        try {
          BulkLinkInitInteractor.call(payload);
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestError);
        }
      });
    });

    describe('when the payload is valid', () => {
      const payload = {
        brand_id: 'brand_id',
        offer_id: 'offer_id',
        account_id: 'account_id',
      };
      const sqsClientSendMessageFunction = jest.fn().mockReturnValue({ promise: () => {} });
      beforeEach(() => {
        JobRepository.save.mockReturnValue({});
        Job.mockReturnValue({
          id: 'job_id',
          status: JobStatus.CREATED,
        });
        sqsHelper.sqsClient.mockReturnValue({
          sendMessage: sqsClientSendMessageFunction,
        });
      });

      it('should send an event with the id of the created job', () => {
        BulkLinkInitInteractor.call(payload);
        expect(sqsClientSendMessageFunction).toHaveBeenCalledTimes(1);
        expect(sqsClientSendMessageFunction).toHaveBeenCalledWith(
          expect.objectContaining(
            {
              MessageBody: JSON.stringify({ job_id: 'job_id', brand_id: 'brand_id', offer_id: 'offer_id' }),
            },
          ),
        );
      });
      it('should save the job created', async () => {
        await BulkLinkInitInteractor.call(payload);
        expect(JobRepository.save).toHaveBeenCalledTimes(1);
        expect(JobRepository.save).toHaveBeenCalledWith(
          expect.objectContaining(
            {
              id: 'job_id',
              status: 'CREATED',
            },
          ),
        );
      });
    });
  });
});
