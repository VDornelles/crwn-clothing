import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { auth, createUserProfileDocument, addCollectionsAndDocuments } from './Firebase/firebase.utils';
import {createStructuredSelector} from 'reselect';

import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';

import Header from './components/header/header.component';
import SignPage from './pages/signPage/sign.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shopPage/shop.component';
import CheckoutPage from './pages/checkoutPage/checkout.component';

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
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/sign" render={() => this.props.currentUser ? (<Redirect to="/" />) :(<SignPage />)} />
          <Route exact path="/checkout" component={CheckoutPage} />

        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
