import React, { useState } from 'react';
import {
  AuthField,
  AuthWindow,
  AuthButton
} from './../../components/authForms';
import { API_URL, RESET_PASSWORD_URL } from './../../constants';

export default function ResetRequest(props) {
  const [email, setEmail] = useState({value: ""});
  const [emailErrors, setEmailErrors] = useState({errors: []})
  const [wasSent, setWasSent] = useState({falue: false});

  function handleEmailChange(event) {
    setEmail({value: event.target.value});
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

  function validateForm() {
    const emailErrors = validateEmail();
    setEmailErrors({errors: emailErrors});
    return emailErrors.length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formValid = validateForm();
    if (!formValid) {
      return;
    }
    fetch(API_URL + RESET_PASSWORD_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({email: email.value})
    })
      .then(response => response.json().then(data => ({status: response.status, data: data})))
      .then(object => {
        if (object.status === 200) {
          setWasSent({value: true});
        } else {
          setEmailErrors({errors: object.data.email});
          setWasSent({value: false});
        }

      })
      .catch(error => console.error('Error:', error))
  }

  return !wasSent.value ? (
      <AuthWindow
        header="Reset Password"
        note="Please enter your email address.<br/>A message will be sent with instructions."
      >
        <form className="auth_form" method="POST" onSubmit={handleSubmit}>
          <AuthField
            type="email"
            placeholder="Email"
            onChange={handleEmailChange}
            value={email.value}
            errors={emailErrors.errors}
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
          An email was sent to you with instructions.
          You should receive it shortly.
        </p>
        <br />
      </AuthWindow>
    );
}
