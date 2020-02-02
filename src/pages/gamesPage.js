import React, { useState, useEffect } from 'react';
import { API_URL } from './../App';
// Components
import {
  SearchBarGames,
  CheckBoxFilterField,
  NumericFilterField,
  FiltersList
} from './../components/searchBar';
import Pagination from './../components/pagination';

const GAMES_URL = "/games?";

export default function GamesPage(props) {
  let [loading, setLoading] = useState({value: true});
  let [games, setGames] = useState({pagination: {}, results: []});
  let [title, setTitle] = useState({value: ""});
  let [priceMin, setPriceMin] = useState({value: 0.00});
  let [priceMax, setPriceMax] = useState({value: 0.00});
  let [PSPlusPrice, setPSPlusPrice] = useState({value: false});
  let [discountPrice, setDiscountPrice] = useState({value: false});
  let [free, setFree] = useState({value: false});
  let [page, setPage] = useState({value: 1});

  function getQueryString() {
    var params = {};
    if (title.value) {
      params.title = title.value;
    }
    if (priceMin.value > 0.00) {
      params.price_min = priceMin.value;
    }
    if (priceMax.value > 0.00) {
      params.price_max = priceMax.value;
    }
    if (PSPlusPrice.value) {
      params.psplus_price = PSPlusPrice.value;
    }
    if (discountPrice.value) {
      params.init_price = discountPrice.value;
    }
    if (free.value) {
      params.free = free.value;
    }
    if (page.value && page.value !== 1) {
      params.page = page.value;
    }
    var esc = encodeURIComponent;
    return Object.keys(params)
      .map(key => esc(key) + '=' + esc(params[key]))
      .join('&');
  }

  function fetchGames() {
    const URL = API_URL + GAMES_URL + getQueryString();
    window.scrollTo(0, 0);
    setLoading({value: true});
    fetch(URL, { headers: {
      'Content-Type': 'application/json',
    }})
      .then(response => response.json())
      .then(data => {
        setGames(data || {pagination: {}, results: []});
        setLoading({value: false});
      })
  }

  function handleDiffPage(event) {
    setPage({value: event.target.value});
  }

  function handleTitleChange(event) {
    setTitle({value: event.target.value});
  }

  function handlePriceMinChange(event) {
    setPriceMin({value: event.target.value});
  }

  function handlePriceMaxChange(event) {
    setPriceMax({value: event.target.value});
  }

  function handlePSPlusPriceChange(event) {
    setPSPlusPrice({value: !PSPlusPrice.value});
  }

  function handleDiscountPriceChange(event) {
    setDiscountPrice({value: !discountPrice.value});
  }

  function handleFreeChange(event) {
    setFree({value: !free});
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetchGames();
  }

  useEffect(() => {
    fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.value]);

  return (
    <React.Fragment>
      <div className="sidebar">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="search_tab">
            <SearchBarGames
              name="title"
              placeholder="Game title..."
              id="id_title"
              value={title.value}
              onChange={handleTitleChange}
            />
          </div>
          <FiltersTabGames>
            <NumericFilterField
              id="price_min"
              value={priceMin.value}
              onChange={handlePriceMinChange}
              label="From"
              step={100.00}
            />
            <NumericFilterField
              id="price_max"
              value={priceMax.value}
              onChange={handlePriceMaxChange}
              label="To"
              step={100.00}
            />
            <CheckBoxFilterField
              id="psplus_price"
              checked={PSPlusPrice.value}
              onChange={handlePSPlusPriceChange}
              label="PS Plus offer"
            />
            <CheckBoxFilterField
              id="discount_price"
              checked={discountPrice.value}
              onChange={handleDiscountPriceChange}
              label="With discount"
            />
            <CheckBoxFilterField
              id="free"
              checked={free.value}
              onChange={handleFreeChange}
              label="FREE"
            />
          </FiltersTabGames>
        </form>
      </div>

      <div className="results_container">
        {loading.value ? (
          <div className="lds-dual-ring"></div>
        ) : (
          ""
        )}
        {games.results.length > 0 ? (
          <ul className={loading.value ? (
              "results_list_games loading"
          ) : (
              "results_list_games"
          )}>
            {games.results.map(result => <GameCard result={result} key={result.link}/>)}
          </ul>
        ) : (loading.value ? ("") : (<h1 className="no_results">No results :(</h1>))}

        {games.pagination.last_page && games.pagination.last_page !== 1 ? (
          <Pagination
            page={games.pagination.page}
            prevPage={games.pagination.prev_page}
            nextPage={games.pagination.next_page}
            lastPage={games.pagination.last_page}
            onPageChange={handleDiffPage}
          />
        ) : ("")}
      </div>
    </React.Fragment>
  );
}

function GameCard(props) {
  return (
    <li className="list_item_games" key={props.result.link}>
      <a className="list_link_gamebox" href={props.result.link} target="_blank" rel="noopener noreferrer">
        <div className="game_image">
          <img src={props.result.image} alt="No icon :(" width='124px' height='124px' className="list_image" />
        </div>
        <div className="description_container_games">
          <div className="list_header_games">{props.result.title}</div>
          {props.result.initial_price ? (
            <div className="list_price strikethrough">{props.result.initial_price} UAH</div>
          ) : ("")}
          {props.result.price !==0 ? (
            <div className="list_price">{props.result.price} UAH</div>
          ) : ("")}
          {props.result.psplus_price ? (props.result.psplus_price === 0 ? (
            <div className="list_price psplus_price">PS Plus FREE</div>
          ) : (
            <div className="list_price psplus_price">PS Plus {props.result.psplus_price} UAH</div>
          )
          ) : ("")}
        </div>
      </a>
    </li>
  );
}

function FiltersTabGames(props) {
  const filtersHeader = "Prices";

  function toggleFilters(event) {
    const filtersList = document.getElementById('filters_list');
    filtersList.classList.toggle("filters_open");
  }

  return (
    <div className="filters_tab">
      <button
        id="filters_button"
        type="button"
        name="button"
        className="big_button"
        onClick={toggleFilters}
      >Filters</button>
      <FiltersList header={filtersHeader}>
        {props.children}
      </FiltersList>
    </div>
  );
}
