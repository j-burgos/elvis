import React, { Component } from 'react'

import './Product.css'

export default class Product extends Component {
  render () {
    const { name, price, stock } = this.props
    return (
      <div className='product'>
        <div className='name'>{ name }</div>
        <div className='price'>{ price }</div>
        <div>{ stock }</div>
      </div>
    )
  }
}
