import {combineReducers} from 'redux';

import {GET_BUSINESSES, GET_SUBSCRIBE, GET_FIND, MESSAGE, LOADING_STATUS} from '../const.js';

const list = function(state = [], action) {
  switch (action.type) {
    case GET_BUSINESSES:
      return action.businesses;
    case GET_SUBSCRIBE:
      var {subscribersCount, areYouSubsribe, id} = action.data
      return state.map( b => {
        var newB = Object.assign({}, b)
        newB.subscribersCount = subscribersCount
        newB.areYouSubsribe = areYouSubsribe
        return b.id == id ? newB : b
      })
    default:
      return state;
  }
}

const findsText = function(state = '', action) {
  switch (action.type) {
    case GET_FIND:
      return action.text;
    default:
      return state;
  }
}

const message = function(state ={}, action) {
  switch (action.type) {
    case MESSAGE:
      let {show, header, text} = action.data
      return {show, header, text}
    default:
      return state

  }
}

const statusLoading = function( state = false, action) {
  switch (action.type) {
    case LOADING_STATUS:
      return action.status
    default:
      return state
  }
}

export default combineReducers({
  list, findsText, message, statusLoading
})
