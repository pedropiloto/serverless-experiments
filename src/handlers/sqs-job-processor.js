const BulkLinkProcessInteractor = require('../interactors/bulk-link-process-interactor');

exports.handler = async (event) => {
  console.info('event body:', event);
  await BulkLinkProcessInteractor.call(JSON.parse(event.Records[0].body));
  return {};
};
