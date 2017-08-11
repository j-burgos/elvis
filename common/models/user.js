'use strict';

const methods = [
  'prototype.__get__accessTokens',
  'prototype.__count__accessTokens',
  'prototype.__create__accessTokens',
  'prototype.__findById__accessTokens',
  'prototype.__delete__accessTokens',
  'prototype.__destroyById__accessTokens',
  'prototype.__updateById__accessTokens',

  'prototype.__get__purchases',
  'prototype.__count__purchases',
  'prototype.__create__purchases',
  'prototype.__findById__purchases',
  'prototype.__delete__purchases',
  'prototype.__destroyById__purchases',
  'prototype.__updateById__purchases',
  'prototype.__unlink__purchases',
  'prototype.__link__purchases',
  'prototype.__exists__purchases'
]

module.exports = function(User) {
  methods.map(methodName => User.disableRemoteMethodByName(methodName))
};
