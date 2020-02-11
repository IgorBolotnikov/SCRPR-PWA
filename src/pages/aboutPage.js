import React from 'react';

export default function AboutPage(props) {
  return (
    <div className="window about_container">
      <h1 className="about_header">About</h1>
      <main className="about_body">
        <h2 className="text_header">A little background</h2>
        <p>This project is a part of my Flask self-learning.
          I've started working on it on July 27, 2019 not knowing
          anything about Flask and some distant understanding
        of how web apps work :D</p>
        <p>I was sitting and trying to find a job as a software developer
          and found myself checking through dosens of websites every day.
          Then natural question came up: "Well, if I am applying for
          <em>developer</em> why not use the skills and automate
        the whole thing?"</p>
        <p>This project is still (and indefinitly, I think)
        in the state of constant tweaking and refinement.</p>
        <h2 className="text_header">What is it anyway?</h2>
        <p>This is me being lazy and feeling for all those
        people who can't stand doing repeating shuff. No, seriously.</p>
        <p>This website helps people automate searching and monitoring
        their search results on different topics.</p>
        <p>For example you are looking for, say, jobs. And there is at least
          dosen of these web sites to search through. And you have go to each one
        of them.</p>
        <p><em>"But they have newsletters for subscribed users!"</em></p>
        <p>That's true. And now you have all 10 of them sending
          you emails every day. Many employerstend to post their
          vacancies on several web sites, so you have repeating
        offers each day. </p>
        <p>From multiple sources.</p>
        <p>And you still have to go there and look at the whole list.</p>
        <p>This website does the <em>whole thing</em> for you.
          it looks through all those job-finding websites and then gives you
          results strictly by relevance, treating all offers equal.
          You have two options: either to enter the keywords and check
          the list of results; or create an account (I have no insentive in
          tracking you in any way, except only the session cookies to keep
          you logged in). The second option allows you to set up your preferences
        and set email notifications as soon as something relevant comes up.</p>
        <p><em>"And what's the difference?"</em></p>
        <p>Well, now you have only <em>one</em> website sending you notifications,
          but from <em>all</em> sources. And if you follow the link, it goes
        directly to the website which is hosting this job offer.</p>
        <p></p>
      </main>
    </div>
  );
}
