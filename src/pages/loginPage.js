import React, { useState } from 'react';
import {
  AuthField,
  AuthWindow,
  AuthButton
} from './../components/authForms';

export default function LoginPage(props) {
  let [username, setUsername] = useState({value: ""});
  let [password, setPassword] = useState({value: ""});

  function handleUsernameChange(event) {
    setUsername({value: event.target.value});
  }

  function handlePasswordChange(event) {
    setPassword({value: event.target.value});
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(username.value, password.value);
  }

  return (
    <AuthWindow
      header="Log In"
      note="This is a universal login page.<br/>A single account for all my projects."
    >
      <form className="auth_form" method="POST" onSubmit={handleSubmit}>
        <AuthField
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleUsernameChange}
          value={username.value}
        />
        <AuthField
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password.value}
        />
        <AuthButton value="CONFIRM" />
        <a
          className="login_redirect auth_link"
          href="/auth/reset_password"
        >
          Forgot your password?
        </a>
      </form>
    </AuthWindow>
  );
}
