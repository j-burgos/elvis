'use strict';

const methods = [
  'prototype.__get__accessTokens',
  'prototype.__count__accessTokens',
  'prototype.__create__accessTokens',
  'prototype.__findById__accessTokens',
  'prototype.__delete__accessTokens',
  'prototype.__destroyById__accessTokens',
  'prototype.__updateById__accessTokens',
  'prototype.__get__orders',
  'prototype.__count__orders',
  'prototype.__create__orders',
  'prototype.__findById__orders',
  'prototype.__delete__orders',
  'prototype.__destroyById__orders',
  'prototype.__updateById__orders',
  'prototype.__unlink__orders',
  'prototype.__link__orders',
  'prototype.__exists__orders'
]

module.exports = function(User) {
  methods.map(methodName => User.disableRemoteMethodByName(methodName))
};
