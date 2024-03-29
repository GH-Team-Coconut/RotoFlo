import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div id='auth'>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <input className='Auth-Form-Input' name='username' type='text' placeholder="USERNAME" />
        </div>
        <div>
          <input className='Auth-Form-Input' name='password' type='password' placeholder="PASSWORD" />
        </div>
        <div>
          <button className='fancyButton' type='submit'>
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
