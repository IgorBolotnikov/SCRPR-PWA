import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { Link, useParams } from 'react-router-dom';

import SideBar from 'src/components/sideBar';
import {
  NumericFilterField,
  CheckBoxFilterField,
} from 'src/components/searchBar';
import { apiUrl, notificationOptions, favoritesUrl } from 'src/constants';
import { UserContext } from 'src/userStore';

export default function FavoritesGamesEditPage(): React.ReactElement {
  const { id } = useParams();
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [priceMin, setPriceMin] = useState(0.00);
  const [priceMax, setPriceMax] = useState(0.00);
  const [PSPlusPrice, setPSPlusPrice] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(false);
  const [free, setFree] = useState(false);
  const [notification, setNotification] = useState(0);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setTitle(event.target.value);
  }

  function handlePriceMinChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const price = Number(event.target);
    if (price < 0) {
      setPriceMin(0);
    } else {
      setPriceMin(price);
    }
  }

  function handlePriceMaxChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const price = Number(event.target);
    if (price < 0) {
      setPriceMax(0);
    } else {
      setPriceMax(price);
    }
  }

  function handlePSPlusPriceChange(): void {
    setPSPlusPrice((prev) => !prev);
  }

  function handleDiscountPriceChange(): void {
    setDiscountPrice((prev) => !prev);
  }

  function handleFreeChange(): void {
    setFree((prev) => !prev);
  }

  function handleNotificationChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setNotification(Number(event.target));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    fetch(`${apiUrl + favoritesUrl}/games/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        title,
        price_min: priceMin || null,
        price_max: priceMax || null,
        psplus_price: PSPlusPrice,
        initial_price: discountPrice,
        free,
        notification_freq: notification,
      }),
    })
      .then((response) => response.json()
        .then((data) => ({ status: response.status, data })))
      .catch((error) => {
        throw new Error(error);
      });
  }

  function deleteFavoriteGame(): void {
    const URL = `${apiUrl + favoritesUrl}/games/${id}/`;
    fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    });
  }

  const fetchFavoriteGame = useCallback((): void => {
    const url = `${apiUrl + favoritesUrl}/games/${id}/`;
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title || '');
        setPriceMin(Number(data.price_min) || 0);
        setPriceMax(Number(data.price_max) || 0);
        setPSPlusPrice(data.psplus_price || false);
        setDiscountPrice(data.initial_price || false);
        setFree(data.free || false);
        setNotification(data.notification_freq);
        setLoading(false);
      });
  }, [id]);

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
                <label
                  className="numeric_filter_label"
                  htmlFor="id_title"
                >
                  Game title
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
                <NumericFilterField
                  id="price_min"
                  value={priceMin}
                  label="From"
                  step={100}
                  onChange={handlePriceMinChange}
                />
              </li>
              <li className="favorites_field">
                <NumericFilterField
                  id="price_max"
                  value={priceMax}
                  label="To"
                  step={100}
                  onChange={handlePriceMaxChange}
                />
              </li>
              <li className="filter_field">
                <CheckBoxFilterField
                  id="psplus_price"
                  checked={PSPlusPrice}
                  onChange={handlePSPlusPriceChange}
                  label="PS Plus offer"
                />
              </li>
              <li className="filter_field">
                <CheckBoxFilterField
                  id="initial_price"
                  checked={discountPrice}
                  onChange={handleDiscountPriceChange}
                  label="With discount"
                />
              </li>
              <li className="filter_field">
                <CheckBoxFilterField
                  id="free"
                  checked={free}
                  onChange={handleFreeChange}
                  label="FREE"
                />
              </li>
              <li className="favorites_field favorites_field_city_filter">
                <label
                  className="numeric_filter_label"
                  htmlFor="notification_freq"
                >
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
                  onClick={deleteFavoriteGame}
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
