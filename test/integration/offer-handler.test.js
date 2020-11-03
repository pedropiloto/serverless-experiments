const request = require('supertest');
const dynamodbHelper = require('../../utils/dynamodb-helper');

describe('Offer Handler', () => {
  const initialOfferId = '01';
  const initialLocationId = '01';
  const server = request(process.env.SERVER_URL);

  before((done) => {
    const items = [
      {
        table: process.env.DYNAMODB_TABLE,
        items: [
          {
            PK: `OFFER#${initialOfferId}`,
            SK: `OFFER#${initialOfferId}`,
            Name: 'new_offer',
            TotalLocations: 0,
            BrandId: 'brand_01',
          },
          {
            PK: `LOCATION#${initialLocationId}`,
            SK: `LOCATION#${initialLocationId}`,
            Address: 'Street 01',
            BrandId: 'brand_01',
          },
        ],
      },
    ];
    dynamodbHelper.setData(items, done);
  });

  context('when creating a new offer', () => {
    const path = '/offer';
    context('when making a request invalid parameters', () => {
      it('it return 400 error http error code', (done) => {
        server.post(path)
          .send({})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400, { message: 'Invalid Parameters' })
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });

    context('when making a request with valid parameters', () => {
      it('returns 201 http code', (done) => {
        server.post(path)
          .send({
            name: 'offer_name',
            brand_id: 'brand_01',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201, {})
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });
  });

  context('when linking a location to an offer', () => {
    const path = `/offer/${initialOfferId}/location/${initialLocationId}`;
    context('when making a request with valid parameters', () => {
      it('returns 201 http code', (done) => {
        server.post(path)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201, {})
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });
  });
});
