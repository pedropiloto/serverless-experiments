const Offer = require('../../../src/models/offer');
const dynamodbHelper = require('../../../src/utils/dynamodb-helper');
const myModule = require('../../../src/repositories/offer-repository');

jest.mock('../../../src/utils/dynamodb-helper');

describe('Offer Repository', () => {
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
      myModule.save(new Offer({
        id: 'offer_id',
        name: 'offer_name',
        toalLocations: 0,
        brandId: 'brand_01',
      }));
      expect(dynamodbClientPutFunction).toHaveBeenCalledTimes(1);
      expect(dynamodbClientPutFunction).toHaveBeenCalledWith({
        Item: {
          PK: 'OFFER#offer_id',
          SK: 'OFFER#offer_id',
          Name: 'offer_name',
          TotalLocations: 0,
          BrandId: 'brand_01',
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
      myModule.incrementOffer('offer_id');
      expect(dynamodbClientUpdateFunction).toHaveBeenCalledTimes(1);
      expect(dynamodbClientUpdateFunction).toHaveBeenCalledWith({
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          PK: 'OFFER#offer_id',
          SK: 'OFFER#offer_id',
        },
        UpdateExpression: 'ADD TotalLocations :inc',
        ExpressionAttributeValues: {
          ':inc': 1,
        },
      });
    });
  });
});
