import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../Firebase/firebase.utils';

import './header.style.scss';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

const Header = ({ currentUser }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <CrwnLogo className="logo" />
    </Link>

    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/contact">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/sign">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

const mapStateToPros = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToPros)(Header);
