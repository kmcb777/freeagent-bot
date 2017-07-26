import { handleApiError } from '../utils/api'
import DemoApi from '../api-calls/demo'
import { receiveDemo } from '../actions/demo'

export const loadDemo = (dispatch, callback) => {
  DemoApi.loadDemo(null, (err, demo) => {
    if (err) return handleApiError(err, callback)

    dispatch(receiveDemo(demo))
  })
}
