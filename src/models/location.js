const uuid = require('uuid');

class Offer {
  constructor(params) {
    this.id = params.id ? params.id : uuid.v1();
    this.hasOffer = params.hasOffer ? params.hasOffer : false;
    this.address = params.address;
    this.brandId = params.brandId;
  }
}

module.exports = Offer;
