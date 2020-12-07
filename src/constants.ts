// Change this URL if API is relocated
export const apiUrl = 'https://scrpr-develop.herokuapp.com/api/v1';

export const getTokenUrl = '/auth/obtain-token';
export const refreshTokenUrl = '/auth/refresh-token';

export const newsUrl = '/news';
export const favoritesUrl = '/favorites';
export const userUrl = '/user';
export const createUserUrl = '/user/create';
export const changePasswordUrl = '/user/update-password';
export const resetPasswordUrl = '/password_reset/';
export const resetPasswordConfirmUrl = '/password_reset/confirm/';
export const resetPasswordValidateUrl = '/password_reset/validate_token/';
export const rateUrl = '/rate';

export const jobsUrl = '/jobs?';
export const gamesUrl = '/games?';

export const jwtRefreshTime = 50 * 60 * 1000; // In milliseconds

export const notificationOptions: { [key: number]: string } = {
  0: 'Never',
  1: 'Daily',
  7: 'Weekly',
  30: 'Monthly',
};

export const cities = [
  {
    value: '',
    text: 'All Ukraine',
  },
  {
    value: 'Киев',
    text: 'Kyiv',
  },
  {
    value: 'Одесса',
    text: 'Odesa',
  },
  {
    value: 'Днепр',
    text: 'Dnipro',
  },
  {
    value: 'Харьков',
    text: 'Kharkiv',
  },
  {
    value: 'Львов',
    text: 'Lviv',
  },
];
