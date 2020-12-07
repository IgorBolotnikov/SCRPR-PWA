import React, { useState } from 'react';

import {
  AuthField,
  AuthWindow,
  AuthButton,
} from 'src/components/authForms';
import { apiUrl, resetPasswordUrl } from 'src/constants';

export default function ResetRequest(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState<{ errors: string[] }>({ errors: [] });
  const [wasSent, setWasSent] = useState(false);

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
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

  function validateForm(): boolean {
    const errors = validateEmail();
    setEmailErrors({ errors });
    return errors.length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formValid = validateForm();
    if (!formValid) {
      return;
    }
    fetch(apiUrl + resetPasswordUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json()
        .then((data) => ({ status: response.status, data })))
      .then((object) => {
        if (object.status === 200) {
          setWasSent(true);
        } else {
          setEmailErrors({ errors: object.data.email });
          setWasSent(false);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  return !wasSent ? (
    <AuthWindow
      header="Reset Password"
      note={'Please enter your email address.'
      + '<br/>A message will be sent with instructions.'}
    >
      <form className="auth_form" method="POST" onSubmit={handleSubmit}>
        <AuthField
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
          errors={emailErrors.errors}
        />
        <AuthButton value="SUBMIT" />
      </form>
    </AuthWindow>
  ) : (
    <AuthWindow
      header="Reset Password"
    >
      <br />
      <p className="text_success">
        An email was sent to you with instructions.
        You should receive it shortly.
      </p>
      <br />
    </AuthWindow>
  );
}
