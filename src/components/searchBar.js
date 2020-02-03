import React from 'react';
import PropTypes from 'prop-types';

export function SearchBarJobs(props) {
  return (
    <div className="search_tab">
      <input
        type="text"
        name={props.name}
        className="field search_field_jobs"
        placeholder={props.placeholder}
        maxLength="100"
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
      <input type="submit" className="search_button" value="" />
    </div>
  );
}

SearchBarJobs.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export function SearchBarGames(props) {
  return (
    <div className="search_tab">
      <input
        type="text"
        name={props.name}
        className="field search_field_games"
        placeholder={props.placeholder}
        maxLength="100"
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
      <input type="submit" className="search_button" value="" />
    </div>
  );
}

SearchBarGames.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export function CheckBoxFilterField(props) {
  return (
    <div className="filter_field">
      <input
        type="checkbox"
        className="checkbox"
        id={props.id}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label
        className="checkbox_label"
        htmlFor={props.id}
      >{props.label}</label>
    </div>
  );
}

CheckBoxFilterField.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export function NumericFilterField(props) {
  return (
    <div className="filter_field">
      <label
        className="numeric_filter_label"
        htmlFor={props.id}
      >{props.label}</label>
      <input
        type="number"
        className="field numeric_filter"
        step={props.step}
        id={props.id}
        value={props.value || ""}
        onChange={props.onChange}
      />
    </div>
  );
}

NumericFilterField.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number,
  label: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export function FiltersList(props) {
  return (
    <div id="filters_list" className="filters_list window">
      <h2 className="filter_header">{props.header}</h2>
      {props.children}
    </div>
  );
}

FiltersList.propTypes = {
  header: PropTypes.string.isRequired
}
