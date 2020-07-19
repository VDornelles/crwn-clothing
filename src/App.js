import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import { auth,createUserProfileDocument } from './Firebase/firebase.utils';

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
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser:{
              id: snapShot.id,
              ...snapShot.data()
            }
          },() => {console.log(this.state);})
        });

        console.log(this.state);

      }
      else{this.setState({currentUser: userAuth});}


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
