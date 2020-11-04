const uuid = require('uuid');

class Offer {
  constructor(params) {
    this.id = params.id ? params.id : uuid.v1();
    this.totalLocations = params.totalLocations ? params.totalLocations : 0;
    this.name = params.name;
    this.brandId = params.brandId;
  }
}

module.exports = Offer;
