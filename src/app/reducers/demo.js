const initialState = {
  demo: []
}

const demo = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_DEMO':
      return {
        demo: action.demo
      }
    default:
      return state
  }
}

export default demo
