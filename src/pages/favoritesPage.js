import React from 'react';
import SideBar from './../components/sideBar';

export default function FavoritesPage(props) {

  return (
    <React.Fragment>
      <SideBar
        userId={1}
        username="IgorBolotnikov"
        email="igorbolotnikov1993@gmail.com"
        image={null}
      />

      <div className="results_container">
        <div className="favorites_container window">
          <FavoritesList
            header="Favorites in Games"
          >
            <FavoritesEntry
              link="games/3"
              title="observation"
              additionalInfo=", With discount"
              notificationFrequancy="Every day"
            />
            <FavoritesEntry
              link="games/1"
              title="Deus Ex"
              additionalInfo=", With discount"
              notificationFrequancy="Every day"
            />
          </FavoritesList>
          <br />
          <FavoritesList
            header="Favorites in Jobs"
          >
            <FavoritesEntry
              link="jobs/2"
              title="Python developer"
              notificationFrequancy="Every day"
            />
            <FavoritesEntry
              link="games/1"
              title="Junior python developer"
              notificationFrequancy="Every day"
            />
          </FavoritesList>
        </div>
      </div>
    </React.Fragment>
  );
}

function FavoritesEntry(props) {
  return (
    <a href={"/favorites/" + props.link}>
      <li className="favorites_list_item">
        <div className="favorites_list_item_title">
          "{props.title}"
          {props.additionalInfo && <span className="favorites_list_item_additional">{props.additionalInfo}</span>}
        </div>
        <div className="favorites_list_item_notifications">
          {props.notificationFrequancy}
        </div>
      </li>
    </a>
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
