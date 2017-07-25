import { Component } from 'react';
import { render } from 'react-dom';

class Test extends Component {
  render() {
    return (
      <h1>Hello World 1</h1>
    )
  }
}

render(<Test />, document.getElementById('app'));
