import React, { useContext, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { AuthButton, AuthField, AuthWindow } from 'src/components/authForms';
import { apiUrl, getTokenUrl } from 'src/constants';
import { updateUser } from 'src/shared/state/user/user.service';
import { UserContext } from 'src/userStore';

export default function LoginPage(): React.ReactElement {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>(
    { username: [], password: [] },
  );
  const user = useContext(UserContext);
  const location = useLocation<{from: { pathname: string }}>();
  const { from } = location.state || { from: { pathname: '/' } };

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  function validateUsername(): string[] {
    const errors = [];
    if (username.length > 150) {
      errors.push('Username is too long');
    }
    if (username.length === 0) {
      errors.push('Username is required');
    }
    return errors;
  }

  function validatePassword(): string[] {
    const errors = [];
    if (password.length > 0 && password.length < 8) {
      errors.push('Password is too short');
    }
    if (password.length === 0) {
      errors.push('Password is required');
    }
    return errors;
  }

  function validateForm(): boolean {
    const usernameErrors = validateUsername();
    const passwordErrors = validatePassword();
    const usernameValid = usernameErrors.length === 0;
    const passwordValid = passwordErrors.length === 0;
    const formValid = usernameValid && passwordValid;
    setFormErrors({ username: usernameErrors, password: passwordErrors });
    return formValid;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formValid = validateForm();
    if (!formValid) {
      return;
    }
    fetch(apiUrl + getTokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json().then((data) => ({
        status: response.status,
        data,
      })))
      .then((object) => {
        if (object.status === 200) {
          localStorage.setItem('token', object.data.token);
          updateUser(object.data.user);
        } else if (object.status === 400) {
          if (object.data.non_field_errors) {
            setFormErrors({
              username: ['Invalid username'],
              password: ['Invalid password'],
            });
          } else {
            setFormErrors(object.data);
          }
        }
      })
      .catch((error) => {
        throw new Error(`Error: ${error}`);
      });
  }

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
          placeholder="Username"
          onChange={handleUsernameChange}
          value={username}
          errors={formErrors.username}
        />
        <AuthField
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
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
