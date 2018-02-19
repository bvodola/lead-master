import React from 'react';
import {StyleRoot} from 'radium';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import KeyLogger from './KeyLogger';
import AppBar from './AppBar';
import Login from './Login';
import Drawer from './Drawer';
import DocumentsForm from './Documents/containers/DocumentsForm';
import Agenda from './Agenda';
import Clients from './Clients/ListClients.container.js';
import SaveClient from './Clients/containers/SaveClient';

import { cookie } from '../helpers';
import axios from '../helpers/axios';

import Playground from './Playground';

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
      isAuthenticated: false,
      email: '',
      password: '',
      isDrawerOpened: false
    }

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    console.log('toggleDrawer');
    this.setState({isDrawerOpened: !this.state.isDrawerOpened});
  }

  setToken(cb = () => {}) {
    const authToken = cookie.get('token');

    this.setState({
      authToken,
      isAuthenticated: authToken ? true : false
    }, cb);
  }

  deleteToken() {
    cookie.delete('token');
    this.setState({
      authToken: false,
      isAuthenticated: false
    })
  }

  async login(ev) {
    ev.preventDefault();
    const { email, password } = this.state;
    const currentUser = (await axios.post('/auth/login', {email, password})).data;
    const token = currentUser.tokens.local;
    cookie.set('token', token);
    this.setToken();
  }

  componentWillMount() {
    this.setToken();
  }

  render() {
    return (
      <StyleRoot>
        {this.state.isAuthenticated?
          <Router>
            <KeyLogger>
              <Drawer logout={this.deleteToken.bind(this)} toggleDrawer={this.toggleDrawer} isDrawerOpened={this.state.isDrawerOpened}  />
              <AppBar logout={this.deleteToken.bind(this)} toggleDrawer={this.toggleDrawer} />

              <div style={style.content}>
                <Switch>
                  {/* <Route exact path='/' render={(props) => <Agenda {...props} />} /> */}
                  <Route path='/clients/add' component={SaveClient} />
                  <Route path='/clients/edit/:_id' render={({match}) => <SaveClientContainer clientId={match.params._id} />} />
                  <Route path='/clients' component={Clients} />
                  <Route path='/documents-form/:_id?' render={({match}) => <DocumentsForm clientId={match.params._id} />} />
                  {/* <Route path='/playground' component={Playground} /> */}
                  <Redirect to='/clients' />
                </Switch>
              </div>
            </KeyLogger>
          </Router>
        :
          <Login data={{...this.state}} setState={this.setState.bind(this)} handleSubmit={(ev) => this.login(ev)} />
        }
      </StyleRoot>
    );
  }
}

export default App;
