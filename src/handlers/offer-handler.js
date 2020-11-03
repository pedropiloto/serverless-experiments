const { handleAPIError } = require('../utils/handle-error');
const CreateOfferInteractor = require('../interactors/create-offer-interactor');
const LinkLocationToOfferInteractor = require('../interactors/link-location-to-offer-interactor');

module.exports.create = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    const offer = await CreateOfferInteractor.call(payload);
    return {
      statusCode: 201,
      body: JSON.stringify(offer,
        null,
        2),
    };
  } catch (e) {
    return handleAPIError(e);
  }
};

module.exports.link = async (event) => {
  try {
    await LinkLocationToOfferInteractor.call(
      { location_id: event.pathParameters.location_id, offer_id: event.pathParameters.offer_id },
    );
    return {
      statusCode: 201,
      body: JSON.stringify({},
        null,
        2),
    };
  } catch (e) {
    return handleAPIError(e);
  }
};
