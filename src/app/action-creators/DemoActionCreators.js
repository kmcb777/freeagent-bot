import { handleApiError } from '../utils/api'
import DemoApi from '../api-calls/demo'
import { receiveDemo } from '../actions/demo'

/* eslint-disable import/prefer-default-export */
export const loadDemo = (dispatch, callback) => {
  DemoApi.loadDemo(null, (err, demo) => {
    if (err) return handleApiError(err, callback)

    return dispatch(receiveDemo(demo))
  })
}
