import React from 'react';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import App from './components/App';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
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
