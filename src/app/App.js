import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { loadDemo } from './action-creators/DemoActionCreators'


class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props
    loadDemo(dispatch)
  }

  renderMenuBar() {
    const { demo } = this.props

    if (!demo) return null

    return (
      <div>
        Démo résult: { demo }
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="menu-container">
          <div className="menu">
            { this.renderMenuBar() }
          </div>
        </div>
        <p>Hello there</p>
        { this.props.child }
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  child: PropTypes.object.isRequired,
  demo: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  demo: state.demo.demo
})


const mapDispatchToProps = dispatch => ({
  dispatch
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
