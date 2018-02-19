import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Grid, Row, PageHeader} from 'react-bootstrap'

import SearchItem from './SearchItem'

class SearchList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var {list} = this.props
    return (
      <div>
        {list.map( (item, index) => {
          return <SearchItem key = {index} item = {item}/>
        })}
      </div>
    )
  }
}

const mapStateToProps = ({list}) => {
  return {list};
}
export default connect(mapStateToProps)(SearchList)
