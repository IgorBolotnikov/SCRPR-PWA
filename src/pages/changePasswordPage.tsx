import React, { useState } from 'react';

import {
  AuthField,
  AuthWindow,
  AuthButton,
} from 'src/components/authForms';
import { apiUrl, changePasswordUrl } from 'src/constants';

export default function ChangePasswordPage(): React.ReactElement {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    oldPassword: [] as string[],
    newPassword: [] as string[],
    confirmPassword: [] as string[],
  });

  function handleOldPasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setOldPassword(event.target.value);
  }

  function handleNewPasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setConfirmPassword(event.target.value);
  }

  function validateOldPassword(): string[] {
    const errors = [];
    if (oldPassword.length > 0 && oldPassword.length < 8) {
      errors.push('Password is too short');
    }
    if (oldPassword.length === 0) {
      errors.push('Password is required');
    }
    return errors;
  }

  function validateNewPassword(): string[] {
    const errors = [];
    if (newPassword.length > 0 && newPassword.length < 8) {
      errors.push('Password is too short');
    }
    if (newPassword.length === 0) {
      errors.push('Password is required');
    }
    return errors;
  }

  function validateConfirmPassword(): string[] {
    const errors = [];
    if (newPassword !== confirmPassword) {
      errors.push('Passwords must match');
    }
    return errors;
  }

  function validateForm(): boolean {
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
    fetch(apiUrl + changePasswordUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return { status: response.status, data: null };
        }
        return response.json().then((data) => ({ status: response.status, data }));
      })
      .then((object) => {
        if (object.status === 400) {
          setFormErrors({
            oldPassword: object.data.old_password || [],
            newPassword: object.data.new_password || [],
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
      header="Change Password"
      note={'Please enter the new password.'
      + '<br/>It should (ideally) differ from the previous one.'}
    >
      <form className="auth_form" method="POST" onSubmit={handleSubmit}>
        <AuthField
          type="password"
          placeholder="Old Password"
          onChange={handleOldPasswordChange}
          value={oldPassword}
          errors={formErrors.oldPassword}
        />
        <AuthField
          type="password"
          placeholder="New Password"
          onChange={handleNewPasswordChange}
          value={newPassword}
          errors={formErrors.newPassword}
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
    </AuthWindow>
  );
}
