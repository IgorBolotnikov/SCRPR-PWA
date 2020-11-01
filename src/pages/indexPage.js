import React from 'react';
import { Link } from 'react-router-dom';
import GamesImage from 'src/Img/Icons/games.png';
import JobsImage from 'src/Img/Icons/jobs.png';
import FreelanceImage from 'src/Img/Icons/freelance.png';

export default function IndexPage(props) {
  return (
    <React.Fragment>
      <div className="main_page_first_section wide_section">
        <h1 className="greeting_first">Search in one place</h1>
        <h1 className="greeting_second red">Get results from many</h1>
      </div>
      <div className="main_page_second_section wide_section">
        <h1 className="features_header">Automatic web scraping from different websites</h1>
        <div className="features_container">
          <ul className="features_list">
            <li className="features_item">
              <figure className="figure_one">
                <img src={GamesImage} height="100px" width="100px" alt="Games" />
                <figcaption><Link className="first_item" to="/games">PS4 game prices</Link></figcaption>
              </figure>
              <ul className="websites_list">
                <li className="websites_list_item">store.playstation.com</li>
              </ul>
            </li>
            <li className="features_item"><figure className="figure_two">
              <img src={JobsImage} height="100px" width="100px" alt="Jobs" />
              <figcaption><Link className="second_item" to="/jobs">Job offers</Link></figcaption>
            </figure>
              <ul className="websites_list">
                <li className="websites_list_item">www.hh.ua</li>
                <li className="websites_list_item">www.work.ua</li>
                <li className="websites_list_item">www.rabota.ua</li>
                <li className="websites_list_item">www.jobs.ua</li>
                <li className="websites_list_item">ua.jooble.org</li>
                <li className="websites_list_item">www.trud.ua</li>
                <li className="websites_list_item">www.jobis.com.ua</li>
                <li className="websites_list_item">www.novarobota.ua</li>
              </ul>
            </li>
            <li className="features_item"><figure className="figure_three">
              <img src={FreelanceImage} height="100px" width="100px" alt="Freelance" />
              <figcaption><Link className="third_item" to="/">Freelance job offers</Link></figcaption></figure>
              <ul className="websites_list">
                <li className="websites_list_item">- IN PROGRESS -</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="main_page_third_section wide_section">
        <p className="paragraph">Whenever you search something, you can save your search parameters.</p>
        <p className="paragraph">Whatever you save, you can set automatic notifications.</p>
        <ol className="to_do_list">
          <li className="to_do_list_item">Go to the search page and start searching :)</li>
          <li className="to_do_list_item">Save search parameters to Favorites</li>
          <li className="to_do_list_item">Manage your Favorites form My Account page</li>
          <li className="to_do_list_item">Setup notifications for each query</li>
        </ol>
      </div>
      <div className="main_page_forth_section wide_section">
        <h1 className="big_text">You don't need to search for the same stuff every time</h1>
        <h1 className="big_text"><em className="emphasized">Automate it</em> and get notified whenever something new comes up</h1>
      </div>
    </React.Fragment>
  );
}
