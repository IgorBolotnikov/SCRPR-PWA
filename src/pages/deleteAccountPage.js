import React from 'react';
import { Link } from 'react-router-dom';
import {
  AuthField,
  AuthWindow,
  AuthButton
} from './../components/authForms';

export default function DeleteAccountPage(props) {
  function handleSubmit(event) {
    event.prevertDefault();
  }

  return (
    <AuthWindow
      header="Delete Account"
      warning="Are you sure you want to send your account to the infinite void space, from which it can't go back?"
    >
      <form className="update_form" method="POST" onSubmit={handleSubmit}>
        <div className="button_options">
          <input type="submit" value="DELETE" className="auth_button danger_button"/>
          <Link className="auth_button big_button" to="/auth/edit-account">BACK</Link>
        </div>
      </form>
    </AuthWindow>
  );
}
