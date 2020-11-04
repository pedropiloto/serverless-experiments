const CreateOfferInteractor = require('../../../src/interactors/create-offer-interactor');
const LinkLocationToOfferInteractor = require('../../../src/interactors/link-location-to-offer-interactor');
const BulkLinkInitInteractor = require('../../../src/interactors/bulk-link-init-interactor');
const OfferHandler = require('../../../src/handlers/offer-handler');
const BadRequestError = require('../../../src/errors/bad-request-error');
const { handleAPIError } = require('../../../src/utils/handle-error');

jest.mock('../../../src/interactors/bulk-link-init-interactor');
jest.mock('../../../src/interactors/create-offer-interactor');
jest.mock('../../../src/interactors/link-location-to-offer-interactor');
jest.mock('../../../src/utils/handle-error');

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

      it('should call handle api error', async () => {
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

      it('should call handle api error', async () => {
        await OfferHandler.link(event);
        expect(handleAPIError).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('given a request to init a bulk link', () => {
    const event = {
      pathParameters: {
        brand_id: 'brand_01',
        offer_id: 'offer_id',
      },
    };

    it('should call the interactor with the payload received', async () => {
      await OfferHandler.bulk_link_init(event);
      expect(BulkLinkInitInteractor.call).toHaveBeenCalledTimes(1);
      expect(BulkLinkInitInteractor.call).toHaveBeenCalledWith(expect.objectContaining(
        {
          brand_id: 'brand_01',
          offer_id: 'offer_id',
        },
      ));
    });

    describe('when it succeeds to create the bulk jobr', () => {
      const interactorResponse = {};
      beforeEach(() => {
        BulkLinkInitInteractor
          .call
          .mockImplementation(() => interactorResponse);
      });

      it('should return a successful response', async () => {
        const response = await OfferHandler.bulk_link_init(event);
        expect(response).toEqual({
          statusCode: 201,
          body: JSON.stringify(interactorResponse,
            null,
            2),
        });
      });
    });

    describe('when it does not succeed to create the bulk job', () => {
      beforeEach(() => {
        BulkLinkInitInteractor
          .call
          .mockImplementation(() => { throw new BadRequestError('Invalid Parameters'); });
      });

      it('should call handle api error', async () => {
        await OfferHandler.bulk_link_init(event);
        expect(handleAPIError).toHaveBeenCalledTimes(1);
      });
    });
  });
});
