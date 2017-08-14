import React, { Component } from 'react'

export default class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    const searchTerm = event.target.value.trim().replace(/ +(?= )/g,'')
    this.setState({ searchTerm: searchTerm }, () => {
      this.props.onSearch(this.state.searchTerm)
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.onSearch(this.state.searchTerm)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="search" autoComplete="off" onChange={this.handleInputChange} />
        <input type="submit" value="Search" />
      </form>
    )
  }
}
