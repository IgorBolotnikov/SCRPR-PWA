import React, { useEffect, useRef } from 'react';
// Routing
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './privateRoute';
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
import ChangePasswordPage from './pages/changePasswordPage';
import DeleteAccountPage from './pages/deleteAccountPage';
import FavoritesGamesEditPage from './pages/favoritesGamesEditPage';
import FavoritesJobsEditPage from './pages/favoritesJobsEditPage';

import NoMatchesPage from './pages/noMatchesPage';
// Components
import Navbar from './components/navbar';
import Footer from './components/footer';
// Context
import useUserStore from './userStore';

import { API_URL, REFRESH_TOKEN_URL, JWT_REFRESH_TIME } from './constants';

function App() {
  const user = useUserStore();
  let scheduledCallback = useRef();

  // Callback for scheduled JWT refreshment
  // When JWT expires or is not valid => reset all user data to blank values
  // If JWT is successfully refreshed => update user data with
  // received payload and update JWT
  function refreshToken() {
    fetch(API_URL + REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: localStorage.getItem("token")})
    })
      .then(response => response.json().then(data => ({status: response.status, data: data})))
      .then(object => {
        if (object.status === 200) {
          console.log('Response OK');
          localStorage.setItem('token', object.data.token);
          user.update(object.data.user);
        } else if (object.status === 400) {
          localStorage.removeItem('token');
          user.reset();
        }
      })
      .catch(error => console.error('Error:', error));
  }

  useEffect(() => {
    refreshToken();
    console.log("Running useEffect!");
    scheduledCallback.current = setInterval(refreshToken, JWT_REFRESH_TIME);
    return () => {
      console.log("Cleaning useEffect!");
      clearInterval(scheduledCallback);
    }
  }, []);

  return (
    <Router>
      <Navbar>
        <li><Link className="navbutton" to="/news">News</Link></li>
        <li><Link className="navbutton first_item" to="/games">Games</Link></li>
        <li><Link className="navbutton second_item" to="/jobs">Jobs</Link></li>
        <li><Link className="navbutton third_item" to="/freelance">Freelance</Link></li>
        { user.isAuthenticated ? (
          <React.Fragment>
            <li><Link className="navbutton" to="/favorites">My Account</Link></li>
            <li><Link className="navbutton" to="/" onClick={user.reset}>Log Out</Link></li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li><Link className="navbutton" to="/auth/login">Log In</Link></li>
            <li><Link className="navbutton" to="/auth/register">Register</Link></li>
          </React.Fragment>
        )}
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
          <Route path="/auth/reset-password/:token">
            <ResetPassword />
          </Route>
          <PrivateRoute path="/auth/edit-account">
            <EditAccountPage />
          </PrivateRoute>
          <PrivateRoute path="/auth/change-password">
            <ChangePasswordPage />
          </PrivateRoute>
          <PrivateRoute path="/auth/delete-account">
            <DeleteAccountPage />
          </PrivateRoute>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/rate">
            <RatePage />
          </Route>
          <PrivateRoute path="/favorites" exact>
            <FavoritesPage />
          </PrivateRoute>
          <PrivateRoute path="/favorites/games/:id">
            <FavoritesGamesEditPage />
          </PrivateRoute>
          <PrivateRoute path="/favorites/jobs/:id">
            <FavoritesJobsEditPage />
          </PrivateRoute>
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
