import React, { Component } from 'react'

import Product from './Product'

export default class ProductList extends Component {
  render () {
    const { products } = this.props
    return (
      <div className='products'>
        <Product className='head'
          name='Product'
          stock='Stock'
          price='Price'/>
        { products.map((product, index) =>
            <Product key={index}
              name={product.name}
              stock={product.stock}
              price={'$' + product.price} />
          )
        }
      </div>
    )
  }
}
