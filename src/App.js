import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import { Provider } from 'react-redux';
import InitialPage from './pages/InitialPage';
import Cart from './pages/Cart';
import store from './redux/store';

function App() {
  return (
    <Provider store={ store }>
      <Switch>
        <Route exact path="/" component={ InitialPage } />
        <Route exact path="/cart" component={ Cart } />
      </Switch>
    </Provider>

  );
}

export default App;
