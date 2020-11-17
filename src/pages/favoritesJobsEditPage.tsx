import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

import SideBar from 'src/components/sideBar';
import {
  NumericFilterField,
  CheckBoxFilterField,
} from 'src/components/searchBar';
import {
  apiUrl,
  notificationOptions,
  favoritesUrl,
  cities,
} from 'src/constants';
import useUserStore from 'src/userStore';

export default function FavoritesJobsEditPage(): React.ReactElement {
  const { id } = useParams();
  const user = useUserStore();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [salaryMin, setSalaryMin] = useState(0.00);
  const [salaryMax, setSalaryMax] = useState(0.00);
  const [withSalary, setWithSalary] = useState(false);
  const [notification, setNotification] = useState(0);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setTitle(event.target.value);
  }

  function handleCityChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setCity(event.target.value);
  }

  function handleSalaryMinChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const salary = Number(event.target.value);
    if (salary < 0) {
      setSalaryMin(0);
    } else {
      setSalaryMin(salary);
    }
  }

  function handleSalaryMaxChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const salary = Number(event.target.value);
    if (salary < 0) {
      setSalaryMax(0);
    } else {
      setSalaryMax(salary);
    }
  }

  function handleWithSalaryChange(): void {
    setWithSalary((prev) => !prev);
  }

  function handleNotificationChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setNotification(Number(event.target));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    fetch(`${apiUrl + favoritesUrl}/jobs/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        title,
        city,
        salary_min: salaryMin || null,
        salary_max: salaryMax || null,
        with_salary: withSalary,
        notification_freq: notification,
      }),
    })
      .then((response) => response.json().then((data) => ({
        status: response.status,
        data,
      })))
      .catch((error) => {
        throw new Error(error);
      });
  }

  const fetchFavoriteGame = useCallback((): void => {
    const URL = `${apiUrl + favoritesUrl}/jobs/${id}/`;
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title || '');
        setSalaryMin(Number(data.salary_min) || 0);
        setSalaryMax(Number(data.salary_max) || 0);
        setWithSalary(data.psplus_salary || false);
        setNotification(data.notification_freq);
        setLoading(false);
      });
  }, [id]);

  function deleteFavoriteJob(): void {
    const URL = `${apiUrl + favoritesUrl}/jobs/${id}/`;
    fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    });
  }

  useEffect(() => {
    fetchFavoriteGame();
  }, [fetchFavoriteGame]);

  return (
    <>
      <SideBar
        username={user.username}
        email={user.email}
        image={user.image}
      />
      <div className="results_container">
        {loading ? (
          <div className="lds-dual-ring" />
        ) : (
          ''
        )}
        <form
          method="post"
          onSubmit={handleSubmit}
          className={loading ? 'loading' : ''}
        >
          <div className="favorites_container">
            <ul className="favorites_list window">
              <h2 className="favorites_header">Manage Parameters</h2>
              <li className="favorites_field">
                <label className="numeric_filter_label" htmlFor="id_title">
                  Job title
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleTitleChange}
                  className="field search_field_games"
                  placeholder="Game title..."
                  maxLength={100}
                  id="id_title"
                />
              </li>
              <li className="favorites_field">
                <label className="numeric_filter_label" htmlFor="id_title">City</label>
                <select
                  name="city"
                  className="field city_filter city_separate"
                  id="id_city"
                  value={city}
                  onChange={handleCityChange}
                >
                  {cities.map(({ value, text }) => (
                    <option value={value} key={value}>{text}</option>
                  ))}
                </select>
              </li>
              <li className="favorites_field">
                <NumericFilterField
                  id="salary_min"
                  value={salaryMin}
                  label="From"
                  step={100}
                  onChange={handleSalaryMinChange}
                />
              </li>
              <li className="favorites_field">
                <NumericFilterField
                  id="salary_max"
                  value={salaryMax}
                  label="To"
                  step={100}
                  onChange={handleSalaryMaxChange}
                />
              </li>
              <li className="filter_field">
                <CheckBoxFilterField
                  id="with_salary"
                  checked={withSalary}
                  onChange={handleWithSalaryChange}
                  label="Only with salary"
                />
              </li>
              <li className="favorites_field favorites_field_city_filter">
                <label className="numeric_filter_label" htmlFor="notification_freq">
                  Notify me
                </label>
                <select
                  className="field city_filter city_separate"
                  id="notification_freq"
                  value={notification}
                  onChange={handleNotificationChange}
                >
                  {Object.entries(notificationOptions).map(([key, value]) => (
                    <option value={key} key={key}>{value}</option>
                  ))}
                </select>
              </li>
            </ul>
            <ul className="favorites_list window">
              <div className="favorites_buttons">
                <input
                  type="submit"
                  name="save"
                  value="SAVE"
                  className="favorites_button big_button"
                />
                <Link
                  to="/favorites"
                  className="favorites_button_redirect big_button danger_button"
                  onClick={deleteFavoriteJob}
                >
                  DELETE
                </Link>
                <Link
                  to="/favorites"
                  className="favorites_button_redirect big_button"
                >
                  BACK
                </Link>
              </div>
            </ul>
          </div>
        </form>
      </div>
    </>
  );
}
