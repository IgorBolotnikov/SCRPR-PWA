import React from 'react';

export function AuthField(props) {
  return (
    <React.Fragment>
      <input
        type={props.type}
        className={props.errors.length !== 0 ? "auth_field field input_error" : "auth_field field"}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
      { props.errors && <FieldErrors errors={props.errors} /> }
    </React.Fragment>
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

function FieldErrors(props) {
  return (
    <React.Fragment>
      {props.errors.map((error, index) => {
        return (
          <div key={index} className="error_message_container">
            <span className="error_message">{error}</span>
          </div>
        );
      })}
    </React.Fragment>
  );
}
