import {
  RECEIVE_DEMO
} from './index'

/* eslint-disable import/prefer-default-export */
export const receiveDemo = demo => ({
  type: RECEIVE_DEMO,
  demo
})
