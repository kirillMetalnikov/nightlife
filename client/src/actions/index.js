import axios from 'axios'


import {GET_SUBSCRIBE, GET_BUSINESSES, MESSAGE, LOADING_STATUS} from '../const'

export const hideModal = () => dispatch => {
  dispatch({type: MESSAGE, data: {show: false}})
}

export const toogleSubscribe = (id) => dispatch => {
  axios.put('/subscribe/' + id).then(res => {
    if (res.data.type == 'error') {
      dispatch({type: MESSAGE, data: {show: true, header: res.data.type, text: res.data.err}})
    }
    if (res.data.type == "need_login") {
      dispatch({type: MESSAGE, data: {show: true, header: 'Login', text: res.data.message}})
    }
    dispatch({type: GET_SUBSCRIBE, data: res.data})

  })
}

export const getBusinesses = (location) => dispatch => {
  dispatch({type: LOADING_STATUS, status: true})
  axios.get('/search/' + location).then(res => {
    if (res.data.type == 'error') {
      dispatch({type: LOADING_STATUS, status: false})
      dispatch({type: MESSAGE, data: {show: true, header: res.data.type, text: res.data.err}})
    } else {
      dispatch({type: LOADING_STATUS, status: false})
      dispatch({type: GET_BUSINESSES, businesses: res.data})
    }
  })
}
