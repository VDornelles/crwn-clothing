import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/header/header.component';
import SignPage from './pages/signPage/sign.component';
import HomePage from './pages/homePage/homepage.component';
import ShopPage from './pages/shopPage/shop.component';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/sign" component={SignPage} />
      </Switch>
    </div>
  );
}

export default App;
