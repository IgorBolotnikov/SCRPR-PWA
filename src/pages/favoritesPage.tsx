import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SideBar from 'src/components/sideBar';
import useUserStore from 'src/userStore';
import { apiUrl, favoritesUrl } from 'src/constants';

type FavoritesItem = {
  id: number;
  title: string;
  details: string;
  notification: string;
};

export default function FavoritesPage(): React.ReactElement {
  const [loadingGames, setLoadingGames] = useState({ value: false });
  const [favoritesGames, setFavoritesGames] = useState({ pagination: [], results: [] });
  const [loadingJobs, setLoadingJobs] = useState({ value: false });
  const [favoritesJobs, setFavoritesJobs] = useState({ pagination: [], results: [] });
  const user = useUserStore();

  const showGames = favoritesGames.results.length !== 0;
  const showJobs = favoritesJobs.results.length !== 0;

  function fetchFavoritesGames(): void {
    setLoadingGames({ value: true });
    fetch(
      `${apiUrl}${favoritesUrl}/games/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setFavoritesGames(data);
        setLoadingGames({ value: false });
      });
  }

  function fetchFavoritesJobs(): void {
    setLoadingJobs({ value: true });
    fetch(
      `${apiUrl}${favoritesUrl}/jobs/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setFavoritesJobs(data);
        setLoadingJobs({ value: false });
      });
  }

  useEffect(() => {
    fetchFavoritesGames();
    fetchFavoritesJobs();
  }, []);

  return (
    <>
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
              <div className="lds-dual-ring" />
            ) : (
              ''
            )}
            {showGames ? favoritesGames.results.map((item: FavoritesItem) => (
              <FavoritesEntry
                key={item.id}
                link={`games/${item.id}`}
                title={item.title}
                additionalInfo={item.details}
                notificationFrequency={item.notification}
              />
            )) : (<h3 className="no_favorites_header">No Favorites yet</h3>)}
          </FavoritesList>
          <br />
          <FavoritesList
            header="Favorites in Jobs"
          >
            {loadingJobs.value ? (
              <div className="lds-dual-ring" />
            ) : (
              ''
            )}
            {showJobs ? favoritesJobs.results.map((item: FavoritesItem) => (
              <FavoritesEntry
                key={item.id}
                link={`jobs/${item.id}`}
                title={item.title}
                additionalInfo={item.details}
                notificationFrequency={item.notification}
              />
            )) : (<h3 className="no_favorites_header">No Favorites yet</h3>)}
          </FavoritesList>
        </div>
      </div>
    </>
  );
}

interface FavoritesEntryProps {
  link: string;
  title: string;
  additionalInfo: string;
  notificationFrequency: string;
}

function FavoritesEntry({
  link,
  title,
  additionalInfo,
  notificationFrequency,
}: FavoritesEntryProps): React.ReactElement {
  return (
    <Link to={`/favorites/${link}`}>
      <li className="favorites_list_item">
        <div className="favorites_list_item_title">
          &quot;
          {title}
          &quot;
          {
            additionalInfo
            && <span className="favorites_list_item_additional">{additionalInfo}</span>
          }
        </div>
        <div className="favorites_list_item_notifications">
          {notificationFrequency}
        </div>
      </li>
    </Link>
  );
}

interface FavoritesListProps {
  header: string;
  children: React.ReactNode;
}

function FavoritesList({ header, children }: FavoritesListProps): React.ReactElement {
  return (
    <ul className="favorites_list">
      <h2 className="favorites_header">{header}</h2>
      {children}
    </ul>
  );
}
