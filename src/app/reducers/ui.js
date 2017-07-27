const initialState = {
  text: null
}

const ui = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TEST_TEXT':
      return {
        text: action.text
      }
    case 'RESET_TEST_TEXT':
      return initialState
    default:
      return state
  }
}

export default ui
