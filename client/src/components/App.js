import React from 'react';
import {StyleRoot} from 'radium';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import KeyLogger from './KeyLogger';
import AppBar from './AppBar';
import DocumentsForm from './Documents/containers/DocumentsForm';
import Agenda from './Agenda';
import Clients from './Clients/containers';
import SaveClient from './Clients/containers/SaveClient';

import { getToken } from '../helpers';

import Playground from '../helpers/form/Playground';

const style = {
  content: {
    margin: '80px 8px 0 8px',
  }
}


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      authToken: '',
      isAuthenticated: false
    }
  }

  setToken() {
    const authToken = getToken();

    this.setState({
      authToken,
      isAuthenticated: authToken ? true : false
    });
  }

  deleteToken() {
    this.setState({
      authToken: false,
      isAuthenticated: false
    })
  }

  componentWillMount() {
    this.setToken();
  }

  render() {
    return (
      <StyleRoot>
        {this.state.isAuthenticated || 1 ?
          <Router>
            <KeyLogger>
              <AppBar logout={this.deleteToken.bind(this)} />
              <div style={style.content}>
                <Switch>
                  <Route exact path='/' render={(props) => <Agenda {...props} />} />
                  <Route path='/clients/add' component={SaveClient} />
                  <Route path='/clients/edit/:_id' render={({match}) => <SaveClientContainer clientId={match.params._id} />} />
                  <Route path='/clients' component={Clients} />
                  <Route path='/documents-form/:_id?' render={({match}) => <DocumentsForm clientId={match.params._id} />} />
                  <Route path='/playground' component={Playground} />
                </Switch>
              </div>
            </KeyLogger>
          </Router>
        :
          <div>
            <a href='http://localhost:3000/auth/facebook'>FB Login</a>
            <a href='http://localhost:3000/auth/twitter'>Twitter Login</a>
            <a href='http://localhost:3000/auth/google'>Google Login</a>
          </div>
        }
      </StyleRoot>
    );
  }
}

export default App;
