import React, { useState } from 'react';
import {
  AuthField,
  AuthWindow,
  AuthButton
} from './../../components/authForms';

export default function ResetRequest(props) {
  let [password, setPassword] = useState({value: ""});
  let [confirmPassword, setConfirmPassword] = useState({value: ""});
  let [wasSent, setWasSent] = useState({falue: false});

  function handlePasswordChange(event) {
    setPassword({value: event.target.value});
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword({value: event.target.value});
  }

  function handleSubmit(event) {
    event.preventDefault();
    setWasSent({value: true});
  }

  return !wasSent.value ? (
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
          />
          <AuthField
            type="password"
            placeholder="Confirm Password"
            onChange={handleConfirmPasswordChange}
            value={confirmPassword.value}
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
    );
}
