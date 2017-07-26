import request from 'superagent'
import ApiRoutes from './api-routes'
import { handleApiResult } from '../utils/api'

export default {
  loadDemo(parentId, callback) {
    const url = ApiRoutes.loadDemo
    request
      .get(url)
      .end((err, res) => handleApiResult(err, res, callback))
  }
}
