## Solution

The solution was implemented, as suggested, using teh serverless Framework.

### Part I and Part II

![DynamoDB Modelling part I and part II](https://raw.githubusercontent.com/FidelLimited/be-techtest-pedropiloto/master/documentation/model.png?token=ADAT4OQFQA76QTSOCJZ4BYS7WUQOQ)

#### DynamoDB Model

The model designed for dynamoDB:

Some considerations:

- The primary key of this table is: { primary key: PK, sort key: SK }. This will allow to dispose the info in this table in a kind of tabstract way, so we can store multiple types of elements in it and query it by the sort key.
- One Inverted global secondary index of the primary key that will allow to access information by the SK field
- Another Global secondary index on BrandId field, this will allow to access info based on this info and also work as a sparse index, since this index will only include the items will the field filled

#### Endpoints:
- POST /offer
- POST /location
- POST /offer/<offer_id>/location/<location_id>

### Part III

This part was not totally completed, since the core functionality was not implemented, only the mechanism of creating and processing asynchronous jobs so the client does not have to wait synchronously for the response.

![Part II Sequence Diagram](https://raw.githubusercontent.com/FidelLimited/be-techtest-pedropiloto/master/documentation/part_3_sd.png?token=ADAT4OSRUTIESTPOMMOWPV27WUQPQ)

#### Endpoints
- POST /offer/<offer_id>/actions/bulk_link/brand/<brand_id>

### Local Setup

Install dependencies:
```sh
$ npm install
```

Install serverless:
```sh
$ npm i -g serverless
```

Install serverless dynamodb:
```sh
$ serverless dynamodb install
```

**Unit Tests:**
```sh
$ npm run unit-test
```

**Integration Tests:**
```sh
$ npm run integration-test
```

**RUN:**
```sh
$ npm start
```

Note: Part III cannot be locally executed because of the "missing dependency" of SQS in the local environment. But all the rest is fully functional locally

### Deploy
```sh
$ sls deploy -v --stage <stage>
```





