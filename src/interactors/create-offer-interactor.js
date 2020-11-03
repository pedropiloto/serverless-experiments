const Offer = require('../models/offer');
const BadRequestError = require('../errors/bad-request-error.js');
const OfferRepository = require('../repositories/offer-repository.js');

const checkPayload = (payload) => !!payload.name && !!payload.brand_id;

const call = (payload) => {
  if (!checkPayload(payload)) throw new BadRequestError('Invalid Parameters');

  const offer = new Offer({
    name: payload.name,
    brandId: payload.brand_id,
  });

  return OfferRepository.save(offer);
};

module.exports = { call };
