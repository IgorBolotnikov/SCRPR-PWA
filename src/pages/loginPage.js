import React, { useState } from 'react';

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
    <div className="auth_container window">
      <h1 className="auth_header">Log In</h1>
      <p className="auth_note">
        This is a universal login page.
        <br/>
        A single account for all my projects.
      </p>
      <form className="auth_form" method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          className="auth_field field"
          placeholder="Username"
          required id="id_username"
          onChange={handleUsernameChange}
          value={username.value}
        />
        <input
          type="password"
          name="password"
          className="auth_field field"
          placeholder="Password"
          required id="id_password"
          onChange={handlePasswordChange}
          value={password.value}
        />
        <input
          className="auth_button big_button"
          type="submit"
          value="CONFIRM"
        />
        <a
          className="login_redirect auth_link"
          href="/auth/reset_password"
        >
          Forgot your password?
        </a>
      </form>
    </div>
  );
}
