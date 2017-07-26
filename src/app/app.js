import React, { Component } from 'react'
import { loadDemo } from './action-creators/DemoActionCreators'
import { connect } from 'react-redux'


class App extends Component {
  constructor(props) {
    super(props)
  }

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
        <h1>Hello there</h1>
        { this.props.child }
      </div>
    );
  }
}



const mapStateToProps = state => ({
  demo: state.demo.demo
})


const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
