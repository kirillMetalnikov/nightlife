import React, {Component} from 'react'
import {connect} from 'react-redux'

const loadingState = ['.', '..', '...']
class Loading extends Component {
  constructor(props) {
    super(props)
    this.state = {loadingIndex: 2}
  }

  next() {
    var {loadingIndex} = this.state
    loadingIndex++
    if (loadingIndex > 2) loadingIndex = 0
    this.setState({loadingIndex})
  }
  componentDidMount() {
    this.timer = setInterval(this.next.bind(this), 500)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    if (!this.props.statusLoading) return ''
    
    return (
      <div style = { {fontSize: 24, width: '100%'} }>
        <div style = { {margin: "10px auto", width: '10%'}}>Loading{loadingState[this.state.loadingIndex]}</div>
      </div>
    )
  }
}


const mapStateToProps = ({statusLoading}) =>{
  return {statusLoading}
}


export default connect(mapStateToProps)(Loading)