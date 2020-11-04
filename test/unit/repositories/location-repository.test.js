const Location = require('../../../src/models/location');
const dynamodbHelper = require('../../../src/utils/dynamodb-helper');
const myModule = require('../../../src/repositories/location-repository');

jest.mock('../../../src/utils/dynamodb-helper');

describe('Location Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('given a call to save a location', () => {
    const dynamodbClientPutFunction = jest.fn().mockReturnValue({ promise: () => {} });
    beforeEach(() => {
      dynamodbHelper.dynamodbClient.mockReturnValue({
        put: dynamodbClientPutFunction,
      });
    });

    it('should call the put function to dynamodb with the item', () => {
      myModule.save(new Location({
        id: 'location_id',
        hasOffer: false,
        address: 'street 01',
        brandId: 'brand_01',
      }));
      expect(dynamodbClientPutFunction).toHaveBeenCalledTimes(1);
      expect(dynamodbClientPutFunction).toHaveBeenCalledWith({
        Item: {
          PK: 'LOCATION#location_id',
          SK: 'LOCATION#location_id',
          HasOffer: false,
          Address: 'street 01',
          BrandId: 'brand_01',
        },
        TableName: undefined,
      });
    });
  });

  describe('given a call to update HasOffer field', () => {
    const dynamodbClientUpdateFunction = jest.fn().mockReturnValue({ promise: () => {} });
    beforeEach(() => {
      dynamodbHelper.dynamodbClient.mockReturnValue({
        update: dynamodbClientUpdateFunction,
      });
    });

    it('should call the put function to dynamodb with the item', () => {
      myModule.updateHasOffer('location_id', true);
      expect(dynamodbClientUpdateFunction).toHaveBeenCalledTimes(1);
      expect(dynamodbClientUpdateFunction).toHaveBeenCalledWith({
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          PK: 'LOCATION#location_id',
          SK: 'LOCATION#location_id',
        },
        UpdateExpression: 'SET HasOffer = :HasOffer',
        ExpressionAttributeValues: {
          ':HasOffer': true,
        },
      });
    });
  });

  describe('given a call to link a location to an offer', () => {
    const dynamodbClientPutFunction = jest.fn().mockReturnValue({ promise: () => {} });
    beforeEach(() => {
      dynamodbHelper.dynamodbClient.mockReturnValue({
        put: dynamodbClientPutFunction,
      });
    });

    it('should call the put function to dynamodb with the item', () => {
      myModule.linkToOffer('location_id', 'offer_id');
      expect(dynamodbClientPutFunction).toHaveBeenCalledTimes(1);
      expect(dynamodbClientPutFunction).toHaveBeenCalledWith({
        Item: {
          PK: 'LOCATION#location_id',
          SK: 'OFFER#offer_id',
        },
        TableName: undefined,
      });
    });
  });
});
