import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Grid, Row, PageHeader} from 'react-bootstrap'

import SearchForm from './SearchForm'
import SearchList from './SearchList'

class App extends Component {
render() {
    return (
      <Grid>
        <PageHeader>
          Plans Tonight? <br/>
          <small>See which bars are hoppin tonight and RSVP ahead of time!</small>
        </PageHeader>
        <SearchForm/>
        <SearchList/>
      </Grid>
    )
  }
}

export default connect(null, null)(App)
