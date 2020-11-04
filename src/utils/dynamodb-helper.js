const AWS = require('aws-sdk');

const dynamodbClient = () => {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'local') {
    const region = process.env.LOCAL_AWS_REGION ? process.env.LOCAL_AWS_REGION : 'localhost';
    const endpoint = process.env.LOCAL_DYNAMODB_ENDPOINT ? process.env.LLOCAL_DYNAMODB_ENDPOINT : 'http://localhost:8000';
    console.log('local client', region, endpoint);
    return new AWS.DynamoDB.DocumentClient({ region, endpoint });
  }
  console.log('online client');
  return new AWS.DynamoDB.DocumentClient();
};

// Save set of data
const setData = (dataSet, done) => {
  const buildSetData = { RequestItems: {} };
  dataSet.forEach((data) => {
    buildSetData.RequestItems[data.table] = data.items.map(
      (Item) => ({ PutRequest: { Item } }),
    );
  });
  dynamodbClient().batchWrite(buildSetData, (err) => {
    if (err) return done(err);
    return done();
  });
};
// Remove all data from database names
const emptyTables = (tableNames, done) => {
  const that = this;
  if (tableNames.length === 0) return done();
  const tableName = tableNames[0];
  const reduceTableNames = tableNames.slice(1, tableNames.length);
  const scanParams = {
    TableName: tableName.table,
  };
  return dynamodbClient().scan(scanParams, (err, data) => {
    if (err) return done(err);
    const buildDeleteData = {
      RequestItems: { [scanParams.TableName]: [] },
    };
    data.Items.forEach((obj) => {
      const hashkeys = {};
      tableName.hashKey.forEach(
        (key) => { hashkeys[key] = obj[key]; },
      );
      buildDeleteData.RequestItems[scanParams.TableName].push(
        { DeleteRequest: { Key: hashkeys } },
      );
    });
    return dynamodbClient().batchWrite(buildDeleteData, (error) => {
      if (error) return done(error);
      return that.emptyTables(reduceTableNames, done);
    });
  });
};

module.exports = { dynamodbClient, setData, emptyTables };
