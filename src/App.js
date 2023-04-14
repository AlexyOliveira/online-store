import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import InitialPage from './pages/InitialPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ InitialPage } />
    </Switch>
  );
}

export default App;
