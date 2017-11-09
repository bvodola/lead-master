import React from 'react';
import {StyleRoot} from 'radium';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import AppBar from './AppBar';
import Agenda from './Agenda';
import Clients from './Clients/containers';
import SaveClient from './Clients/SaveClient';

import { getToken } from '../helpers';

import Playground from '../helpers/form/Playground';

const style = {
  content: {
    margin: '80px 8px 0 8px',
  }
}

let isAuthenticated = false;

const PrivateRoute = (props) => (
  isAuthenticated ?
    <Route {...props} />
    :
    <Redirect to={{
      pathname: '/login',
      state: { from: props.location }
    }}/>
);

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    // isAuthenticated = true;
    // this.setState({ redirectToReferrer: true })

  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      authToken: ''
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
        <Router>
          <div>
            <AppBar />

            <div style={style.content}>
              {!this.state.isAuthenticated ?
                <div>
                  <a href='http://localhost:3000/auth/facebook'>FB Login</a>
                  <a href='http://localhost:3000/auth/twitter'>Twitter Login</a>
                </div>
              : <button onClick={() => this.deleteToken()}>Logout</button>}

              <Switch>
                <Route path='/login' component={Login} />
                <Route exact path='/' render={(props) => <Agenda {...props} />} />
                <Route path='/clients/add' component={SaveClient} />
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
