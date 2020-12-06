// Callback for scheduled JWT refreshment
// When JWT expires or is not valid => reset all user data to blank values
// If JWT is successfully refreshed => update user data with
// received payload and update JWT
import { apiUrl, refreshTokenUrl } from 'src/constants';
import { resetUser, updateUser } from 'src/shared/state/user/user.service';

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function setToken(token: string): void {
  localStorage.setItem('token', token);
}

export function removeToken(): void {
  localStorage.removeItem('token');
}

export function refreshToken(): void {
  fetch(apiUrl + refreshTokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: localStorage.getItem('token') }),
  })
    .then((response) => response.json().then((data) => ({
      status: response.status,
      data,
    })))
    .then((object) => {
      if (object.status === 200) {
        setToken(object.data.token);
        updateUser({
          ...object.data.user,
          isAuthenticated: true,
        });
      } else if (object.status === 400) {
        removeToken();
        resetUser();
      }
    })
    .catch((error) => {
      throw new Error(`Error: ${error}`);
    });
}
