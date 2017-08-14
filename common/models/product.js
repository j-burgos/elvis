'use strict';

const methods =  [
  'prototype.__get__purchases',
  'prototype.__count__purchases',
  'prototype.__create__purchases',
  'prototype.__findById__purchases',
  'prototype.__delete__purchases',
  'prototype.__destroyById__purchases',
  'prototype.__updateById__purchases',
  'prototype.__unlink__purchases',
  'prototype.__link__purchases',
  'prototype.__exists__purchases',

  'prototype.__count__prices',
  'prototype.__create__prices',
  'prototype.__findById__prices',
  'prototype.__delete__prices',
  'prototype.__destroyById__prices',
  'prototype.__updateById__prices',
  'prototype.__unlink__prices',
  'prototype.__link__prices',
  'prototype.__exists__prices',

  'prototype.__get__likes',
  'prototype.__create__likes',
  'prototype.__findById__likes',
  'prototype.__delete__likes',
  'prototype.__destroyById__likes',
  'prototype.__updateById__likes',
  'prototype.__exists__likes',
  'prototype.__link__likes',
  'prototype.__unlink__likes'
]

module.exports = function(Product) {

  methods.map(methodName => Product.disableRemoteMethodByName(methodName))

  const stockValidation = function (err) { if (this.stock < 0) err() }
  const priceValidation = function (err) { if (this.price < 0) err() }
  Product.validate('stock', stockValidation, {message: 'Stock cannot be negative'})
  Product.validate('price', priceValidation, {message: 'Price cannot be negative'})

  Product.prototype.update = async function (options, data) {
    const app = Product.app
    const User = app.models.user
    const Price = app.models.Price

    const product = this

    const trxIsolationOpts = {isolationLevel: Product.Transaction.READ_COMMITTED}
    const trx = await Product.beginTransaction(trxIsolationOpts)
    const trxOpts = {transaction: trx, timeout: 30 * 1000}

    try {
      const userId = options.accessToken.userId

      if (data.price !== Number(product.price)) {
        const priceUpdate = {
          price: data.price,
          productId: product.id,
          userId: userId,
        }
        console.log('Creating price update from %f to %f', product.price, data.price)
        await Price.upsert(priceUpdate, trxOpts)
      }

      const productUpdate = {
        id: product.id,
        name: data.name,
        stock: data.stock,
        price: data.price
      }
      console.log('Updating product')
      const updatedProduct = await Product.upsert(productUpdate, trxOpts)
      trx.commit()

      return updatedProduct
    } catch (err) {
      trx.rollback()
      throw err
    }
  }

  Product.prototype.purchase = async function (options, data) {
    const app = Product.app
    const User = app.models.user
    const Purchase = app.models.Purchase

    const product = this
    const quantity = data.quantity

    const trxIsolationOpts = {isolationLevel: Product.Transaction.READ_COMMITTED}
    const trx = await Product.beginTransaction(trxIsolationOpts)
    const trxOpts = {transaction: trx, timeout: 30 * 1000}

    try {
      const userId = options.accessToken.userId

      const currentStock = product.stock
      if (currentStock < quantity) {
        const error = new Error();
        error.status = 422
        error.name = 'ValidationError'
        error.message = 'Not enough stock'
        throw error
      }

      const purchase = {
        userId: userId,
        productId: product.id,
        price: product.price,
        quantity: quantity
      }
      const createdPurchase = await Purchase.create(purchase, trxOpts)

      const updatedProduct = {
        id: product.id,
        stock: currentStock - quantity,
      }
      await Product.upsert(updatedProduct, trxOpts)
      trx.commit()

      return createdPurchase
    } catch (err) {
      trx.rollback()
      throw err
    }
  }

  Product.prototype.like = async function (options) {
    const product = this
    const userId = options.accessToken.userId
    await product.likes.add(userId)
    return product
  }

  Product.prototype.dislike = async function (options) {
    const product = this
    const userId = options.accessToken.userId
    await product.likes.remove(userId)
    return product
  }
}
