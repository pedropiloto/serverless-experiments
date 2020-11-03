const request = require('supertest');

describe('Offer Handler', () => {
  const server = request(process.env.SERVER_URL);

  context('given a request to create a new location', () => {
    const path = '/location';
    context('when the request has invalid parameters', () => {
      it('it return 400 error http error code', (done) => {
        server.post(path)
          .send({})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400, { message: 'Invalid Parameters' })
          .end((err) => {
            if (err) return done(err);
            done();
          });
      });
    });

    context('when the request is valid', () => {
      it('returns 201 http code', (done) => {
        server.post(path)
          .send({
            address: 'street 01',
            brand_id: 'brand_01',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201, {})
          .end((err) => {
            if (err) return done(err);
            done();
          });
      });
    });
  });
});
