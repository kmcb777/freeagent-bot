import {
  SET_TEST_TEXT,
  RESET_TEST_TEXT
} from './index'

export const setTestText = (text) => ({
  type: SET_TEST_TEXT,
  text
})

export const resetTestText = _ => ({
  type: RESET_TEST_TEXT
})
