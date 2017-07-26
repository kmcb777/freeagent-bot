import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  setTestText,
  resetTestText
} from '../actions/ui'

class Test extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { text } = this.props

    return (
      <div>
        <button onClick={ this.props.setText }>Set</button>
        <button onClick={ this.props.resetText }>Reset</button>
        { text }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  text: state.ui.text
})


const mapDispatchToProps = (dispatch, ownProps) => ({
  setText: _ => dispatch(setTestText('Test')),
  resetText: _ => dispatch(resetTestText()),
  dispatch
})


export default connect(mapStateToProps, mapDispatchToProps)(Test)
