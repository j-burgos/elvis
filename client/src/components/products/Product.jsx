import React, { Component } from 'react'

export default class Product extends Component {
  render () {
    const { name, price, stock } = this.props
    return (
      <div className='product'>
        <div>{ name }</div>
        <div>{ price }</div>
        <div>{ stock }</div>
      </div>
    )
  }
}
