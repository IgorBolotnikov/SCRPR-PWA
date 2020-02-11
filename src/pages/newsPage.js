import React, { useState, useEffect } from 'react';

import { API_URL, NEWS_URL } from './../constants';
import { toLocalDate, toLocalTime } from './../helpers';

export default function NewsPage(props) {
  let [news, setNews] = useState({pagination: {}, results: []});

  useEffect(() => {
    fetch(
      API_URL + NEWS_URL,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => setNews(data));
  }, [])

  return (
    <ul className="news_list">
      {news.results && news.results.map(post => {
        return (
          <li key={post.id} className="window">
            <p className="posted_datetime">Posted on {toLocalDate(post.datetime_posted)} at {toLocalTime(post.datetime_posted)}</p>
            <p className="post_title">{post.title}</p>
            <div
              className="post_body"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </li>
        );
      })}
    </ul>
  );
}
