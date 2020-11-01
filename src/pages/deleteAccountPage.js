import React from 'react';
import { Link } from 'react-router-dom';
import { AuthWindow } from 'src/components/authForms';
import { apiUrl, userUrl } from 'src/constants';
import useUserStore from 'src/userStore';

export default function DeleteAccountPage(props) {
  const user = useUserStore();

  function handleSubmit(event) {
    event.prevertDefault();
    fetch(apiUrl + userUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('token')}`,
      },
    })
      .then(response => response.json().then(data => ({status: response.status, data: data})))
      .then(object => {
        if (object.status === 200) {
          localStorage.removeItem('token', object.data.token);
          user.reset();
        }
      })
      .catch(error => console.error('Error:', error));
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
