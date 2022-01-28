import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Feedbacks from './pages/Feedbacks';
import GamePage from './pages/GamePage';
import Ranking from './pages/Ranking';
import Configurations from './pages/Configurations';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/feedback" component={ Feedbacks } />
        <Route exact path="/gamepage" component={ GamePage } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/settings" component={ Configurations } />
      </Switch>
    );
  }
}

export default App;
