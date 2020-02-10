import React from 'react';

export function AuthField(props) {
  return (
    <input
      type={props.type}
      className="auth_field field"
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    />
  );
}

export function AuthButton(props) {
  return (
    <input
      className="auth_button big_button"
      type="submit"
      value={props.value}
    />
  );
}

export function AuthWindow(props) {
  return (
    <div className="auth_container window">
      <h1 className="auth_header">{props.header}</h1>
      { props.note && (
        <p className="auth_note"
          dangerouslySetInnerHTML={{__html: props.note}}
        />
      )}
      { props.warning && (
        <p className="warning_message"
          dangerouslySetInnerHTML={{__html: props.warning}}
        />
      )}
      {props.children}
    </div>
  );
}
