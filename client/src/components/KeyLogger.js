import React from 'react';
import { withRouter } from 'react-router-dom';

class KeyLogger extends React.Component {
  componentDidMount() {
    document.onkeypress = (ev) => {

      if(document.activeElement.nodeName !== 'INPUT') {
        switch(ev.keyCode) {
          case(97):
            ev.preventDefault();
            this.props.history.push('/');
            break;
          case(99):
            ev.preventDefault();
            this.props.history.push('/clients');
            break;
          case(100):
            ev.preventDefault();
            this.props.history.push('/documents-form');
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
