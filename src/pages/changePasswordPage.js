import React, { useState } from 'react';
import {
  AuthField,
  AuthWindow,
  AuthButton
} from './../components/authForms';

export default function ChangePasswordPage(props) {
  const [oldPassword, setOldPassword] = useState({value: ""});
  const [newPassword, setNewPassword] = useState({value: ""});
  const [confirmPassword, setConfirmPassword] = useState({value: ""});

  function handleOldPasswordChange(event) {
    setOldPassword({value: event.target.value});
  }

  function handleNewPasswordChange(event) {
    setNewPassword({value: event.target.value});
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword({value: event.target.value});
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <AuthWindow
      header="Change Password"
      note="Please enter the new password.<br/>It should (ideally) differ from the previous one."
    >
      <form className="auth_form" method="POST" onSubmit={handleSubmit}>
        <AuthField
          type="password"
          placeholder="Old Password"
          onChange={handleOldPasswordChange}
          value={oldPassword.value}
        />
        <AuthField
          type="password"
          placeholder="New Password"
          onChange={handleNewPasswordChange}
          value={newPassword.value}
        />
        <AuthField
          type="password"
          placeholder="Confirm Password"
          onChange={handleConfirmPasswordChange}
          value={confirmPassword.value}
        />
        <AuthButton value="SUBMIT" />
      </form>
    </AuthWindow>
  );
}
