const CreateOfferInteractor = require('../../../interactors/create-offer-interactor');
const LinkLocationToOfferInteractor = require('../../../interactors/link-location-to-offer-interactor');

const OfferHandler = require('../../../handlers/offer-handler');
const BadRequestError = require('../../../errors/bad-request-error');
const { handleAPIError } = require('../../../utils/handle-error');

jest.mock('../../../interactors/create-offer-interactor');
jest.mock('../../../interactors/link-location-to-offer-interactor');
jest.mock('../../../utils/handle-error');

describe('Offer Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('given a request to create an offer', () => {
    const event = {
      body: JSON.stringify({
        name: 'offer_name',
        brand_id: 'brand_01',
      }),
    };

    it('should call the interactor with the payload received', () => {
      OfferHandler.create(event);
      expect(CreateOfferInteractor.call).toHaveBeenCalledTimes(1);
      expect(CreateOfferInteractor.call).toHaveBeenCalledWith(
        {
          name: 'offer_name',
          brand_id: 'brand_01',
        },
      );
    });

    describe('when it succeeds to create the offer', () => {
      const interactorResponse = {};
      beforeEach(() => {
        CreateOfferInteractor
          .call
          .mockResolvedValue(interactorResponse);
      });

      it('should return a successful response', async () => {
        const response = await OfferHandler.create(event);
        expect(response).toEqual({
          statusCode: 201,
          body: JSON.stringify(interactorResponse,
            null,
            2),
        });
      });
    });
    describe('when it does not succeed to create the offer', () => {
      beforeEach(() => {
        CreateOfferInteractor
          .call
          .mockImplementation(() => { throw new BadRequestError('Invalid Parameters'); });
      });

      it('should return a successful response', async () => {
        await OfferHandler.create(event);
        expect(handleAPIError).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('given a request to link a location to an offer', () => {
    const event = {
      pathParameters: {
        location_id: 'location_id',
        offer_id: 'offer_id',
      },
    };

    it('should call the interactor with the payload received', () => {
      OfferHandler.link(event);
      expect(LinkLocationToOfferInteractor.call).toHaveBeenCalledTimes(1);
      expect(LinkLocationToOfferInteractor.call).toHaveBeenCalledWith(
        {
          location_id: 'location_id',
          offer_id: 'offer_id',
        },
      );
    });

    describe('when it succeeds to create the offer', () => {
      const interactorResponse = {};
      beforeEach(() => {
        LinkLocationToOfferInteractor
          .call
          .mockResolvedValue(interactorResponse);
      });

      it('should return a successful response', async () => {
        const response = await OfferHandler.link(event);
        expect(response).toEqual({
          statusCode: 201,
          body: JSON.stringify(interactorResponse,
            null,
            2),
        });
      });
    });
    describe('when it does not succeed to create the offer', () => {
      beforeEach(() => {
        LinkLocationToOfferInteractor
          .call
          .mockImplementation(() => { throw new BadRequestError('Invalid Parameters'); });
      });

      it('should return a successful response', async () => {
        await OfferHandler.link(event);
        expect(handleAPIError).toHaveBeenCalledTimes(1);
      });
    });
  });
});
