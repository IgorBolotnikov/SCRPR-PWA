import React, { useState } from 'react';

import { apiUrl, rateUrl } from 'src/constants';

export default function RatePage(): React.ReactElement {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  function handleCommentChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setComment(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    fetch(apiUrl + rateUrl, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name, comment }),
    })
      .then(() => {
        // TODO: Change to modal
        alert('Your comment was sent, thank you!');
      });
  }

  return (
    <div className="window rate_container">
      <h1 className="rate_header">I appreciate that, really.</h1>
      <p className="rate_description">
        Please rate the app and feel free to leave your
        opinion. Any remarks and suggestions are very welcome.
      </p>
      <form className="review" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="rate_field field"
          maxLength={100}
          placeholder="Name..."
          value={name}
          onChange={handleNameChange}
        />
        <textarea
          name="comment"
          rows={10}
          cols={40}
          className="rate_field field"
          placeholder="Comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <input
          className="big_button rate_button"
          type="submit"
          value="SEND"
        />
      </form>
    </div>
  );
}
