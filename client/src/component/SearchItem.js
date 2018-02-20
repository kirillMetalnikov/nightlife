import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Image, Row, Col, ListGroupItem, Badge} from 'react-bootstrap'

import {toogleSubscribe, getBusinesses} from '../actions'
class SearchItem extends Component {

  subscribeHundler(id) {
    return () => this.props.toogleSubscribe(id)
  }

  getB() {
    this.props.getBusinesses('new york')
  }

  render() {
    var {name, image_url, url, id, subscribersCount, reviews, areYouSubsribe} = this.props.item

    return (
      <div style={{marginBottom: 10, borderBottom: "1px solid gray", paddingBottom: 10}}>
        <Row>
          <Col xs={6} sm ={6} md={2} lg={2}>
            <Image src={image_url} rounded width='170px' height='100px' onClick = {this.getB.bind(this)} />
          </Col>
          <Col xs={6} sm ={6} md={10} lg={10}>
            <a href={url} target="_blank">
              <h4 style={{display: "inline-block", marginRight: 5}}>{name}</h4>
            </a>
            <Badge bsClass = {"badge " + (subscribersCount ? "subscribes ": "") + (areYouSubsribe ? "your_subscribe " : "")} onClick = {this.subscribeHundler(id).bind(this)}>
              {subscribersCount}
            </Badge>
          </Col>
          <p>{reviews}</p>
        </Row>
      </div>
    )
  }
}

export default connect(null, {toogleSubscribe, getBusinesses})(SearchItem)
