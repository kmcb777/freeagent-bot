import React, { Component } from 'react'
import { loadDemo } from './action-creators/DemoActionCreators'
import { connect } from 'react-redux'


class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(loadDemo())
  }

  renderMenuBar() {
    const { menuItems } = this.props

    if (!menuItems || !menuItems.length) return null

    return menuItems.map(item => (
      <div className="menu-item">
        item.label
      </div>
    ))
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
  menuItems: state.demo.demo
})


const mapDispatchToProps = (dispatch, ownProps) => ({

  dispatch
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
