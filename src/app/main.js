import App from './app';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const appRender = Component => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

appRender(App);

if (module.hot) {
  module.hot.accept('./app', () => appRender(App));
}
