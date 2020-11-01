import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SideBar from 'src/components/sideBar';
import {
  NumericFilterField,
  CheckBoxFilterField
} from 'src/components/searchBar';
import { apiUrl, notificationOptions, favoritesUrl } from 'src/constants';

export default function FavoritesGamesEditPage(props) {
  const { id } = useParams();
  const [loading, setLoading] = useState({value: false});
  const [title, setTitle] = useState({value: ""});
  const [priceMin, setPriceMin] = useState({value: 0.00});
  const [priceMax, setPriceMax] = useState({value: 0.00});
  const [PSPlusPrice, setPSPlusPrice] = useState({value: false});
  const [discountPrice, setDiscountPrice] = useState({value: false});
  const [free, setFree] = useState({value: false});
  const [notification, setNotification] = useState({value: 0});

  function handleTitleChange(event) {
    setTitle({value: event.target.value});
  }

  function handlePriceMinChange(event) {
    if (event.target.value < 0) {
      setPriceMin({value: 0});
    } else {
      setPriceMin({value: event.target.value});
    }
  }

  function handlePriceMaxChange(event) {
    if (event.target.value < 0) {
      setPriceMax({value: 0});
    } else {
      setPriceMax({value: event.target.value});
    }
  }

  function handlePSPlusPriceChange(event) {
    setPSPlusPrice({value: !PSPlusPrice.value});
  }

  function handleDiscountPriceChange(event) {
    setDiscountPrice({value: !discountPrice.value});
  }

  function handleFreeChange(event) {
    setFree({value: !free.value});
  }

  function handleNotificationChange(event) {
    setNotification({value: event.target.value});
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(apiUrl + favoritesUrl + "/games/" + id + "/", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        title: title.value,
        price_min: priceMin.value || null,
        price_max: priceMax.value || null,
        psplus_price: PSPlusPrice.value,
        initial_price: discountPrice.value,
        free: free.value,
        notification_freq: notification.value
      })
    })
    .then(response => response.json().then(data => ({status: response.status, data: data})))
    .then(data => {
      if (data.status === 200) {
      } else {
      }
    })
    .catch(error => console.error('Error:', error));
  }

  function deleteFavoriteGame(event) {
    const URL = apiUrl + favoritesUrl + "/games/" + id + "/";
    fetch(URL, {
      method: 'DELETE',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('token')}`,
      }
    })
  }

  function fetchFavoriteGame() {
    const URL = apiUrl + favoritesUrl + "/games/" + id + "/";
    window.scrollTo(0, 0);
    setLoading({value: true});
    fetch(URL, { headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('token')}`,
    }})
      .then(response => response.json())
      .then(data => {
        setTitle({value: data.title || ""});
        setPriceMin({value: Number(data.price_min) || 0});
        setPriceMax({value: Number(data.price_max) || 0});
        setPSPlusPrice({value: data.psplus_price || false});
        setDiscountPrice({value: data.initial_price || false});
        setFree({value: data.free || false});
        setNotification({value: data.notification_freq});
        setLoading({value: false});
      })
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
                <label className="numeric_filter_label" htmlFor="id_title">Game title</label>
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
                <NumericFilterField
                  id="price_min"
                  value={priceMin.value}
                  label="From"
                  step={100}
                  onChange={handlePriceMinChange}
                />
              </li>
              <li className="favorites_field">
                <NumericFilterField
                  id="price_max"
                  value={priceMax.value}
                  label="To"
                  step={100}
                  onChange={handlePriceMaxChange}
                />
              </li>
              <li className="filter_field">
                <CheckBoxFilterField
                  id="psplus_price"
                  checked={PSPlusPrice.value}
                  onChange={handlePSPlusPriceChange}
                  label="PS Plus offer"
                />
              </li>
              <li className="filter_field">
                <CheckBoxFilterField
                  id="initial_price"
                  checked={discountPrice.value}
                  onChange={handleDiscountPriceChange}
                  label="With discount"
                />
              </li>
              <li className="filter_field">
                <CheckBoxFilterField
                  id="free"
                  checked={free.value}
                  onChange={handleFreeChange}
                  label="FREE"
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
                  {Object.entries(notificationOptions).map(([key, value]) => (
                    <option value={key} key={key}>{value}</option>
                  ))}
                </select>
              </li>
            </ul>
            <ul className="favorites_list window">
              <div className="favorites_buttons">
                <input type="submit" name="save" value="SAVE" className="favorites_button big_button"/>
                <Link to="/favorites" className="favorites_button_redirect big_button danger_button" onClick={deleteFavoriteGame}>DELETE</Link>
                <Link to="/favorites" className="favorites_button_redirect big_button">BACK</Link>
              </div>
            </ul>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
