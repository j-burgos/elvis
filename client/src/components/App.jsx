import React, { Component } from 'react'
import axios from 'axios'

import SearchBar from './search/SearchBar'
import SearchError from './search/SearchError'
import SearchLoading from './search/SearchLoading'

import EmptyProductList from './products/EmptyProductList'
import ProductList from './products/ProductList'

import './App.css'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: false,
      products: [],
      valid: false
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  async handleSearch (searchTerm) {
    if (searchTerm && searchTerm.length >= 3) {
      const terms =
        searchTerm
        .split(' ')
        .filter(term => term.length >= 3)
        .map(term => ({name: {ilike: `%${term}%`}}))

      const query = {filter: {where: { or: terms }}}
      try {
        this.setState({ valid: true, loading: true })
        const results = await axios.get('/api/products', { params: query })
        this.setState({ loading: false, products: results.data })
      } catch (err) {
        this.setState({ loading: false, error: true })
      }
    } else {
      this.setState({ valid: false })
    }
  }

  render () {
    const { valid, error, loading, products } = this.state
    const result =
      !valid ? <div>Type a product name</div>
      : loading ? <SearchLoading />
      : error ? <SearchError />
      : products.length > 0 ? <ProductList products={products}/>
      : <EmptyProductList />
    return (
      <div className='screen-container'>
        <div className='screen'>
          <h1 className='app-title'>Elvis-Tek</h1>
          <SearchBar onSearch={this.handleSearch} />
          <div className='results'>
            { result }
          </div>
        </div>
      </div>
    )
  }
}
