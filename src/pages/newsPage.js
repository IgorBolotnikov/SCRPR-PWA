import React, { useState, useEffect } from 'react';
import { API_URL } from './../App';

const NEWS_URL = '/news';

export default function NewsPage(props) {
  let [news, setNews] = useState({posts: []});

  // useEffect(() => {
  //   fetch(API_URL + NEWS_URL)
  //     .then(response => response.json())
  //     .then(data => setNews(data));
  // }, [])

  useEffect(() => {
    setNews({posts: [
      {
        id: 2,
        datetimePosted: "2020.01.02",
        title: "Hello Again!",
        body: "Let's try to <em>emphasize</em> the text!"
      },
      {
        id: 1,
        datetimePosted: "2020.01.01",
        title: "Hello, World!",
        body: "This is a medssage body with <b>BOLD</b> text."
      },
    ]})
  }, [])

  return (
    <ul className="news_list">
      {news.posts.map(post => {
        return (
          <li key={post.id} className="window">
            <p className="posted_datetime">Posted on {post.datetimePosted}</p>
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
