const { dynamodbClient } = require('../utils/dynamodb-helper');

const convertOfferToItem = (offer) => ({
  PK: `OFFER#${offer.id}`,
  SK: `OFFER#${offer.id}`,
  Name: offer.name,
  TotalLocations: offer.totalLocations,
  BrandId: offer.brandId,
});

const save = (offer) => dynamodbClient().put({
  TableName: process.env.DYNAMODB_TABLE,
  Item: convertOfferToItem(offer),
}).promise();

const incrementOffer = (offerId) => dynamodbClient().update({
  TableName: process.env.DYNAMODB_TABLE,
  Key: {
    PK: `OFFER#${offerId}`,
    SK: `OFFER#${offerId}`,
  },
  UpdateExpression: 'ADD TotalLocations :inc',
  ExpressionAttributeValues: {
    ':inc': 1,
  },
}).promise();

module.exports = { save, incrementOffer };
