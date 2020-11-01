import React, { useState, useEffect } from 'react';

import Pagination from 'src/components/pagination';
import {
  CheckBoxFilterField, FiltersList,
  NumericFilterField,
  SearchBarJobs,
} from 'src/components/searchBar';
import {
  apiUrl, cities, favoritesUrl, jobsUrl,
} from 'src/constants';
import useUserStore from 'src/userStore';


type Job = {
  source: string;
  salary_min: number;
  salary_max: number;
  with_salary: boolean;
  currency: string;
  link: string;
  title: string;
  location: string;
  employer?: string;
  body: string;
}

type Page = {
  page: number;
  prev_page?: number;
  next_page?: number;
  last_page: number;
}

type JobsResponse = {
  results: Job[];
  pagination: Page;
}

export default function JobsPage() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<JobsResponse>({ pagination: { page: 1, last_page: 1 }, results: [] });
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [salaryMin, setSalaryMin] = useState(0.00);
  const [salaryMax, setSalaryMax] = useState(0.00);
  const [withSalary, setWithSalary] = useState(false);
  const [page, setPage] = useState(1);
  const user = useUserStore();

  function getQueryString() {
    const params: Record<string, string | number | boolean> = {};
    if (title) {
      params.title = title;
    }
    if (city) {
      params.location = city;
    }
    if (salaryMin > 0.00) {
      params.salary_min = salaryMin;
    }
    if (salaryMax > 0.00) {
      params.salary_max = salaryMax;
    }
    if (withSalary) {
      params.with_salary = withSalary;
    }
    if (page && page !== 1) {
      params.page = page;
    }
    const esc = encodeURIComponent;
    return Object.keys(params)
      .map((key) => `${esc(key)}=${esc(params[key])}`)
      .join('&');
  }

  function fetchJobs() {
    const URL = apiUrl + jobsUrl + getQueryString();
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(URL, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setJobs(data || { pagination: {}, results: [] });
        setLoading(false);
      });
  }

  function handleDiffPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setPage(Number(event.currentTarget.value));
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleCityChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setCity(event.target.value);
  }

  function handleSalaryMinChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    if (value < 0) {
      setSalaryMin(0);
    } else {
      setSalaryMin(value);
    }
  }

  function handleSalaryMaxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    if (value < 0) {
      setSalaryMax(0);
    } else {
      setSalaryMax(value);
    }
  }

  function handleWithSalaryChange() {
    setWithSalary((prev) => !prev);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    fetchJobs();
  }

  function handleSaveToFavorites(event: React.MouseEvent) {
    event.preventDefault();
    fetch(`${apiUrl + favoritesUrl}/jobs/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        title,
        location: city,
        salary_min: salaryMin,
        salary_max: salaryMax,
        with_salary: withSalary,
      }),
    })
      .then((response) => response.json().then((data) => ({
        status: response.status,
        data,
      })))
      .catch((error) => {
        throw new Error(`Error: ${error}`);
      });
  }

  useEffect(() => {
    fetchJobs();
  }, [page]);

  return (
    <>
      <div className="sidebar">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="search_tab">
            <SearchBarJobs
              name="title"
              placeholder="Job title..."
              id="id_title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <FiltersTabJobs
            currentCity={city}
            onCityChange={handleCityChange}
          >
            <NumericFilterField
              id="salary_min"
              value={salaryMin}
              onChange={handleSalaryMinChange}
              label="From"
              step={100.00}
            />
            <NumericFilterField
              id="salary_max"
              value={salaryMax}
              onChange={handleSalaryMaxChange}
              label="To"
              step={100.00}
            />
            <CheckBoxFilterField
              id="with_salary"
              checked={withSalary}
              onChange={handleWithSalaryChange}
              label="Only with salary"
            />
          </FiltersTabJobs>
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
        <JobCardList results={jobs.results} loading={loading} />
        {
          jobs.pagination.last_page && jobs.pagination.last_page !== 1 && (
            <Pagination
              page={jobs.pagination.page}
              prevPage={jobs.pagination.prev_page}
              nextPage={jobs.pagination.next_page}
              lastPage={jobs.pagination.last_page}
              onPageChange={handleDiffPage}
            />
          )
        }
      </div>
    </>
  );
}

interface JobCardListProps {
  results: Job[];
  loading: boolean;
}

function JobCardList({ results, loading }: JobCardListProps) {
  return loading ? (
    <ul className="window results_list_jobs loading" />
  ) : (
    <ul className="window results_list_jobs">
      {results.length === 0 ? (
        <h1 className="no_results">No results :(</h1>
      ) : (
        results.map((result) => <JobCard result={result} key={result.link} />)
      )}
    </ul>
  );
}

interface JobCardProps {
  result: Job;
}

function JobCard({ result }: JobCardProps) {
  let salaryLine = '';
  if (result.salary_max) {
    salaryLine = `${result.salary_max} ${result.currency}`;
  }
  if (result.salary_min) {
    salaryLine = `${result.salary_min} – ${salaryLine}`;
  }

  return (
    <li className="list_item">
      <div>
        <a
          className="list_link"
          href={result.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          From
          {result.source}
        </a>
      </div>
      <div className="list_item_header">
        <div className="header_container">
          <a
            className="list_link list_header"
            href={result.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {result.title}
          </a>
        </div>
        <span className="list_salary">{salaryLine}</span>
      </div>
      <div className="list_location_employer">
        <span className="list_location">{result.location}</span>
        {result.employer
        && <span className="list_employer">{` | ${result.employer}`}</span>}
      </div>
      <div className="list_body">
        <p dangerouslySetInnerHTML={{ __html: result.body }} />
      </div>
    </li>
  );
}

interface FiltersTabJobsProps {
  currentCity: string;
  children: React.ReactNode;

  onCityChange(event: React.ChangeEvent<HTMLSelectElement>): void;
}

function FiltersTabJobs({ currentCity, children, onCityChange }: FiltersTabJobsProps) {
  const filtersHeader = 'Salary';

  function toggleFilters() {
    const filtersList = document.getElementById('filters_list');
    if (filtersList) {
      filtersList.classList.toggle('filters_open');
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
      <select
        name="city"
        className="field city_filter city_separate"
        id="id_city"
        value={currentCity}
        onChange={onCityChange}
      >
        {cities.map((city) => (
          <option value={city.value} key={city.value}>{city.text}</option>
        ))}
      </select>
      <FiltersList header={filtersHeader}>
        {children}
      </FiltersList>
    </div>
  );
}
