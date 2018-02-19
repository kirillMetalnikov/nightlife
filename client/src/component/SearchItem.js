import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Image, Row, Col, ListGroupItem} from 'react-bootstrap'

class SearchItem extends Component {
  render() {
    var {name, image_url, url, id, subscribersCount} = this.props.item

    return (
      <div style={{marginBottom: 10}}>
        <Row>
          <Col xs={6} sm ={6} md={2} lg={2}>
            <Image src={image_url} rounded width='170px' height='100px'/>
          </Col>
          <Col xs={6} sm ={6} md={10} lg={10}>
            <a href={url}  target="_blank"><h4>{name}</h4></a>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SearchItem
