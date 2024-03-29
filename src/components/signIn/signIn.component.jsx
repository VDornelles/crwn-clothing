import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, signInWithGoogle} from '../../Firebase/firebase.utils';

import './signIn.style.scss';

class SignIn extends React.Component {
  constructor(props) {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {email, password} = this.state;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    this.setState({email:'', password:''});
  } catch (error) {
    console.log(error);
  }
  }

  handleChange = event => {

    const {value, name} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign In with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput name="email" type="email" label="Email" value={this.state.email} handleChange={this.handleChange} required />


          <FormInput
            name="password"
            type="password"
            label="Password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />

          <div className="buttons">
          <CustomButton type="submit" >SIGN IN</CustomButton>
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn >SIGN IN WITH GOOGLE</CustomButton>
          </div>

        </form>
      </div>
    );
  }
}

export default SignIn;
