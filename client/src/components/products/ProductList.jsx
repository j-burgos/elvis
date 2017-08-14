import React, { Component } from 'react'

import Product from './Product'

export default class ProductList extends Component {
  render () {
    const { products } = this.props
    return (
      <ul className='products'>
        { products.map((product, index) =>
            <Product key={index}
              name={product.name}
              stock={product.stock}
              price={product.price} />
          )
        }
      </ul>
    )
  }
}
