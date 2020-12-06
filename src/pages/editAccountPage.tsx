import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  AuthField,
  AuthWindow,
} from 'src/components/authForms';
import { apiUrl, userUrl } from 'src/constants';
import { updateUser } from 'src/shared/state/user/user.service';
import { UserContext } from 'src/userStore';

export default function EditAccountPage(): React.ReactElement {
  const user = useContext(UserContext);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.image);
  const [formErrors, setFormErrors] = useState({
    username: [] as string[],
    email: [] as string[],
    image: [] as string[],
  });

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImage(reader.result as string);
    }, false);
    if (event.target.files) {
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  function validateUsername(): string[] {
    const errors = [];
    if (username.length > 150) {
      errors.push('Username is too long');
    }
    if (username.length === 0) {
      errors.push('Username is required');
    }
    return errors;
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
    const usernameErrors = validateUsername();
    const emailErrors = validateEmail();
    const usernameValid = usernameErrors.length === 0;
    const emailValid = emailErrors.length === 0;
    const formValid = usernameValid && emailValid;
    setFormErrors({
      username: usernameErrors,
      email: emailErrors,
      image: [],
    });
    return formValid;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formValid = validateForm();
    if (!formValid) {
      return;
    }
    fetch(apiUrl + userUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        username,
        email,
        image,
      }),
    })
      .then((response) => response.json().then((data) => ({
        status: response.status,
        data,
      })))
      .then((object) => {
        if (object.status === 200) {
          localStorage.setItem('token', object.data.token);
          updateUser(object.data);
        } else if (object.status === 400) {
          setFormErrors({
            username: object.data.username || [],
            email: object.data.email || [],
            image: object.data.image || [],
          });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
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
          maxLength={150}
          onChange={handleUsernameChange}
          value={username}
          errors={formErrors.username}
        />
        <AuthField
          type="email"
          maxLength={254}
          onChange={handleEmailChange}
          value={email}
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
        {formErrors.image.length !== 0 && formErrors.image.map((error) => (
          <div key={error} className="error_message_container">
            <span className="error_message">{error}</span>
          </div>
        ))}
        <input type="submit" value="SUBMIT" className="account_button big_button" />
      </form>
      <div className="additional_options">
        <Link className="account_button big_button" to="/auth/change-password">
          Change Password
        </Link>
        <Link className="account_button danger_button" to="/auth/delete-account">
          Delete Account
        </Link>
      </div>
    </AuthWindow>
  );
}
