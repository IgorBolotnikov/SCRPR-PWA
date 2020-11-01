import React from 'react';

interface SearchBarJobsProps {
  id: string;
  name: string;
  placeholder?: string;
  value?: string;

  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export function SearchBarJobs({
  id,
  name,
  placeholder,
  value,
  onChange,
}: SearchBarJobsProps) {
  return (
    <div className="search_tab">
      <input
        type="text"
        name={name}
        className="field search_field_jobs"
        placeholder={placeholder}
        maxLength={100}
        id={id}
        value={value}
        onChange={onChange}
      />
      <input type="submit" className="search_button" value="" />
    </div>
  );
}

interface SearchBarGamesProps {
  id: string;
  name: string;
  placeholder?: string;
  value?: string;

  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export function SearchBarGames({
  id,
  name,
  placeholder,
  value,
  onChange,
}: SearchBarGamesProps) {
  return (
    <div className="search_tab">
      <input
        type="text"
        name={name}
        className="field search_field_games"
        placeholder={placeholder}
        maxLength={100}
        id={id}
        value={value}
        onChange={onChange}
      />
      <input type="submit" className="search_button" value="" />
    </div>
  );
}

interface CheckBoxFilterFieldProps {
  id: string;
  label: string,
  checked: boolean,

  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export function CheckBoxFilterField({
  id,
  label,
  checked,
  onChange,
}: CheckBoxFilterFieldProps) {
  return (
    <div className="filter_field">
      <input
        type="checkbox"
        className="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label
        className="checkbox_label"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}

interface NumericFilterFieldProps {
  id: string,
  value?: number,
  label: string,
  step: number,

  onChange(event: React.ChangeEvent<HTMLInputElement>): void,
}

export function NumericFilterField({
  id,
  value,
  step,
  label,
  onChange,
}: NumericFilterFieldProps) {
  return (
    <div className="filter_field">
      <label
        className="numeric_filter_label"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type="number"
        className="field numeric_filter"
        step={step}
        id={id}
        value={value || ''}
        onChange={onChange}
      />
    </div>
  );
}

interface FiltersListProps {
  header: string,
  children: React.ReactNode;
}

export function FiltersList({ header, children }: FiltersListProps) {
  return (
    <div id="filters_list" className="filters_list window">
      <h2 className="filter_header">{header}</h2>
      {children}
    </div>
  );
}
