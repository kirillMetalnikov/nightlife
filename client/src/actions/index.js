import axios from 'axios'

import {GET_SUBSCRIBE, GET_BUSINESSES} from '../const'

export const toogleSubscribe = (id) => dispatch => {
  axios.put('/subscribe/' + id).then(res => {
    dispatch({type: GET_SUBSCRIBE, data: res.data})
  })
}

export const getBusinesses = (location) => dispatch => {
  axios.get('/search/chikago').then(res => {
    console.log(res)
    dispatch({type: GET_BUSINESSES, businesses: res.data})
  })
}
