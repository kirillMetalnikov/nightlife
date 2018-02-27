import React, {Component} from 'react'
import { connect } from 'react-redux'
import {FormGroup, FormControl, InputGroup} from 'react-bootstrap'
import cookie from 'react-cookies'

import {getBusinesses} from '../actions'
import Loading from './Loading'

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {searchInput: ''}
  }
  
  hundleChange(e) {
    this.setState( {searchInput: e.target.value})
  }
  
  search(e) {
    e.preventDefault()
    cookie.save('location', this.state.searchInput, { path: '/' })
    this.props.getBusinesses(this.state.searchInput)
  }
  
  componentDidMount() {
    var location = cookie.load('location')
    if (location) {
      this.setState({searchInput: location})
      this.props.getBusinesses(location)
    }
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.search.bind(this)}>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" onChange = {this.hundleChange.bind(this)} value = {this.state.searchInput} />
              <InputGroup.Addon><button type='submit'>GO</button></InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </form>
        <Loading/>
      </div>
    )
  }
}

export default connect(null, {getBusinesses})(SearchForm)
