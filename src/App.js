import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import { Provider } from 'react-redux';
import InitialPage from './pages/InitialPage';
import Cart from './pages/Cart';
import store from './redux/store';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Provider store={ store }>
      <Switch>
        <Route exact path="/" component={ InitialPage } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/details" component={ ProductDetails } />
      </Switch>
    </Provider>

  );
}

export default App;
