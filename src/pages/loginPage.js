import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import {
  AuthField,
  AuthWindow,
  AuthButton
} from './../components/authForms';

import useUserStore from './../userStore';
import { API_URL, GET_TOKEN_URL } from './../constants';

export default function LoginPage(props) {
  const [username, setUsername] = useState({value: ""});
  const [password, setPassword] = useState({value: ""});
  const [hasErrors, setHasErrors] = useState(false);
  const [formErrors, setFormErrors] = useState({ username: [], password: [] });
  const user = useUserStore();

  function handleUsernameChange(event) {
    setUsername({value: event.target.value});
  }

  function handlePasswordChange(event) {
    setPassword({value: event.target.value});
  }

  function validateUsername() {
    let errors = [];
    if (username.value.length > 150) {
      errors.push('Username is too long');
    }
    if (username.value.length === 0) {
      errors.push('Username is required');
    }
    return errors;
  }

  function validatePassword() {
    let errors = [];
    if (password.value.length > 0 && password.value.length < 8) {
      errors.push('Password is too short');
    }
    if (password.value.length === 0) {
      errors.push('Password is required');
    }
    return errors;
  }

  function validateForm() {
    const usernameErrors = validateUsername();
    const passwordErrors = validatePassword();
    const usernameValid = usernameErrors.length === 0;
    const passwordValid = passwordErrors.length === 0;
    const formValid = usernameValid && passwordValid;
    setFormErrors({username: usernameErrors, password: passwordErrors});
    return formValid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formValid = validateForm();
    if (!formValid) {
      setHasErrors(true);
      return;
    }
    fetch(API_URL + GET_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username.value, password: password.value})
    })
      .then(response => response.json().then(data => ({status: response.status, data: data})))
      .then(object => {
        if (object.status === 200) {
          localStorage.setItem('token', object.data.token);
          setHasErrors(false);
          console.log(object.data.user);
          user.update(object.data.user);
        } else if (object.status === 400) {
          if (object.data.non_field_errors) {
            setFormErrors({
              username: ["Invalid username"],
              password: ["Invalid password"]
            })
          } else {
            setFormErrors(object.data)
          }
          setHasErrors(true);
        }
      })
      .catch(error => console.error('Error:', error));
  }

  // For redirecting back to previous page
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  console.log(user);

  return user.isAuthenticated ? (
    <Redirect to={from.pathname} />
    ) : (
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
            errors={formErrors.username}
          />
          <AuthField
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password.value}
            errors={formErrors.password}
          />
          <AuthButton value="CONFIRM" />
          <a
            className="login_redirect auth_link"
            href="/auth/reset-password"
          >
            Forgot your password?
          </a>
        </form>
      </AuthWindow>
    );
}
