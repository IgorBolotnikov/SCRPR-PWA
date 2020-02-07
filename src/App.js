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
import GamesPage from './pages/gamesPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import ResetRequest from './pages/passwordReset/resetRequest';
import ResetPassword from './pages/passwordReset/resetPassword';
import FavoritesPage from './pages/favoritesPage';
import EditAccountPage from './pages/editAccountPage';

import NoMatchesPage from './pages/noMatchesPage';
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
            <GamesPage />
          </Route>
          <Route path="/freelance">
            <IndexPage />
          </Route>
          <Route path="/auth/login">
            <LoginPage />
          </Route>
          <Route path="/auth/register">
            <RegisterPage />
          </Route>
          <Route path="/auth/reset-password" exact>
            <ResetRequest />
          </Route>
          <Route path="/auth/reset-password/:uidb64/:token">
            <ResetPassword />
          </Route>
          <Route path="/auth/edit-account">
            <EditAccountPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/rate">
            <RatePage />
          </Route>
          <Route path="/favorites">
            <FavoritesPage />
          </Route>
          <Route path="*">
            <NoMatchesPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
