import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import { auth } from './Firebase/firebase.utils';

import Header from './components/header/header.component';
import SignPage from './pages/signPage/sign.component';
import HomePage from './pages/homePage/homepage.component';
import ShopPage from './pages/shopPage/shop.component';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });

      console.log(user);
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/sign" component={SignPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
