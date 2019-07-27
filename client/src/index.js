import React from 'react';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import App from './components/App';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import './helpers/axios';
import './index.sass';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={client}>
        <MuiPickersUtilsProvider utils={MomentUtils}> 
          <Component />
        </MuiPickersUtilsProvider>
      </ApolloProvider>
    </AppContainer>,
    document.getElementById('root')
  )
}

if(!window.cordova) {
  render(App);
  if (module.hot) {
    module.hot.accept('./components/App', () => { render(App) })
  }
}

else {
  document.addEventListener('deviceready', render(App), false)
}
