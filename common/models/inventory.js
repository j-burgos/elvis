'use strict';

module.exports = function(Inventory) {
  Inventory.validatesInclusionOf('type', {in: ['add', 'remove']});
};
