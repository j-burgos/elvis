'use strict';

module.exports = function(product) {
  product.disableRemoteMethodByName('createChangeStream');
  product.disableRemoteMethodByName('replaceById');
  product.disableRemoteMethodByName('upsert');
  product.disableRemoteMethodByName('updateAll');
  product.disableRemoteMethodByName('upsertWithWhere');

  product.disableRemoteMethodByName('prototype.__findById__likes');
  product.disableRemoteMethodByName('prototype.__exists__likes');
  product.disableRemoteMethodByName('prototype.__destroyById__likes');
  product.disableRemoteMethodByName('prototype.__findById__likes');
  product.disableRemoteMethodByName('prototype.__updateById__likes');
  product.disableRemoteMethodByName('prototype.__link__likes');
  product.disableRemoteMethodByName('prototype.__unlink__likes');
};
