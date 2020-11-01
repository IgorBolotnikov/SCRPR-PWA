import React from 'react';

interface AuthFieldProps {
  type: string;
  errors: string[];
  placeholder?: string;
  value: string | number;

  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export function AuthField({
  value,
  type,
  errors,
  placeholder,
  onChange,
}: AuthFieldProps) {
  const classes = errors.length ? 'auth_field field input_error' : 'auth_field field';
  return (
    <>
      <input
        type={type}
        className={classes}
        placeholder={placeholder || ''}
        onChange={onChange}
        value={value}
      />
      {errors && <FieldErrors errors={errors} />}
    </>
  );
}

interface AuthButtonProps {
  value: number | string;
}

export function AuthButton({ value }: AuthButtonProps) {
  return (
    <input
      className="auth_button big_button"
      type="submit"
      value={value}
    />
  );
}

interface AuthWindowProps {
  header: string;
  note?: string;
  warning?: string;
  children: React.ReactNode;
}

export function AuthWindow({
  header,
  note,
  warning,
  children,
}: AuthWindowProps) {
  return (
    <div className="auth_container window">
      <h1 className="auth_header">{header}</h1>
      {note && (
        <p
          className="auth_note"
          dangerouslySetInnerHTML={{ __html: note }}
        />
      )}
      {warning && (
        <p
          className="warning_message"
          dangerouslySetInnerHTML={{ __html: warning }}
        />
      )}
      {children}
    </div>
  );
}

interface FieldErrorsProps {
  errors: string[];
}

function FieldErrors({ errors }: FieldErrorsProps) {
  return (
    <>
      {errors.map((error) => (
        <div key={error} className="error_message_container">
          <span className="error_message">{error}</span>
        </div>
      ))}
    </>
  );
}
