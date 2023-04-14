import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import InitialPage from './pages/InitialPage';
import Cart from './pages/Cart';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ InitialPage } />
      <Route exact path="/cart" component={ Cart } />
    </Switch>
  );
}

export default App;
