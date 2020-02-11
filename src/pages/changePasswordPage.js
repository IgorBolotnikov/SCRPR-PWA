import React, { useState } from 'react';
import {
  AuthField,
  AuthWindow,
  AuthButton
} from './../components/authForms';
import { API_URL, CHANGE_PASSWORD_URL } from './../constants';

export default function ChangePasswordPage(props) {
  const [oldPassword, setOldPassword] = useState({value: ""});
  const [newPassword, setNewPassword] = useState({value: ""});
  const [confirmPassword, setConfirmPassword] = useState({value: ""});
  const [formErrors, setFormErrors] = useState({
      oldPassword: [],
      newPassword: [],
      confirmPassword: []
    });

  function handleOldPasswordChange(event) {
    setOldPassword({value: event.target.value});
  }

  function handleNewPasswordChange(event) {
    setNewPassword({value: event.target.value});
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword({value: event.target.value});
  }

  function validateOldPassword() {
    let errors = [];
    if (oldPassword.value.length > 0 && oldPassword.value.length < 8) {
      errors.push('Password is too short');
    }
    if (oldPassword.value.length === 0) {
      errors.push('Password is required');
    }
    return errors;
  }

  function validateNewPassword() {
    let errors = [];
    if (newPassword.value.length > 0 && newPassword.value.length < 8) {
      errors.push('Password is too short');
    }
    if (newPassword.value.length === 0) {
      errors.push('Password is required');
    }
    return errors;
  }

  function validateConfirmPassword() {
    let errors = []
    if  (newPassword.value !== confirmPassword.value) {
      errors.push('Passwords must match');
    }
    return errors;
  }

  function validateForm() {
    const oldPasswordErrors = validateOldPassword();
    const newPasswordErrors = validateNewPassword();
    const confirmPasswordErrors = validateConfirmPassword();
    const oldPasswordValid = oldPasswordErrors.length === 0;
    const newPasswordValid = newPasswordErrors.length === 0;
    const confirmPasswordValid = confirmPasswordErrors.length === 0;
    const formValid = oldPasswordValid && newPasswordValid && confirmPasswordValid;
    setFormErrors({
      oldPassword: oldPasswordErrors,
      newPassword: newPasswordErrors,
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
    fetch(API_URL + CHANGE_PASSWORD_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        old_password: oldPassword.value,
        new_password: newPassword.value,
      })
    })
      .then(response => {
        if (response.status === 200) {
          return {status: response.status, data: null};
        } else {
          return response.json().then(data => ({status: response.status, data: data}))};
        }
      )
      .then(object => {
        if (object.status === 200) {
          
        } else if (object.status === 400) {
          setFormErrors({
            oldPassword: object.data.old_password || [],
            newPassword: object.data.new_password || [],
            confirmPassword: []
          })
        }
      })
      .catch(error => console.error('Error:', error));
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
          errors={formErrors.oldPassword}
        />
        <AuthField
          type="password"
          placeholder="New Password"
          onChange={handleNewPasswordChange}
          value={newPassword.value}
          errors={formErrors.newPassword}
        />
        <AuthField
          type="password"
          placeholder="Confirm Password"
          onChange={handleConfirmPasswordChange}
          value={confirmPassword.value}
          errors={formErrors.confirmPassword}
        />
        <AuthButton value="SUBMIT" />
      </form>
    </AuthWindow>
  );
}
