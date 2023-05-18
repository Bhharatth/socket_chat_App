import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Messenger from './pages/Messenger/Messenger';

const App = () => {
  return (
    <Router>
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/messenger" component={Messenger} />
    </Switch>
  </Router>
  )
}

export default App
