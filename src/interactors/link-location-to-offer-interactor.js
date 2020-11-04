const BadRequestError = require('../errors/bad-request-error.js');
const LocationRepository = require('../repositories/location-repository.js');
const OfferRepository = require('../repositories/offer-repository.js');

const checkPayload = (payload) => !!payload.location_id && !!payload.offer_id;

const call = async (payload) => {
  if (!checkPayload(payload)) throw new BadRequestError('Invalid Parameters');

  await LocationRepository.linkToOffer(payload.location_id, payload.offer_id);
  return Promise.all([
    OfferRepository.incrementOffer(payload.offer_id),
    LocationRepository.updateHasOffer(payload.location_id, true),
  ]);
};

module.exports = { call };
