'use strict';

module.exports = function(user) {
  user.disableRemoteMethodByName('createChangeStream');
  user.disableRemoteMethodByName('replaceOrCreate');
  user.disableRemoteMethodByName('replaceById');
  user.disableRemoteMethodByName('findOne');
  user.disableRemoteMethodByName('upsert');
  user.disableRemoteMethodByName('updateAll');
  user.disableRemoteMethodByName('upsertWithWhere');

  user.disableRemoteMethodByName('prototype.__count__accessTokens');
  user.disableRemoteMethodByName('prototype.__create__accessTokens');
  user.disableRemoteMethodByName('prototype.__delete__accessTokens');
  user.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
  user.disableRemoteMethodByName('prototype.__findById__accessTokens');
  user.disableRemoteMethodByName('prototype.__get__accessTokens');
  user.disableRemoteMethodByName('prototype.__updateById__accessTokens');
};
