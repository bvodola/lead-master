import React from 'react';
import {StyleRoot} from 'radium';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import AppBar from './AppBar';
import Agenda from './Agenda';
import Clients from './Clients';

import Playground from '../helpers/form/Playground';

const style = {
  content: {
    margin: '80px 8px 0 8px',
  }
}

class App extends React.Component {

  render() {
    return (
      <StyleRoot>
        <Router>
          <div>
            <AppBar />
            <div style={style.content}>
              <Switch>
                <Route exact path='/' component={Agenda} />
                <Route path='/clients' component={Clients} />
                <Route path='/playground' component={Playground} />
              </Switch>
            </div>
          </div>
        </Router>
      </StyleRoot>
    );
  }
}

export default App;
