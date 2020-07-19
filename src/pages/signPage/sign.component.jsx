import React from 'react';

import SignIn from '../../components/signIn/signIn.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './sign.style.scss';

const SignPage = () => (
  <div className="sign">
    <SignIn />
    <SignUp />
  </div>
);

export default SignPage;
