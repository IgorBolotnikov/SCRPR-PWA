import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SideBar from './../components/sideBar';
import useUserStore from './../userStore';
import { API_URL, FAVORITES_URL } from './../constants';

export default function FavoritesPage(props) {
  const [loadingGames, setLoadingGames] = useState({value: false});
  const [favoritesGames, setFavoritesGames] = useState({pagination: [], results: []});
  const [loadingJobs, setLoadingJobs] = useState({value: false});
  const [favoritesJobs, setFavoritesJobs] = useState({pagination: [], results: []});
  const user = useUserStore();

  function fetchFavoritesGames() {
    setLoadingGames({value: true});
    fetch(
      API_URL + FAVORITES_URL + "/games/",
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('token')}`,
        }
      })
      .then(response => response.json())
      .then(data => {
        setFavoritesGames(data);
        setLoadingGames({value: false})
      });
  }

  function fetchFavoritesJobs() {
    setLoadingJobs({value: true});
    fetch(
      API_URL + FAVORITES_URL + "/jobs/",
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('token')}`,
        }
      })
      .then(response => response.json())
      .then(data => {
        setFavoritesJobs(data);
        setLoadingJobs({value: false})
      });
  }

  useEffect(() => {
    fetchFavoritesGames();
    fetchFavoritesJobs();
  }, [])

  return (
    <React.Fragment>
      <SideBar
        username={user.username}
        email={user.email}
        image={user.image}
      />
      <div className="results_container">
        <div className="favorites_container window">
          <FavoritesList
            header="Favorites in Games"
          >
            {loadingGames.value ? (
              <div className="lds-dual-ring"></div>
            ) : (
              ""
            )}
            { favoritesGames.results.length !== 0 ? favoritesGames.results.map(item => {
              return (
                <FavoritesEntry
                  key={item.id}
                  link={"games/" + item.id}
                  title={item.title}
                  additionalInfo={item.details}
                  notificationFrequancy={item.notification}
                />
              );
            }) : (<h3 className="no_favorites_header">No Favorites yet</h3>) }
          </FavoritesList>
          <br />
          <FavoritesList
            header="Favorites in Jobs"
          >
            {loadingJobs.value ? (
              <div className="lds-dual-ring"></div>
            ) : (
              ""
            )}
            { favoritesJobs.results.length !== 0 ? favoritesJobs.results.map(item => {
              return (
                <FavoritesEntry
                  key={item.id}
                  link={"jobs/" + item.id}
                  title={item.title}
                  additionalInfo={item.details}
                  notificationFrequancy={item.notification}
                />
              );
            })  : (<h3 className="no_favorites_header">No Favorites yet</h3>) }
          </FavoritesList>
        </div>
      </div>
    </React.Fragment>
  );
}

function FavoritesEntry(props) {
  return (
    <Link to={"/favorites/" + props.link}>
      <li className="favorites_list_item">
        <div className="favorites_list_item_title">
          "{props.title}"
          {props.additionalInfo && <span className="favorites_list_item_additional">{props.additionalInfo}</span>}
        </div>
        <div className="favorites_list_item_notifications">
          {props.notificationFrequancy}
        </div>
      </li>
    </Link>
  );
}

function FavoritesList(props) {
  return (
    <ul className="favorites_list">
      <h2 className="favorites_header">{props.header}</h2>
      {props.children}
    </ul>
  );
}
