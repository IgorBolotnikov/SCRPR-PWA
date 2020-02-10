import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SideBar from './../components/sideBar';
import {
  NumericFilterField,
  CheckBoxFilterField
} from './../components/searchBar';
import { API_URL, NOTIFICATION_OPTIONS } from './../constants';

const FAVORITES_GAMES_URL = "/favorites/games/";

export default function FavoritesGamesEditPage(props) {
  const { id } = useParams();
  let [loading, setLoading] = useState({value: false});
  let [title, setTitle] = useState({value: ""});
  let [priceMin, setPriceMin] = useState({value: 0.00});
  let [priceMax, setPriceMax] = useState({value: 0.00});
  let [PSPlusPrice, setPSPlusPrice] = useState({value: false});
  let [discountPrice, setDiscountPrice] = useState({value: false});
  let [free, setFree] = useState({value: false});
  let [notification, setNotification] = useState({value: 0});

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
    console.log(notification);
  }

  function deleteFavoriteGame(event) {
    console.log('Pressed delete!');
  }

  function fetchFavoriteGame() {
    const URL = API_URL + FAVORITES_GAMES_URL + id;
    console.log(URL);
    window.scrollTo(0, 0);
    setLoading({value: true});
    fetch(URL, { headers: {
      'Content-Type': 'application/json',
    }})
      .then(response => response.json())
      .then(data => {
        setTitle({value: data.title || ""});
        setPriceMin({value: data.price_min || 0});
        setPriceMax({value: data.price_max || 0});
        setPSPlusPrice({value: data.psplus_price || false});
        setDiscountPrice({value: data.initial_price || false});
        setFree({value: data.free || false})
        setLoading({value: false});
      })
  }

  useEffect(() => {
    fetchFavoriteGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

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
                  {NOTIFICATION_OPTIONS.map(option => (
                    <option value={option.value} key={option.value}>{option.text}</option>
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
