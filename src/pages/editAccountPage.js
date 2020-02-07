import React, { useState } from 'react';
import {
  AuthField,
  AuthWindow,
  AuthButton
} from './../components/authForms';

export default function EditAccountPage(props) {
  let [username, setUsername] = useState({value: "IgorBolotnikov"});
  let [email, setEmail] = useState({value: "igorbolotnikov1993@gmail.com"});

  function handleUsernameChange(event) {
    setUsername({value: event.target.value});
  }

  function handleEmailChange(event) {
    setEmail({value: event.target.value});
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(username.value, email.value);
  }

  return (
    <AuthWindow
      header="Edit Account"
    >
      <form
        className="update_form"
        method="POST"
        enctype="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <AuthField
          type="text"
          value={username}
          maxlength="150"
          onChange={handleUsernameChange}
          value={username.value}
        />
        <AuthField
          type="email"
          value={email}
          maxlength="254"
          onChange={handleEmailChange}
          value={email.value}
        />
        <label for="id_image" className="account_image_label">Account avatar</label>
        <input type="file" name="image" className="account_image_field" accept="image/*" id="id_image"/>
        <input type="submit" value="SUBMIT" className="account_button big_button"/>
      </form>
      <div className="additional_options">
        <a className="account_button big_button" href="/auth/change_password">Change Password</a>
        <a className="account_button danger_button" href="/auth/delete_account">Delete Account</a>
      </div>
    </AuthWindow>
  );
}
