import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { auth, createUserProfileDocument } from './Firebase/firebase.utils';

import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions'

import Header from './components/header/header.component';
import SignPage from './pages/signPage/sign.component';
import HomePage from './pages/homePage/homepage.component';
import ShopPage from './pages/shopPage/shop.component';

import './App.css';


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
                id: snapShot.id,
                ...snapShot.data(),
              });
            });

      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/sign" component={SignPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
