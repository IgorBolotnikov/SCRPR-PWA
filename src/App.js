import React from 'react';
// Routing
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// Pages
import IndexPage from './pages/indexPage';
import NewsPage from './pages/newsPage';
import AboutPage from './pages/aboutPage';
import RatePage from './pages/ratePage';
import JobsPage from './pages/jobsPage';
// Components
import Navbar from './components/navbar';
import Footer from './components/footer';

// Change this URL if API is relocated
export const API_URL = 'https://scrpr-develop.herokuapp.com/api/v1';

function App() {
  return (
    <Router>
      <Navbar>
        <li><Link className="navbutton" to="/news">News</Link></li>
        <li><Link className="navbutton first_item" to="/games">Games</Link></li>
        <li><Link className="navbutton second_item" to="/jobs">Jobs</Link></li>
        <li><Link className="navbutton third_item" to="/freelance">Freelance</Link></li>
        {/* <li><a className="navbutton" href="#">My Account</a></li>
        <li><a className="navbutton" href="#">Log Out</a></li> */}
        <li><Link className="navbutton" to="/auth/login">Log In</Link></li>
        <li><Link className="navbutton" to="/auth/register">Register</Link></li>
      </Navbar>
      <div className="content_container">
        <Switch>
          <Route path="/" exact>
            <IndexPage />
          </Route>
          <Route path="/news">
            <NewsPage />
          </Route>
          <Route path="/jobs">
            <JobsPage />
          </Route>
          <Route path="/games">
            <IndexPage />
          </Route>
          <Route path="/freelance">
            <IndexPage />
          </Route>
          <Route path="/auth/login">
            <IndexPage />
          </Route>
          <Route path="/auth/register">
            <IndexPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/rate">
            <RatePage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
