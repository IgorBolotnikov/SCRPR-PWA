// Change this URL if API is relocated
export const API_URL = 'https://scrpr-develop.herokuapp.com/api/v1';

export const GET_TOKEN_URL = '/auth/obtain-token';
export const REFRESH_TOKEN_URL = '/auth/refresh-token';

export const NEWS_URL = '/news';
export const FAVORITES_URL = '/favorites';
export const USER_URL = '/user';
export const CREATE_USER_URL = '/user/create';
export const CHANGE_PASSWORD_URL = '/user/update-password';
export const RESET_PASSWORD_URL = '/password_reset/';
export const RESET_PASSWORD_CONFIRM_URL = '/password_reset/confirm/';
export const RESET_PASSWORD_VALIDATE_URL = '/password_reset/validate_token/';
export const RATE_URL = '/rate'

export const JOBS_URL = "/jobs?";

export const JWT_REFRESH_TIME = 50 * 60 * 1000; // In milliseconds

export const NOTIFICATION_OPTIONS = {
  0: "Never",
  1: "Daily",
  7: "Weekly",
  30: "Monthly"
}

export const CITIES = [
  {
    value: "",
    text: "All Ukraine"
  },
  {
    value: "Киев",
    text: "Kyiv"
  },
  {
    value: "Одесса",
    text: "Odesa"
  },
  {
    value: "Днепр",
    text: "Dnipro"
  },
  {
    value: "Харьков",
    text: "Kharkiv"
  },
  {
    value: "Львов",
    text: "Lviv"
  },
]
