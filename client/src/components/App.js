import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Home = () => (
  <div>Home</div>
);

const About = () => (
  <div>About</div>
);

class App extends React.Component {

  handleClick() {
    function onSuccess(imageURI) {
        var image = document.getElementById('myImage');
        image.src = imageURI;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }

    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI });
  };


  render() {
    return (
    <Router>
        <div>
          <h2>Welcome to Cordova and React</h2>
          <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/about'}>About</Link></li>
          </ul>
          <button onClick={() => this.handleClick()} >Take Pic</button>
          <img style={{width: '100%'}} src="" alt="" id="myImage"/>
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
