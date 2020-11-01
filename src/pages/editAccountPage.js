import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AuthField,
  AuthWindow
} from 'src/components/authForms';
import { apiUrl, userUrl } from 'src/constants';
import useUserStore from 'src/userStore';

export default function EditAccountPage(props) {
  const user = useUserStore();
  const [username, setUsername] = useState({value: user.username});
  const [email, setEmail] = useState({value: user.email});
  const [image, setImage] = useState({fileString: user.image});
  const [formErrors, setFormErrors] = useState({
    username: [],
    email: [],
    image: []
  });

  function handleUsernameChange(event) {
    setUsername({value: event.target.value});
  }

  function handleEmailChange(event) {
    setEmail({value: event.target.value});
  }

  function handleFileChange(event) {
    let reader = new FileReader();
    reader.addEventListener("load", function () {
      setImage({fileString: reader.result});
    }, false);
    reader.readAsDataURL(event.target.files[0]);
  }

  function validateUsername() {
    let errors = [];
    if (username.value.length > 150) {
      errors.push('Username is too long');
    }
    if (username.value.length === 0) {
      errors.push('Username is required');
    }
    return errors;
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
    const usernameErrors = validateUsername();
    const emailErrors = validateEmail();
    const usernameValid = usernameErrors.length === 0;
    const emailValid = emailErrors.length === 0;
    const formValid = usernameValid && emailValid;
    setFormErrors({
      username: usernameErrors,
      email: emailErrors,
      image: []
    })
    return formValid;
  }

  function getRequestBody() {
    const body = {};
    if (username.value !== user.username) {
      body.username = username.value;
    }
    if (email.value !== user.email) {
      body.email = email.value;
    }
    if (image.fileString && image.fileString !== user.image) {
      body.image = image.fileString;
    }
    return body;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formValid = validateForm();
    if (!formValid) {
      return;
    }
    fetch(apiUrl + userUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        image: image.value
      })
    })
    .then(response => response.json().then(data => ({status: response.status, data: data})))
    .then(object => {
      if (object.status === 200) {
        localStorage.setItem('token', object.data.token);
        user.update(object.data);
      } else if (object.status === 400) {
        setFormErrors({
          username: object.data.username || [],
          email: object.data.email || [],
          image: object.data.image || [],
        })
      }
    })
    .catch(error => console.error('Error:', error));
  }

  return (
    <AuthWindow
      header="Edit Account"
    >
      <form
        className="update_form"
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <AuthField
          type="text"
          maxlength="150"
          onChange={handleUsernameChange}
          value={username.value}
          errors={formErrors.username}
        />
        <AuthField
          type="email"
          maxlength="254"
          onChange={handleEmailChange}
          value={email.value}
          errors={formErrors.email}
        />
        <label htmlFor="id_image" className="account_image_label">Account avatar</label>
        <input
          type="file"
          name="image"
          className="account_image_field"
          accept="image/*"
          id="id_image"
          onChange={handleFileChange}
        />
        {formErrors.image.length !== 0 && formErrors.image.map(error => (
          <div key={error} class="error_message_container">
            <span class="error_message">{error}</span>
          </div>
        ))}
        <input type="submit" value="SUBMIT" className="account_button big_button"/>
      </form>
      <div className="additional_options">
        <Link className="account_button big_button" to="/auth/change-password">Change Password</Link>
        <Link className="account_button danger_button" to="/auth/delete-account">Delete Account</Link>
      </div>
    </AuthWindow>
  );
}
