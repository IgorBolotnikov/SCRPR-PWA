import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  AuthField,
  AuthWindow,
  AuthButton,
} from 'src/components/authForms';
import {
  apiUrl,
  resetPasswordConfirmUrl,
  resetPasswordValidateUrl,
} from 'src/constants';

export default function ResetRequest(): React.ReactElement {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [wasSent, setWasSent] = useState(false);
  const [tokenValid, setTokenValid] = useState({ checked: false, valid: false });
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({
    password: [],
    confirmPassword: [],
  });
  const { token } = useParams();

  const header = 'Reset Password';

  useEffect(validateToken, []);

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setConfirmPassword(event.target.value);
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
    const passwordErrors = validatePassword();
    const confirmPasswordErrors = validateConfirmPassword();
    const passwordValid = passwordErrors.length === 0;
    const confirmPasswordValid = confirmPasswordErrors.length === 0;
    const formValid = passwordValid && confirmPasswordValid;
    setFormErrors({
      password: passwordErrors,
      confirmPassword: confirmPasswordErrors,
    });
    return formValid;
  }

  function validateToken(): void {
    fetch(apiUrl + resetPasswordValidateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => {
        if (response.status === 200) {
          setTokenValid({ checked: true, valid: true });
        } else if (response.status === 400) {
          setTokenValid({ checked: true, valid: false });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formValid = validateForm();
    if (!formValid) {
      return;
    }
    fetch(apiUrl + resetPasswordConfirmUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    })
      .then((response) => response.json().then((data) => ({
        status: response.status,
        data,
      })))
      .then((object) => {
        if (object.status === 200) {
          setWasSent(true);
        } else if (object.status === 400) {
          setFormErrors({
            password: object.data.password || [],
            confirmPassword: [],
          });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // eslint-disable-next-line no-nested-ternary
  return tokenValid.checked ? (
    tokenValid.valid ? (
      <AuthWindow
        header={header}
        note="Please enter the new password."
      >
        {wasSent ? (
          <>
            <br />
            <p className="text_success">
              Your password was successfully reset! Now you can Log In
            </p>
            <br />
          </>
        ) : (
          <form className="auth_form" method="POST" onSubmit={handleSubmit}>
            <AuthField
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
              errors={formErrors.password}
            />
            <AuthField
              type="password"
              placeholder="Confirm Password"
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
              errors={formErrors.confirmPassword}
            />
            <AuthButton value="SUBMIT" />
          </form>
        )}
      </AuthWindow>
    ) : (
      <AuthWindow header={header}>
        <br />
        <p className="text_grey">
          Just a moment, validating your token...
        </p>
        <br />
      </AuthWindow>
    )) : (
      <AuthWindow header={header}>
        <br />
        <p className="warning_message">
          Your token has expired or is invalid.
          Please send reset password request once again.
        </p>
        <br />
      </AuthWindow>
  );
}
