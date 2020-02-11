import React, { useState } from 'react';
import { API_URL, RATE_URL } from './../constants';

export default function RatePage(props) {
  const [name, setName] = useState({value: ""});
  const [comment, setComment] = useState({value: ""});
  const [formErrors, setFormErrors] = useState({ name: [], comment: [] });

  function handleNameChange(event) {
    setName({value: event.target.value});
  }

  function handleCommentChange(event) {
    setComment({value: event.target.value});
    console.log(comment.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(API_URL + RATE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        comment:comment.value
      })
    })
      .then(response => alert("Your comment was sent, thank you!"))
  }

  return (
    <div className="window rate_container">
      <h1 className="rate_header">I appreciate that, really.</h1>
      <p className="rate_description">Please rate the app and feel free to leave your opinion. Any remarks and suggestions are very welcome.</p>
      <form className="review" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="rate_field field"
          maxLength="100"
          placeholder="Name..."
          value={name.value}
          onChange={handleNameChange}
        />
        <textarea
          name="comment"
          rows="10"
          cols="40"
          className="rate_field field"
          placeholder="Comment..."
          value={comment.value}
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
