import React, { useState } from 'react';
import {
  AuthField,
  AuthWindow,
  AuthButton
} from './../../components/authForms';

export default function ResetRequest(props) {
  let [email, setEmail] = useState({value: ""});
  let [wasSent, setWasSent] = useState({falue: false});

  function handleEmailChange(event) {
    setEmail({value: event.target.value});
  }

  function handleSubmit(event) {
    event.preventDefault();
    setWasSent({value: true});
    console.log(email.value);

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
