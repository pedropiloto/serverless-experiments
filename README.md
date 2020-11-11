# Fidel Coding Challenge

## About this challenge

This challenge focuses on RESTful API design and data model. It consists of 2 mandatory parts, plus an optional bonus task.
Even if you don't complete the bonus task, it will be expected that you are able to discuss the task during test review.
Any questions you may have please contact us at backend-review@fidel.uk.

## Context

The test purpose is to create a simplified version of the Offers API platform which allows to connect brands (ex: Starbucks) with offers.
_Example: Add 5% cashback offer to Starbucks Oxford street location_
Feel free to browse our docs to familiarise yourself with our current [commercial offering](https://docs.fidel.uk/offers).
**The solution must be written in Javascript, deployable, testable and use the following tecnhologies:**

- AWS platform,
- Lambda,
- DynamoDB.
  
You should take into consideration high request volume to the API and handle concurrency.
We suggest that you use Serverless Framework and API Gateway.

## Part 1

Create using DynamoDB the following simplified data:

Offers

```
[{
  name: "Super Duper Offer",
  id: "d9b1d9ff-543e-47c7-895f-87f71dcad91b",
  brandId: "692126c8-6e72-4ad7-8a73-25fc2f1f56e4",
  locationsTotal: 0
}]
```

---

Locations

```
[{
  id: "03665f6d-27e2-4e69-aa9b-5b39d03e5f59",
  address: "Address 1",
  brandId: "692126c8-6e72-4ad7-8a73-25fc2f1f56e4"
  hasOffer: false
}, {
  id: "706ef281-e00f-4288-9a84-973aeb29636e",
  address: "Address 2",
  brandId: "692126c8-6e72-4ad7-8a73-25fc2f1f56e4"
  hasOffer: false
}, {
  id: "1c7a27de-4bbd-4d63-a5ec-2eae5a0f1870",
  address: "Address 3",
  brandId: "692126c8-6e72-4ad7-8a73-25fc2f1f56e4"
  hasOffer: false
}]
```

### Questions

1. Did you use DynamoDb before?
   - If no, how did you prepare for this task?
   - If yes, which patterns did you learn in the past that you used here?
2. How did you design your data model?
3. What are the pros and cons of Dynamodb for an API request?

## Part 2

Create a Lambda function with an API endpoint that allows to link a location to an offer. The lambda should also increase the counter in the offer and mark the location with `hasOffer: true`.

### Questions

1. Have you used Functions as a Service (FaaS) like AWS Lambda in the past?
   - If no, how did you prepare for this task?
   - If yes, how did this task compare to what you did?
2. How do you write operations within a concurrent architecture (parallel requests, series of async actions, async mapReduce patterns, etc.)?

## Bonus part

Consider a brand like Starbucks that has more than 10000 locations, create a Lambda function that allows to link all the brand's locations to an offer.

### Questions

Even if you don't have the time to complete this part, it would be great if you could be prepared to answer questions like:

1. What challenges do you foresee/have experienced for this part?
2. How would you handle operations that might take too long to complete (minutes instead of the typical endpoint ms range)?

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





