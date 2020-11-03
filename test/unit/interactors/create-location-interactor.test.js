const LocationRepository = require('../../../repositories/location-repository');
const CreateLocationInteractor = require('../../../interactors/create-location-interactor');
const BadRequestError = require('../../../errors/bad-request-error');

jest.mock('../../../repositories/location-repository');

describe('Create Location Interactor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('given a call to save an offer', () => {
    describe('when payload is not valid', () => {
      const payload = {
        address: 'street 01',
        non_valid_parameter: 'some value',
      };
      it('should throw a bad request error', () => {
        try {
          CreateLocationInteractor.call(payload);
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestError);
        }
      });
    });

    describe('when payload is valid', () => {
      const payload = {
        address: 'street 01',
        brand_id: 'brand_01',
      };
      beforeEach(() => {
        LocationRepository.save
          .mockReturnValue({
          });
      });

      it('should call the put function to dynamodb with the item', () => {
        CreateLocationInteractor.call(payload);
        expect(LocationRepository.save).toHaveBeenCalledTimes(1);
        expect(LocationRepository.save).toHaveBeenCalledWith(
          expect.objectContaining({
            address: 'street 01',
            brandId: 'brand_01',
            hasOffer: false,
          }),
        );
      });
    });
  });
});
