import React, { useState, useEffect } from 'react';
import { API_URL } from './../App';
// Components
import {
  SearchBarJobs,
  CheckBoxFilterField,
  NumericFilterField,
  FiltersList
} from './../components/searchBar';

const jobsSample = {
  pagination: {
    page: 1,
    prev_page: null,
    next_page: 2,
    last_page: 2225
  },
  results: [
    {
      title: "Оператор чата",
      body: "Хотите работать в сфере IT, но нет опыта? - Опыт работы не имеет значения, знание английского, и других иностранных языков приветствуется. - \nконсультация пользователей. - ведение деловой переписки. - работа с Work и Exсel.",
      location: "",
      salary_min: null,
      salary_max: 1000,
      currency: "USD",
      employer: "WiFiMap",
      link: "https://hh.ua/vacancy/35612619",
      source: "https://hh.ua"
    },
    {
      title: "Адміністратор інтернет-магазину",
      body: "Грамотність в писемному та усному мовленні українською та/або російською. Бажано досвід управління/керівництва (не принципово). Наявність СМАРТФОНУ та/або...\nОрганізація клієнтської бази і товарообігу в інтернет-магазині. Ведення робочого акаунту в соцмережі. Відповіді на вхідні дзвінки та електронну пошту. ",
      location: "",
      salary_min: 5000,
      salary_max: 10000,
      currency: "UAH",
      employer: "Касиян Р.В.",
      link: "https://hh.ua/vacancy/35244072",
      source: "https://hh.ua"
    },
    {
      title: "Тайный покупатель",
      body: "Наличие звукозаписывающего устройства (телефон или диктофон). Наличие доступа в интернет. Высокий уровень ответственности. Быстрая обучаемость.\nОценка качества обслуживания сотрудников магазинов, ресторанов, кафетериев, супермаркетов, АЗС и др. Заполнение отчетной анкеты в электронном виде (не позднее следующего...",
      location: "",
      salary_min: null,
      salary_max: 9000,
      currency: "UAH",
      employer: "Mystery Fox",
      link: "https://hh.ua/vacancy/35420918",
      source: "https://hh.ua"
    },
    {
      title: "3D-визуализатор",
      body: "Обучаемость. Желание работать и зарабатывать. Владение 3Ds Max или другим пакетом 3D графики. Photoshop. Навыки архитектурного моделирования.\nСоздание 3D моделей архитектурных форм, предметов мебели. Настройка материалов света и камер. Постобработка. Прохождения дополнительного обучения.",
      location: "",
      salary_min: null,
      salary_max: 10000,
      currency: "UAH",
      employer: "ДМ Интериорс",
      link: "https://hh.ua/vacancy/35449044",
      source: "https://hh.ua"
    },
    {
      title: "Территориальный менеджер",
      body: "Опыт работы на аналогичной должности от 2 лет, в сфере (одежда, обувь, электроника, косметика). Образование высшее, предпочтительно менеджмент, экономика, финансы. \nОперационное управление группой магазинов. Обеспечение выполнения плановых показателей. Контроль выполнения стандартов компании. Посещение вверенной территории согласно графику. Подбор и адаптация...",
      location: "",
      salary_min: null,
      salary_max: 100000,
      currency: "RUR",
      employer: "ZENDEN",
      link: "https://hh.ua/vacancy/35610513",
      source: "https://hh.ua"
    }
  ]
}

const citiesOptions = [
  {
    value: "",
    text: "All Ukraine"
  },
  {
    value: "Киев",
    text: "Kyiv"
  },
  {
    value: "Одесса",
    text: "Odesa"
  },
  {
    value: "Днепр",
    text: "Dnipro"
  },
  {
    value: "Харьков",
    text: "Kharkiv"
  },
  {
    value: "Львов",
    text: "Lviv"
  },
]

const JOBS_URL = "/jobs?"

export default function JobsPage(props) {
  let [jobs, setJobs] = useState({paginaiton: {}, results: []});
  let [title, setTitle] = useState({value: ""});
  let [city, setCity] = useState({value: ""});
  let [salaryMin, setSalaryMin] = useState({value: 0.00});
  let [salaryMax, setSalaryMax] = useState({value: 0.00});
  let [withSalary, setWithSalary] = useState({value: false});

  function fetchGames() {
    const URL = API_URL + JOBS_URL + getQueryString();
    fetch(URL, { headers: {
      'Content-Type': 'application/json',
      'Origin': 'API_URL'
    }})
      .then(response => response.json())
      .then(data => {
        setJobs(data || jobsSample);
      })
  }

  function handleTitleChange(event) {
    setTitle({value: event.target.value});
  }

  function handleCityChange(event) {
    setCity({value: event.target.value});
  }

  function handleSalaryMinChange(event) {
    setSalaryMin({value: event.target.value});
  }

  function handleSalaryMaxChange(event) {
    setSalaryMax({value: event.target.value});
  }

  function handleWithSalaryChange(event) {
    setWithSalary({value: !withSalary.value});
  }

  function getQueryString() {
    var params = {};
    if (title.value) {
      params.title = title.value;
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

    var esc = encodeURIComponent;
    return Object.keys(params)
      .map(key => esc(key) + '=' + esc(params[key]))
      .join('&');
  }

  function handleSubmit(event) {
    event.preventDDefault();
    fetchGames();
  }

  useEffect(
    () => {
      fetchGames();
    }, []);

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
            cities={citiesOptions}
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
      </div>

      <div className="results_container">
        {jobs.results.length > 0 ? (
          <ul  className="window results_list_jobs">
            {jobs.results.map(result => <JobCard result={result} key={result.link}/>)}
          </ul>
        ) : (
          <h1 className="no_results">No results :(</h1>
        )}
      </div>
    </React.Fragment>
  );

}

function JobCard(props) {
  let salaryLine = props.result.salary_max + " " + props.result.currency;
  if (props.result.salary_min) {
    salaryLine = props.result.salary_min + " – " + salaryLine;
  }

  return (
    <li className="list_item">
      <div>
        <a className="list_link" href={props.result.source} target="_blank">From {props.result.source}</a>
      </div>
      <div className="list_item_header">
        <div className="header_container">
          <a  className="list_link list_header" href={props.result.link} target="_blank">{props.result.title}</a>
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
  let [opened, setOpened] = useState({value: false});

  function openFilters(event) {
    setOpened({value: !opened});
  }

  return (
    <div className="filters_tab">
      <button
        id="filters_button"
        type="button"
        name="button"
        className="big_button"
        onClick={openFilters}
      >Filters</button>
      <select
        name="city"
        className="field city_filter city_separate"
        id="id_city"
        value={props.cities[0].value}
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
