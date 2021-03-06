import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Route, Router, browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'

import reducers from './reducers/index'
import App from './App'
import Test from './components/Test'

const appDomEl = document.getElementById('app')

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
/* eslint-enable */

const history = syncHistoryWithStore(browserHistory, store)

if (appDomEl) {
  const Root = () => (
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <Route path="/test" components={{ child: Test }} />
          </Route>
        </Router>
      </Provider>
    </AppContainer>
  )

  ReactDOM.render(
    <Root store={store} />,
    appDomEl
  )
}

if (module.hot) {
  module.hot.accept('./app', () => appRender(App))
}
