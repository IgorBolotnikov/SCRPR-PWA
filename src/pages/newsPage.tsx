import React, { useState, useEffect } from 'react';

import { apiUrl, newsUrl } from 'src/constants';
import { toLocalDate, toLocalTime } from 'src/helpers';

type Post = {
  id: number;
  datetime_posted: string;
  title: string;
  body: string;
}

type News = {
  pagination: {},
  results: Post[],
}

export default function NewsPage() {
  const [news, setNews] = useState<News>({ pagination: {}, results: [] });

  useEffect(() => {
    fetch(
      apiUrl + newsUrl,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((data) => setNews(data));
  }, []);

  return (
    <ul className="news_list">
      {news.results && news.results.map((post) => (
        <li key={post.id} className="window">
          <p className="posted_datetime">
            Posted on
            {toLocalDate(post.datetime_posted)}
            {' '}
            at
            {toLocalTime(post.datetime_posted)}
          </p>
          <p className="post_title">{post.title}</p>
          <div
            className="post_body"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </li>
      ))}
    </ul>
  );
}
