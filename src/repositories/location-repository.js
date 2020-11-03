const { dynamodbClient } = require('../utils/dynamodb-helper');

const convertLocationToItem = (location) => ({
  PK: `LOCATION#${location.id}`,
  SK: `LOCATION#${location.id}`,
  Address: location.address,
  HasOffer: location.hasOffer,
  BrandId: location.brandId,
});

const save = (location) => dynamodbClient().put({
  TableName: process.env.DYNAMODB_TABLE,
  Item: convertLocationToItem(location),
}).promise();

const updateHasOffer = (locationId, hasOffer) => dynamodbClient().update({
  TableName: process.env.DYNAMODB_TABLE,
  Key: {
    PK: `LOCATION#${locationId}`,
    SK: `LOCATION#${locationId}`,
  },
  UpdateExpression: 'SET HasOffer = :HasOffer',
  ExpressionAttributeValues: {
    ':HasOffer': hasOffer,
  },
}).promise();

const linkToOffer = (locationId, offerId) => dynamodbClient().put({
  TableName: process.env.DYNAMODB_TABLE,
  Item: {
    PK: `LOCATION#${locationId}`,
    SK: `OFFER#${offerId}`,
  },
}).promise();

module.exports = {
  save, linkToOffer, updateHasOffer,
};
