import React, { Component } from 'react'

import './Product.css'

export default class Product extends Component {
  render () {
    const { className, name, price, stock } = this.props
    const cn = className ? `${className} product` : 'product'
    return (
      <div className={cn}>
        <div className='name'>{ name }</div>
        <div className='price'>{ price }</div>
        <div className='stock'>{ stock }</div>
      </div>
    )
  }
}
