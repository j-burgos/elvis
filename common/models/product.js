'use strict';

const methods =  [
  'prototype.__get__orders',
  'prototype.__count__orders',
  'prototype.__create__orders',
  'prototype.__findById__orders',
  'prototype.__delete__orders',
  'prototype.__destroyById__orders',
  'prototype.__updateById__orders',
  'prototype.__unlink__orders',
  'prototype.__link__orders',
  'prototype.__exists__orders',

  'prototype.__get__likes',
  'prototype.__create__likes',
  'prototype.__findById__likes',
  'prototype.__delete__likes',
  'prototype.__destroyById__likes',
  'prototype.__updateById__likes',
  'prototype.__exists__likes'
]

module.exports = function(Product) {

  methods.map(methodName => Product.disableRemoteMethodByName(methodName))

  Product.prototype.buy = async function (options, quantity) {

    const product = this;
    const app = Product.app

    const User = app.models.user;
    const Inventory = app.models.Inventory;

    const trxIsolationOpts = {isolationLevel: Product.Transaction.READ_COMMITTED}
    const trx = await Product.beginTransaction(trxIsolationOpts)
    const trxOpts = {transaction: trx, timeout: 30 * 1000}

    try {
      const userId = options && options.accessToken && options.accessToken.userId
      const user = await User.findById(userId)
      if (!user) throw new Error('User not authorized')

      const currentProduct = await Product.findById(product.id)
      if (!currentProduct) throw new Error('Product not available')

      const currentStock = currentProduct.stock
      if (currentStock < quantity) throw new Error('Not enough stock')

      const order = {
        userId: user.id,
        productId: currentProduct.id,
        price: currentProduct.price,
        quantity: quantity,
        transactionType: 'buy'
      }

      const createdOrder = await Inventory.create(order, trxOpts)
      const updatedProduct = {
        id: product.id,
        stock: currentStock - quantity,
      }
      await Product.upsert(updatedProduct)
      trx.commit()
      return createdOrder
    } catch (err) {
      trx.rollback()
      throw err
    }
  }

  Product.remoteMethod(
    'prototype.buy',
    {
      accepts: [
        {arg: 'options', type: 'object', http: 'optionsFromRequest'},
        {arg: 'quantity', type: 'number', required: true, http: { source: 'body' }}
      ],
      returns: { 'arg': 'data', type: 'Inventory', root: true},
      http: {path:'/buy', verb: 'post'},
      description: 'Creates an order for a customer'
    }
  );
};
