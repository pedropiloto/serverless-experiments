const { handleAPIError } = require('../utils/handle-error');
const CreateOfferInteractor = require('../interactors/create-offer-interactor');
const LinkLocationToOfferInteractor = require('../interactors/link-location-to-offer-interactor');
const BulkLinkInitInteractor = require('../interactors/bulk-link-init-interactor');

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

module.exports.bulk_link_init = async (event, context) => {
  try {
    const job = await BulkLinkInitInteractor.call(
      { brand_id: event.pathParameters.brand_id, offer_id: event.pathParameters.offer_id, account_id: context ? context.invokedFunctionArn.split(':')[4] : '' },
    );
    return {
      statusCode: 201,
      body: JSON.stringify(job,
        null,
        2),
    };
  } catch (e) {
    return handleAPIError(e);
  }
};
