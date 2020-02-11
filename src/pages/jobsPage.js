import React, { useState, useEffect } from 'react';
import { API_URL, FAVORITES_URL, JOBS_URL, CITIES } from './../constants';
// Components
import {
  SearchBarJobs,
  CheckBoxFilterField,
  NumericFilterField,
  FiltersList
} from './../components/searchBar';
import Pagination from './../components/pagination';
import useUserStore from './../userStore';

export default function JobsPage(props) {
  const [loading, setLoading] = useState({value: true});
  const [jobs, setJobs] = useState({pagination: {}, results: []});
  const [title, setTitle] = useState({value: ""});
  const [city, setCity] = useState({value: ""});
  const [salaryMin, setSalaryMin] = useState({value: 0.00});
  const [salaryMax, setSalaryMax] = useState({value: 0.00});
  const [withSalary, setWithSalary] = useState({value: false});
  const [page, setPage] = useState({value: 1});
  const user = useUserStore();

  function getQueryString() {
    var params = {};
    if (title.value) {
      params.title = title.value;
    }
    if (city.value) {
      params.location = city.value;
    }
    if (salaryMin.value > 0.00) {
      params.salary_min = salaryMin.value;
    }
    if (salaryMax.value > 0.00) {
      params.salary_max = salaryMax.value;
    }
    if (withSalary.value) {
      params.with_salary = withSalary.value;
    }
    if (page.value && page.value !== 1) {
      params.page = page.value;
    }
    var esc = encodeURIComponent;
    return Object.keys(params)
      .map(key => esc(key) + '=' + esc(params[key]))
      .join('&');
  }

  function fetchJobs() {
    const URL = API_URL + JOBS_URL + getQueryString();
    window.scrollTo(0, 0);
    setLoading({value: true});
    fetch(URL, { headers: {
      'Content-Type': 'application/json',
    }})
      .then(response => response.json())
      .then(data => {
        setJobs(data || {pagination: {}, results: []});
        setLoading({value: false});
      })
  }

  function handleDiffPage(event) {
    setPage({value: event.target.value});
  }

  function handleTitleChange(event) {
    setTitle({value: event.target.value});
  }

  function handleCityChange(event) {
    setCity({value: event.target.value});
  }

  function handleSalaryMinChange(event) {
    if (event.target.value < 0) {
      setSalaryMin({value: 0});
    } else {
      setSalaryMin({value: event.target.value});
    }
  }

  function handleSalaryMaxChange(event) {
    if (event.target.value < 0) {
      setSalaryMax({value: 0});
    } else {
      setSalaryMax({value: event.target.value});
    }
  }

  function handleWithSalaryChange(event) {
    setWithSalary({value: !withSalary.value});
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetchJobs();
  }

  function handleSaveToFavorites(event) {
    event.preventDefault();
    fetch(API_URL + FAVORITES_URL + '/jobs/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        title: title.value,
        location: city.value,
        salary_min: salaryMin.value,
        salary_max: salaryMax.value,
        with_salary: withSalary.value,
      })
    })
    .then(response => response.json().then(data => ({status: response.status, data: data})))
    .then(data => {
      if (data.status === 201) {
      } else {
      }
    })
    .catch(error => console.error('Error:', error));
  }

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.value]);

  return (
    <React.Fragment>
      <div className="sidebar">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="search_tab">
            <SearchBarJobs
              name="title"
              placeholder="Job title..."
              id="id_title"
              value={title.value}
              onChange={handleTitleChange}
            />
          </div>
          <FiltersTabJobs
            cities={CITIES}
            city={city.value}
            onCityChange={handleCityChange}
          >
            <NumericFilterField
              id="salary_min"
              value={salaryMin.value}
              onChange={handleSalaryMinChange}
              label="From"
              step={100.00}
            />
            <NumericFilterField
              id="salary_max"
              value={salaryMax.value}
              onChange={handleSalaryMaxChange}
              label="To"
              step={100.00}
            />
            <CheckBoxFilterField
              id="with_salary"
              checked={withSalary.value}
              onChange={handleWithSalaryChange}
              label="Only with salary"
            />
          </FiltersTabJobs>
        </form>
        { user.isAuthenticated && (
          <div className="add_to_favorites_container">
            <input type="submit" onClick={handleSaveToFavorites} className="big_button save_to_favorites_button" value="Save to Favorites"/>
          </div>
        )}
      </div>

      <div className="results_container">
        {loading.value ? (
          <div className="lds-dual-ring"></div>
        ) : (
          ""
        )}
        {jobs.results.length > 0 ? (
          <ul className={loading.value ? (
              "window results_list_jobs loading"
          ) : (
              "window results_list_jobs"
          )}>
            {jobs.results.map(result => <JobCard result={result} key={result.link}/>)}
          </ul>
        ) : (loading.value ? ("") : (<h1 className="no_results">No results :(</h1>))}
        {jobs.pagination.last_page && jobs.pagination.last_page !== 1 ? (
          <Pagination
            page={jobs.pagination.page}
            prevPage={jobs.pagination.prev_page}
            nextPage={jobs.pagination.next_page}
            lastPage={jobs.pagination.last_page}
            onPageChange={handleDiffPage}
          />
        ) : ("")}
      </div>
    </React.Fragment>
  );

}

function JobCard(props) {
  let salaryLine = "";
  if (props.result.salary_max) {
    salaryLine = props.result.salary_max + " " + props.result.currency;
  }
  if (props.result.salary_min) {
    salaryLine = props.result.salary_min + " – " + salaryLine;
  }

  return (
    <li className="list_item">
      <div>
        <a className="list_link" href={props.result.source} target="_blank" rel="noopener noreferrer">From {props.result.source}</a>
      </div>
      <div className="list_item_header">
        <div className="header_container">
          <a  className="list_link list_header" href={props.result.link} target="_blank" rel="noopener noreferrer">{props.result.title}</a>
        </div>
        <span className="list_salary">{salaryLine}</span>
      </div>
      <div className="list_location_employer">
        <span className="list_location">{props.result.location}</span>
        {props.result.employer && <span className='list_employer'>{" | " + props.result.employer}</span>}
      </div>
      <div className="list_body">
        <p dangerouslySetInnerHTML={{ __html: props.result.body }} />
      </div>
    </li>
  );
}

function FiltersTabJobs(props) {
  const filtersHeader = "Salary";

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
      <select
        name="city"
        className="field city_filter city_separate"
        id="id_city"
        value={props.city}
        onChange={props.onCityChange}
      >
        {props.cities.map(city => (
          <option value={city.value} key={city.value}>{city.text}</option>
        ))}
      </select>
      <FiltersList header={filtersHeader}>
        {props.children}
      </FiltersList>
    </div>
  );
}
