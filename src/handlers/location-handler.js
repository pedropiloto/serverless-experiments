const { handleAPIError } = require('../utils/handle-error');
const CreateLocationInteractor = require('../interactors/create-location-interactor');

module.exports.create = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    const offer = await CreateLocationInteractor.call(payload);
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
