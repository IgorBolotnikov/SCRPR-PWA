import React, { useState } from 'react';

export default function RatePage(props) {
  let [name, setName] = useState({value: ""})
  let [comment, setComment] = useState({value: ""})

  function handleNameChange(event) {
    setName({value: event.target.value})
  }

  function handleCommentChange(event) {
    setComment({value: event.target.value})
  }

  function handleSubmit(event) {
    // TODO: Send comment to API
    event.preventDefault();
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
