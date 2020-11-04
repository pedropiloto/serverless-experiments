const CreateLocationInteractor = require('../../../src/interactors/create-location-interactor');
const LocationHandler = require('../../../src/handlers/location-handler');
const BadRequestError = require('../../../src/errors/bad-request-error');
const { handleAPIError } = require('../../../src/utils/handle-error');

jest.mock('../../../src/interactors/create-location-interactor');
jest.mock('../../../src/utils/handle-error');

describe('Location Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('given a request to create a location', () => {
    const event = {
      body: JSON.stringify({
        address: 'street 01',
        brand_id: 'brand_01',
      }),
    };

    it('should call the interactor with the payload received', () => {
      LocationHandler.create(event);
      expect(CreateLocationInteractor.call).toHaveBeenCalledTimes(1);
      expect(CreateLocationInteractor.call).toHaveBeenCalledWith(
        {
          address: 'street 01',
          brand_id: 'brand_01',
        },
      );
    });

    describe('when it succeeds to create the location', () => {
      const interactorResponse = {};
      beforeEach(() => {
        CreateLocationInteractor
          .call
          .mockResolvedValue(interactorResponse);
      });

      it('should return a successful response', async () => {
        const response = await LocationHandler.create(event);
        expect(response).toEqual({
          statusCode: 201,
          body: JSON.stringify(interactorResponse,
            null,
            2),
        });
      });
    });
    describe('when it does not succeed to create the location', () => {
      beforeEach(() => {
        CreateLocationInteractor
          .call
          .mockImplementation(() => { throw new BadRequestError('Invalid Parameters'); });
      });

      it('should return a successful response', async () => {
        await LocationHandler.create(event);
        expect(handleAPIError).toHaveBeenCalledTimes(1);
      });
    });
  });
});
