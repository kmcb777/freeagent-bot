import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  setTestText,
  resetTestText
} from '../actions/ui'

class Test extends Component {
  render() {
    const { text } = this.props

    return (
      <div>
        <button onClick={this.props.setText}>Set</button>
        <button onClick={this.props.resetTex}>Reset</button>
        { text }
      </div>
    )
  }
}

Test.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  resetTex: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
  text: state.ui.text
})


const mapDispatchToProps = dispatch => ({
  setText: () => dispatch(setTestText('Test')),
  resetText: () => dispatch(resetTestText()),
  dispatch
})


export default connect(mapStateToProps, mapDispatchToProps)(Test)
