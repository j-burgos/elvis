'use strict';

module.exports = function(Inventory) {
  const validOptions = ['addStock', 'removeStock', 'buy', 'noop']
  Inventory.validatesInclusionOf('transactionType', {in: validOptions});
};
