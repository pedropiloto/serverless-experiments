const LocationRepository = require('../../../repositories/location-repository');
const OfferRepository = require('../../../repositories/offer-repository');
const LinkLocationToOfferInteractor = require('../../../interactors/link-location-to-offer-interactor');

const BadRequestError = require('../../../errors/bad-request-error');

jest.mock('../../../repositories/offer-repository');
jest.mock('../../../repositories/location-repository');

describe('Link Location To Offer Interactor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('given a call to create a location', () => {
    describe('when the payload is not valid', () => {
      const payload = {
        address: 'street 01',
      };
      it('should throw a bad request error', () => {
        try {
          LinkLocationToOfferInteractor.call(payload);
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestError);
        }
      });
    });

    describe('when the payload is valid', () => {
      const payload = {
        location_id: 'location_id',
        offer_id: 'offer_id',
      };
      beforeEach(() => {
        LocationRepository.linkToOffer.mockReturnValue({});
        LocationRepository.updateHasOffer.mockReturnValue({});
        OfferRepository.incrementOffer.mockReturnValue({});
      });

      it('should request location repository to store the linking', () => {
        LinkLocationToOfferInteractor.call(payload);
        expect(LocationRepository.linkToOffer).toHaveBeenCalledTimes(1);
        expect(LocationRepository.linkToOffer).toHaveBeenCalledWith(
          'location_id',
          'offer_id',
        );
      });

      it('should request repository to increment locations number in offer entity', () => {
        const promises = LinkLocationToOfferInteractor.call(payload);
        promises.then(() => {
          expect(OfferRepository.incrementOffer).toHaveBeenCalledTimes(1);
          expect(OfferRepository.incrementOffer).toHaveBeenCalledWith(
            'offer_id',
          );
        });
      });

      it('should request repository to update has offer location entity', () => {
        const promises = LinkLocationToOfferInteractor.call(payload);
        promises.then(() => {
          expect(LocationRepository.updateHasOffer).toHaveBeenCalledTimes(1);
          expect(LocationRepository.updateHasOffers).toHaveBeenCalledWith(
            'location_id', true,
          );
        });
      });
    });
  });
});
