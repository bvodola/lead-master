import React from 'react';
import { withRouter } from 'react-router-dom';

class KeyLogger extends React.Component {
  componentDidMount() {
    document.onkeypress = (ev) => {

      if(document.activeElement.nodeName !== 'INPUT') {
        switch(ev.keyCode) {
          case(97):
            this.props.history.push('/');
            break;
          case(99):
            this.props.history.push('/clients');
            break;
        }
      }

    };
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(KeyLogger);
