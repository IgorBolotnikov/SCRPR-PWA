import React, {
  useState,
  useEffect,
  createRef,
  useCallback,
} from 'react';

import { apiUrl, favoritesUrl, gamesUrl } from 'src/constants';
import {
  SearchBarGames,
  CheckBoxFilterField,
  NumericFilterField,
  FiltersList,
} from 'src/components/searchBar';
import Pagination from 'src/components/pagination';
import { Page } from 'src/pages/types';
import useUserStore from 'src/userStore';

type Game = {
  title: string;
  link: string;
  image: string;
  initial_price: number;
  price: number;
  psplus_price: number;
}

type GamesResponse = {
  results: Game[];
  pagination: Page;
}

export default function GamesPage(): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<GamesResponse>(
    { pagination: { page: 1, last_page: 1 }, results: [] },
  );
  const [title, setTitle] = useState('');
  const [priceMin, setPriceMin] = useState(0.00);
  const [priceMax, setPriceMax] = useState(0.00);
  const [PSPlusPrice, setPSPlusPrice] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(false);
  const [free, setFree] = useState(false);
  const [page, setPage] = useState(1);
  const user = useUserStore();

  const showPagination = games.pagination.last_page && games.pagination.last_page !== 1;

  const getQueryString = useCallback((): string => {
    const params: Record<string, string | number | boolean> = {};
    if (title) {
      params.title = title;
    }
    if (priceMin > 0.00) {
      params.price_min = priceMin;
    }
    if (priceMax > 0.00) {
      params.price_max = priceMax;
    }
    if (PSPlusPrice) {
      params.psplus_price = PSPlusPrice;
    }
    if (discountPrice) {
      params.initial_price = discountPrice;
    }
    if (free) {
      params.free = free;
    }
    if (page && page !== 1) {
      params.page = page;
    }
    const esc = encodeURIComponent;
    return Object.keys(params)
      .map((key) => `${esc(key)}=${esc(params[key])}`)
      .join('&');
  }, [PSPlusPrice, discountPrice, free, page, priceMax, priceMin, title]);

  const fetchGames = useCallback((): void => {
    const url = apiUrl + gamesUrl + getQueryString();
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGames(data || { pagination: {}, results: [] });
        setLoading(false);
      });
  }, [getQueryString]);

  function handleDiffPage(newPage: number): void {
    setPage(newPage);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setTitle(event.target.value);
  }

  function handlePriceMinChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const price = Number(event.target.value);
    if (price < 0) {
      setPriceMin(0);
    } else {
      setPriceMin(price);
    }
  }

  function handlePriceMaxChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const price = Number(event.target.value);
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    fetchGames();
  }

  function handleSaveToFavorites(
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ): void {
    event.preventDefault();
    fetch(`${apiUrl + favoritesUrl}/games/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        title,
        price_min: priceMin,
        price_max: priceMax,
        psplus_price: PSPlusPrice,
        initial_price: discountPrice,
        free,
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

  useEffect(() => {
    fetchGames();
  }, [page, fetchGames]);

  return (
    <>
      <div className="sidebar">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="search_tab">
            <SearchBarGames
              name="title"
              placeholder="Game title..."
              id="id_title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <FiltersTabGames>
            <NumericFilterField
              id="price_min"
              value={priceMin}
              onChange={handlePriceMinChange}
              label="From"
              step={100.00}
            />
            <NumericFilterField
              id="price_max"
              value={priceMax}
              onChange={handlePriceMaxChange}
              label="To"
              step={100.00}
            />
            <CheckBoxFilterField
              id="psplus_price"
              checked={PSPlusPrice}
              onChange={handlePSPlusPriceChange}
              label="PS Plus offer"
            />
            <CheckBoxFilterField
              id="discount_price"
              checked={discountPrice}
              onChange={handleDiscountPriceChange}
              label="With discount"
            />
            <CheckBoxFilterField
              id="free"
              checked={free}
              onChange={handleFreeChange}
              label="FREE"
            />
          </FiltersTabGames>
        </form>
        {user.isAuthenticated && (
          <div className="add_to_favorites_container">
            <input
              type="submit"
              onClick={handleSaveToFavorites}
              className="big_button save_to_favorites_button"
              value="Save to Favorites"
            />
          </div>
        )}
      </div>

      <div className="results_container">
        {loading && <div className="lds-dual-ring" />}
        <GameCardList results={games.results} loading={loading} />
        {showPagination && (
          <Pagination
            page={games.pagination.page}
            prevPage={games.pagination.prev_page}
            nextPage={games.pagination.next_page}
            lastPage={games.pagination.last_page}
            onPageChange={handleDiffPage}
          />
        )}
      </div>
    </>
  );
}

interface GameCardListProps {
  results: Game[];
  loading: boolean;
}

function GameCardList({ results, loading }: GameCardListProps): React.ReactElement {
  return loading ? (
    <ul className="results_list_games loading" />
  ) : (
    <ul className="results_list_games">
      {results.length > 0 ? (
        <h1 className="no_results">No results :(</h1>
      ) : (
        results.map((result) => <GameCard result={result} key={result.link} />)
      )}
    </ul>
  );
}

interface GameCardProps {
  result: Game;
}

function GameCard({
  result,
}: GameCardProps): React.ReactElement {
  return (
    <li className="list_item_games" key={result.link}>
      <a
        className="list_link_gamebox"
        href={result.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="game_image">
          <img
            src={result.image}
            alt="No icon :("
            width="124px"
            height="124px"
            className="list_image"
          />
        </div>
        <div className="description_container_games">
          <div className="list_header_games">{result.title}</div>
          {result.initial_price !== null && (
            <div className="list_price strikethrough">
              {result.initial_price}
              {' '}
              UAH
            </div>
          )}
          {result.price !== 0 && (
            <div className="list_price">
              {result.price}
              {' '}
              UAH
            </div>
          )}
          {result.psplus_price !== null && (result.psplus_price === 0 ? (
            <div className="list_price psplus_price">PS Plus FREE</div>
          ) : (
            <div className="list_price psplus_price">
              PS Plus
              {result.psplus_price}
              {' '}
              UAH
            </div>
          ))}
        </div>
      </a>
    </li>
  );
}

interface FiltersTabGamesProps {
  children: React.ReactNode;
}

function FiltersTabGames({ children }: FiltersTabGamesProps): React.ReactElement {
  const listRef = createRef<HTMLDivElement>();
  const filtersHeader = 'Prices';

  function toggleFilters(): void {
    if (listRef.current) {
      listRef.current.classList.toggle('filters_open');
    }
  }

  return (
    <div className="filters_tab">
      <button
        id="filters_button"
        type="button"
        name="button"
        className="big_button"
        onClick={toggleFilters}
      >
        Filters
      </button>
      <FiltersList
        ref={listRef}
        header={filtersHeader}
      >
        {children}
      </FiltersList>
    </div>
  );
}
