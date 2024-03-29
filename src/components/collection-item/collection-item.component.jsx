import React from 'react';

import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

import {
  CollectionItemContainer,
  BackgroundImage,
  CollectionFooterContainer,
  PriceContainer,
  NameContainer,
  AddButton,
} from './collection-item.styles';

const CollectionItem = ({ item, addItem }) => {
  const { imageUrl, price, name } = item;
  return (
    <CollectionItemContainer>
      <BackgroundImage
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <CollectionFooterContainer className="collection-footer">
        <NameContainer>{name}</NameContainer>
        <PriceContainer>${price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton onClick={() => addItem(item)} inverted>
        ADD TO CART
      </AddButton>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
