import React, { useState } from 'react';

import { AuthButton, AuthField, AuthWindow } from 'src/components/authForms';
import { apiUrl, createUserUrl } from 'src/constants';
import useUserStore from 'src/userStore';

export default function RegisterPage(): React.ReactElement {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    username: [] as string[],
    email: [] as string[],
    password: [] as string[],
    confirmPassword: [] as string[],
  });
  const user = useUserStore();

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setConfirmPassword(event.target.value);
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

  function validateEmail(): string[] {
    const errors = [];
    if (!(/\S+@\S+/).test(email)) {
      errors.push('Please enter correct email');
    }
    if (email.length > 254) {
      errors.push('Email is too long');
    }
    if (email.length === 0) {
      errors.push('Email is required');
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

  function validateConfirmPassword(): string[] {
    const errors = [];
    if (password !== confirmPassword) {
      errors.push('Passwords must match');
    }
    return errors;
  }

  function validateForm(): boolean {
    const usernameErrors = validateUsername();
    const emailErrors = validateEmail();
    const passwordErrors = validatePassword();
    const confirmPasswordErrors = validateConfirmPassword();
    const usernameValid = usernameErrors.length === 0;
    const emailValid = emailErrors.length === 0;
    const passwordValid = passwordErrors.length === 0;
    const confirmPasswordValid = confirmPasswordErrors.length === 0;
    const formValid = usernameValid && emailValid && passwordValid && confirmPasswordValid;
    setFormErrors({
      username: usernameErrors,
      email: emailErrors,
      password: passwordErrors,
      confirmPassword: confirmPasswordErrors,
    });
    return formValid;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formValid = validateForm();
    if (!formValid) {
      return;
    }
    fetch(apiUrl + createUserUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json().then((data) => ({
        status: response.status,
        data,
      })))
      .then((object) => {
        if (object.status === 201) {
          localStorage.setItem('token', object.data.token);
          user.update(object.data.user);
        } else if (object.status === 400) {
          setFormErrors({
            username: object.data.username || [],
            email: object.data.email || [],
            password: object.data.password || [],
            confirmPassword: [],
          });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
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
          value={username}
          errors={formErrors.username}
        />
        <AuthField
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
          errors={formErrors.email}
        />
        <AuthField
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
          errors={formErrors.password}
        />
        <AuthField
          type="password"
          placeholder="Confirm password"
          onChange={handleConfirmPasswordChange}
          value={confirmPassword}
          errors={formErrors.confirmPassword}
        />
        <AuthButton value="SUBMIT" />
        <div className="auth_redirect">
          Already have an account?
          {' '}
          <a className="auth_link" href="/auth/login/">Log In</a>
        </div>
      </form>
    </AuthWindow>
  );
}
