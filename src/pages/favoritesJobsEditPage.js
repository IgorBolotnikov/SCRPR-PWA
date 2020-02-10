import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SideBar from './../components/sideBar';
import {
  NumericFilterField,
  CheckBoxFilterField
} from './../components/searchBar';
import {
  API_URL,
  NOTIFICATION_OPTIONS,
  FAVORITES_URL,
  CITIES
} from './../constants';

export default function FavoritesJobsEditPage(props) {
  const { id } = useParams();
  const [loading, setLoading] = useState({value: false});
  const [title, setTitle] = useState({value: ""});
  const [city, setCity] = useState({value: ""});
  const [salaryMin, setSalaryMin] = useState({value: 0.00});
  const [salaryMax, setSalaryMax] = useState({value: 0.00});
  const [withSalary, setWithSalary] = useState({value: false});
  const [notification, setNotification] = useState({value: ""});

  function handleTitleChange(event) {
    setTitle({value: event.target.value});
  }

  function handleCityChange(event) {
    setCity({value: event.target.value});
  }

  function handleSalaryMinChange(event) {
    if (event.target.value < 0) {
      setSalaryMin({value: 0});
    } else {
      setSalaryMin({value: event.target.value});
    }
  }

  function handleSalaryMaxChange(event) {
    if (event.target.value < 0) {
      setSalaryMax({value: 0});
    } else {
      setSalaryMax({value: event.target.value});
    }
  }

  function handleWithSalaryChange(event) {
    setWithSalary({value: !withSalary.value});
  }

  function handleNotificationChange(event) {
    setNotification({value: event.target.value});
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(notification.text);
    fetch(API_URL + FAVORITES_URL + '/jobs/' + id + "/", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        title: title.value,
        city: city.value,
        salary_min: salaryMin.value || null,
        salary_max: salaryMax.value || null,
        with_salary: withSalary.value,
        notification_freqency: notification.value
      })
    })
    .then(response => response.json().then(data => ({status: response.status, data: data})))
    .then(data => {
      if (data.status === 200) {
        console.log(data);
        console.log("Created!");
      } else {
        console.log(data);
        console.log("Not created!");
      }
    })
    .catch(error => console.error('Error:', error));
  }

  function fetchFavoriteGame() {
    const URL = API_URL + FAVORITES_URL + "/jobs/" + id + "/";
    console.log(URL);
    window.scrollTo(0, 0);
    setLoading({value: true});
    fetch(URL, { headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('token')}`,
    }})
      .then(response => response.json())
      .then(data => {
        setTitle({value: data.title || ""});
        setSalaryMin({value: Number(data.salary_min) || 0});
        setSalaryMax({value: Number(data.salary_max) || 0});
        setWithSalary({value: data.psplus_salary || false});
        setLoading({value: false});
      })
  }

  function deleteFavoriteJob(event) {
    console.log("Deleted entry");
  }

  useEffect(() => {
    fetchFavoriteGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <SideBar
        userId={1}
        username="IgorBolotnikov"
        email="igorbolotnikov1993@gmail.com"
        image={null}
      />
      <div className="results_container">
        {loading.value ? (
          <div className="lds-dual-ring"></div>
        ) : (
          ""
        )}
        <form
          method="post"
          onSubmit={handleSubmit}
          className={loading.value ? "loading" : ""}
        >
          <div className="favorites_container">
            <ul className="favorites_list window">
              <h2 className="favorites_header">Manage Parameters</h2>
              <li className="favorites_field">
                <label className="numeric_filter_label" htmlFor="id_title">Job title</label>
                <input
                  type="text"
                  name="title"
                  value={title.value}
                  onChange={handleTitleChange}
                  className="field search_field_games"
                  placeholder="Game title..."
                  maxLength="100"
                  id="id_title"
                />
              </li>
              <li className="favorites_field">
                <label className="numeric_filter_label" htmlFor="id_title">City</label>
                <select
                  name="city"
                  className="field city_filter city_separate"
                  id="id_city"
                  value={city.value}
                  onChange={handleCityChange}
                >
                  {CITIES.map(city => (
                    <option value={city.value} key={city.value}>{city.text}</option>
                  ))}
                </select>
              </li>
              <li className="favorites_field">
                <NumericFilterField
                  id="salary_min"
                  value={salaryMin.value}
                  label="From"
                  step={100}
                  onChange={handleSalaryMinChange}
                />
              </li>
              <li className="favorites_field">
                <NumericFilterField
                  id="salary_max"
                  value={salaryMax.value}
                  label="To"
                  step={100}
                  onChange={handleSalaryMaxChange}
                />
              </li>
              <li className="filter_field">
                <CheckBoxFilterField
                  id="with_salary"
                  checked={withSalary.value}
                  onChange={handleWithSalaryChange}
                  label="Only with salary"
                />
              </li>
              <li className="favorites_field favorites_field_city_filter">
                <label className="numeric_filter_label" htmlFor="notification_freq">Notify me</label>
                <select
                  className="field city_filter city_separate"
                  id="notification_freq"
                  value={notification.value}
                  onChange={handleNotificationChange}
                >
                  {NOTIFICATION_OPTIONS.map(option => (
                    <option value={option.text} key={option.value}>{option.text}</option>
                  ))}
                </select>
              </li>
            </ul>
            <ul className="favorites_list window">
              <div className="favorites_buttons">
                <input type="submit" name="save" value="SAVE" className="favorites_button big_button"/>
                <Link to="/favorites" className="favorites_button_redirect big_button danger_button" onClick={deleteFavoriteJob}>DELETE</Link>
                <Link to="/favorites" className="favorites_button_redirect big_button">BACK</Link>
              </div>
            </ul>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
