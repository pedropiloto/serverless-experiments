const OfferRepository = require('../../../repositories/offer-repository');
const CreateOfferInteractor = require('../../../interactors/create-offer-interactor');
const BadRequestError = require('../../../errors/bad-request-error');

jest.mock('../../../repositories/offer-repository');

describe('Create Offer Interactor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('given a call to save an offer', () => {
    describe('when payload is not valid', () => {
      const payload = {
        name: 'offer_name',
        non_valid_parameter: 'some value',
      };
      it('should throw a bad request error', () => {
        try {
          CreateOfferInteractor.call(payload);
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestError);
        }
      });
    });

    describe('when payload is valid', () => {
      const payload = {
        name: 'offer_name',
        brand_id: 'brand_01',
      };
      beforeEach(() => {
        OfferRepository.save
          .mockReturnValue({
          });
      });

      it('should call the put function to dynamodb with the item', () => {
        CreateOfferInteractor.call(payload);
        expect(OfferRepository.save).toHaveBeenCalledTimes(1);
        expect(OfferRepository.save).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'offer_name',
            brandId: 'brand_01',
            totalLocations: 0,
          }),
        );
      });
    });
  });
});
