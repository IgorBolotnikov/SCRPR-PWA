import React, { useState } from 'react';
import {
  AuthField,
  AuthWindow,
  AuthButton
} from './../components/authForms';
import useUserStore from './../userStore';
import { API_URL, CREATE_USER_URL } from './../constants';

export default function RegisterPage(props) {
  const [username, setUsername] = useState({value: ""});
  const [email, setEmail] = useState({value: ""});
  const [password, setPassword] = useState({value: ""});
  const [confirmPassword, setConfirmPassword] = useState({value: ""});
  const [formErrors, setFormErrors] = useState({
    username: [],
    email: [],
    password: [],
    confirmPassword: []
  });
  const user = useUserStore();

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

  function validateEmail() {
    let errors = [];
    if (!(/\S+@\S+/).test(email.value)) {
      errors.push('Please enter correct email');
    }
    if (email.value.length > 254) {
      errors.push('Email is too long');
    }
    if (email.value.length === 0) {
      errors.push('Email is required');
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

  function validateConfirmPassword() {
    let errors = []
    if  (password.value !== confirmPassword.value) {
      errors.push('Passwords must match');
    }
    return errors;
  }

  function validateForm() {
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
      confirmPassword: confirmPasswordErrors
    })
    return formValid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formValid = validateForm();
    if (!formValid) {
      return;
    }
    fetch(API_URL + CREATE_USER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value
      })
    })
      .then(response => response.json().then(data => ({status: response.status, data: data})))
      .then(object => {
        if (object.status === 201) {
          localStorage.setItem('token', object.data.token);
          user.update(object.data.user);
        } else if (object.status === 400) {
          setFormErrors({
            username: object.data.username || [],
            email: object.data.email || [],
            password: object.data.password || [],
            confirmPassword: []
          })
        }
      })
      .catch(error => console.error('Error:', error));
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
          errors={formErrors.username}
        />
        <AuthField
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email.value}
          errors={formErrors.email}
        />
        <AuthField
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password.value}
          errors={formErrors.password}
        />
        <AuthField
          type="password"
          placeholder="Confirm password"
          onChange={handleConfirmPasswordChange}
          value={confirmPassword.value}
          errors={formErrors.confirmPassword}
        />
        <AuthButton value="SUBMIT"/>
        <div className='auth_redirect'>
          Already have an account? <a className="auth_link" href="/auth/login/">Log In</a>
        </div>
      </form>
    </AuthWindow>
  );
}
