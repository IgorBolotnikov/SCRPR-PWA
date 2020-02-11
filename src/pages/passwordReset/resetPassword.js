import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  AuthField,
  AuthWindow,
  AuthButton
} from './../../components/authForms';
import {
  API_URL,
  RESET_PASSWORD_CONFIRM_URL,
  RESET_PASSWORD_VALIDATE_URL
} from './../../constants';

export default function ResetRequest(props) {
  const [password, setPassword] = useState({value: ""});
  const [confirmPassword, setConfirmPassword] = useState({value: ""});
  const [wasSent, setWasSent] = useState({value: false});
  const [tokenValid, setTokenValid] = useState({checked: false, valid: false});
  const [formErrors, setFormErrors] = useState({
    password: [],
    confirmPassword: []
  });
  const { token } = useParams();

  useEffect(validateToken, []);

  function handlePasswordChange(event) {
    setPassword({value: event.target.value});
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword({value: event.target.value});
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
    const passwordErrors = validatePassword();
    const confirmPasswordErrors = validateConfirmPassword();
    const passwordValid = passwordErrors.length === 0;
    const confirmPasswordValid = confirmPasswordErrors.length === 0;
    const formValid = passwordValid && confirmPasswordValid;
    setFormErrors({
      password: passwordErrors,
      confirmPassword: confirmPasswordErrors
    })
    return formValid;
  }

  function validateToken() {
    fetch(API_URL + RESET_PASSWORD_VALIDATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: token})
    })
      .then(response => {
        if (response.status === 200) {
          setTokenValid({checked: true, valid: true});
        } else if (response.status === 400) {
          setTokenValid({checked: true, valid: false});
        }
      })
      .catch(error => console.error('Error:', error));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formValid = validateForm();
    if (!formValid) {
      return;
    }
    fetch(API_URL + RESET_PASSWORD_CONFIRM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        password: password.value,
      })
    })
      .then(response => response.json().then(data => ({status: response.status, data: data})))
      .then(object => {
        if (object.status === 200) {
          setWasSent({value: true});
        } else if (object.status === 400) {
          setFormErrors({
            password: object.data.password || [],
            confirmPassword: []
          })
        }
      })
      .catch(error => console.error('Error:', error));
  }

  return tokenValid.checked && tokenValid.valid ? (!wasSent.value ? (
      <AuthWindow
        header="Reset Password"
        note="Please enter the new password.</br >It should (ideally) differ from the previous one."
      >
        <form className="auth_form" method="POST" onSubmit={handleSubmit}>
          <AuthField
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password.value}
            errors={formErrors.password}
          />
          <AuthField
            type="password"
            placeholder="Confirm Password"
            onChange={handleConfirmPasswordChange}
            value={confirmPassword.value}
            errors={formErrors.confirmPassword}
          />
          <AuthButton value="SUBMIT"/>
        </form>
      </AuthWindow>
  ) : (
      <AuthWindow
        header="Reset Password"
      >
        <br />
        <p className="text_success">
          Your passowrd was successfully reset! Now you can Log In
        </p>
        <br />
      </AuthWindow>
    )) : (
      tokenValid.checked && !tokenValid.valid ? (
        <AuthWindow
          header="Reset Password"
        >
          <br />
          <p className="text_grey">
            Just a moment, validating your token...
          </p>
          <br />
        </AuthWindow>
      ) : (
        <AuthWindow
          header="Reset Password"
        >
          <br />
          <p className="warning_message">
            Your token has expired or is invalid.
            Please send reset password request once again.
          </p>
          <br />
        </AuthWindow>
      ));
}
