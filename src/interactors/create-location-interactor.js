const Location = require('../models/location');
const BadRequestError = require('../errors/bad-request-error.js');
const LocationRepository = require('../repositories/location-repository.js');

const checkPayload = (payload) => !!payload.address && !!payload.brand_id;

const call = (payload) => {
  if (!checkPayload(payload)) throw new BadRequestError('Invalid Parameters');

  const location = new Location({
    address: payload.address,
    brandId: payload.brand_id,
  });

  return LocationRepository.save(location);
};

module.exports = { call };
