import React from 'react';
import {StyleRoot} from 'radium';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './grid.css';
import './App.sass';

import AppBar from './AppBar';
import Drawer from './Drawer';
import MainMenu from './MainMenu';
import KeyLogger from './KeyLogger';
import Login from './Login';

import DocumentsForm from './Documents/DocumentsForm.container';
import Agenda from './Agenda';
import Clients from './Clients/ListClients.container';
import SaveClient from './Clients/SaveClient.container';

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
      isAuthenticated: false,
      email: '',
      password: '',
      isDrawerOpened: false,
      currentUser: {}
    }

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    console.log('toggleDrawer');
    this.setState({isDrawerOpened: !this.state.isDrawerOpened});
  }

  setAuth(cb = () => {}) {
    const authToken = cookie.get('token');

    this.setState({
      isAuthenticated: authToken ? true : false
    }, cb);
  }

  logout() {
    cookie.delete('token');
    this.setState({
      isAuthenticated: false,
      currentUser: {}
    })
  }

  async login(ev) {
    ev.preventDefault();
    const { email, password } = this.state;
    const currentUser = (await axios.post('/auth/login', {email, password})).data;

    cookie.set('token', currentUser.tokens.local);
    this.setAuth();
    this.setState({currentUser});
  }

  componentWillMount() {
    this.setAuth();
  }

  render() {
    return (
      <StyleRoot>
        {this.state.isAuthenticated?
          <Router>
            <KeyLogger>
              <Drawer logout={this.logout.bind(this)} toggleDrawer={this.toggleDrawer} isDrawerOpened={this.state.isDrawerOpened}  />
              <AppBar logout={this.logout.bind(this)} toggleDrawer={this.toggleDrawer} />

              <div style={style.content}>
                <Switch>
                  <Route path='/clients/add' component={SaveClient} />
                  <Route path='/clients/edit/:_id' render={({match}) => <SaveClientContainer clientId={match.params._id} />} />
                  <Route path='/clients' render={() => <Clients setAppState={this.setState.bind(this)} />} />
                  <Route path='/documents-form/:_id?' render={({match}) => <DocumentsForm clientId={match.params._id} />} />
                  <Route path='/playground' component={Playground} />
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
