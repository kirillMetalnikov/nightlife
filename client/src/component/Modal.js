import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, Button} from 'react-bootstrap'

import {hideModal} from '../actions'

class Message extends Component {
  constructor(props) {
    super(props)
  }
  
  loginRender() {
    return (
      <div>
          Login with <a href='/auth/github'>github </a>
          or with <a href='/auth/google'>google</a>
      </div>
    )
  }
  
  render () {
    let {header, text, show} = this.props.message
    return (
      <Modal
        show={show}
        onHide={this.props.hideModal}
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">
            {header}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {header == 'Login' ? this.loginRender() :''}
          <br/>
          {text}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({message}) =>{
  return {message}
}

export default connect(mapStateToProps, {hideModal})(Message)
