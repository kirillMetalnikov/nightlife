import axios from 'axios'

import {GET_SUBSCRIBE, GET_BUSINESSES, MESSAGE} from '../const'

export const hideModal = () => dispatch => {
  dispatch({type: MESSAGE, data: {show: false}})
}

export const toogleSubscribe = (id) => dispatch => {
  axios.put('/subscribe/' + id).then(res => {
    if (res.data.type == 'error') {
      dispatch({type: MESSAGE, data: {show: true, header: res.data.type, text: res.data.err}})
    } else {
      dispatch({type: GET_SUBSCRIBE, data: res.data})
    }
  })
}

export const getBusinesses = (location) => dispatch => {
  axios.get('/search/' + location).then(res => {
    if (res.data.type == 'error') {
      dispatch({type: MESSAGE, data: {show: true, header: res.data.type, text: res.data.err}})
    } else {
      dispatch({type: GET_BUSINESSES, businesses: res.data})
    }
  })
}
