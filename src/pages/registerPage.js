import React, { useState } from 'react';
import {
  AuthField,
  AuthWindow,
  AuthButton
} from './../components/authForms';

export default function RegisterPage(props) {
  let [username, setUsername] = useState({value: ""});
  let [email, setEmail] = useState({value: ""});
  let [password, setPassword] = useState({value: ""});
  let [confirmPassword, setConfirmPassword] = useState({value: ""});

  function handleUsernameChange(event) {
    setUsername({value: event.target.value});
  }

  function handleEmailChange(event) {
    setEmail({value: event.target.value});
  }

  function handlePasswordChange(event) {
    setPassword({value: event.target.value});
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword({value: event.target.value});
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(username.value, email.value, password.value, confirmPassword.value);
  }


  return (
    <AuthWindow
      header="Register"
      note="This is a universal registration page.<br/>A single account for all my projects."
    >
      <form className="auth_form" method="POST" onSubmit={handleSubmit}>
        <AuthField
          type="text"
          placeholder="Username"
          onChange={handleUsernameChange}
          value={username.value}
        />
        <AuthField
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email.value}
        />
        <AuthField
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password.value}
        />
        <AuthField
          type="password"
          placeholder="Confirm password"
          onChange={handleConfirmPasswordChange}
          value={confirmPassword.value}
        />
        <AuthButton value="SUBMIT"/>
        <div className='auth_redirect'>
          Already have an account? <a className="auth_link" href="/auth/login/">Log In</a>
        </div>
      </form>
    </AuthWindow>
  );
}
