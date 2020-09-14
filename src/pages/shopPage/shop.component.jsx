import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import {connect} from 'react-redux';

import {updateCollections} from '../../redux/shop/shop.actions'

import {firestore, convertCollectionsSnaphotToMap} from '../../Firebase/firebase.utils';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionPage from '../collection/collection.component';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {

  state = {
    loading: true
  }

  unsubscribeFromSnapshot = null;

  componentDidMount(){
      const {updateCollections} = this.props;

      const collectionRef = firestore.collection('collections');


      collectionRef.get().then(async snapshot => {
        const collectionsMap = convertCollectionsSnaphotToMap(snapshot)
        updateCollections(collectionsMap);
        this.setState({loading: false});
      });
  }

  render() {
    const { match } = this.props;
    const {loading} = this.state;

    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} /> }/>
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} /> }
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections : collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);
