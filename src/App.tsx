import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import PrivateRoute from 'src/privateRoute';
import IndexPage from 'src/pages/indexPage';
import NewsPage from 'src/pages/newsPage';
import AboutPage from 'src/pages/aboutPage';
import RatePage from 'src/pages/ratePage';
import JobsPage from 'src/pages/jobsPage';
import GamesPage from 'src/pages/gamesPage';
import LoginPage from 'src/pages/loginPage';
import RegisterPage from 'src/pages/registerPage';
import ResetRequest from 'src/pages/passwordReset/resetRequest';
import ResetPassword from 'src/pages/passwordReset/resetPassword';
import FavoritesPage from 'src/pages/favoritesPage';
import EditAccountPage from 'src/pages/editAccountPage';
import ChangePasswordPage from 'src/pages/changePasswordPage';
import DeleteAccountPage from 'src/pages/deleteAccountPage';
import FavoritesGamesEditPage from 'src/pages/favoritesGamesEditPage';
import FavoritesJobsEditPage from 'src/pages/favoritesJobsEditPage';
import NoMatchesPage from 'src/pages/noMatchesPage';
import Navbar from 'src/components/navbar';
import Footer from 'src/components/footer';
import { refreshToken } from 'src/shared/state/user/user.data-service';
import { jwtRefreshTime } from 'src/constants';
import { resetUser } from 'src/shared/state/user/user.service';
import { UserContext, UserContextProvider } from 'src/userStore';

function App(): React.ReactNode {
  const user = useContext(UserContext);
  const scheduledCallback = useRef<NodeJS.Timeout>() as MutableRefObject<NodeJS.Timeout>;
  console.log(user);

  useEffect(() => {
    refreshToken();
    scheduledCallback.current = setInterval(refreshToken, jwtRefreshTime);
    return (): void => clearInterval(scheduledCallback.current);
  }, []);

  return (
    <Router>
      <UserContextProvider value={user}>
        <Navbar>
          <li><Link className="navbutton" to="/news">News</Link></li>
          <li><Link className="navbutton first_item" to="/games">Games</Link></li>
          <li><Link className="navbutton second_item" to="/jobs">Jobs</Link></li>
          <li><Link className="navbutton third_item" to="/freelance">Freelance</Link></li>
          {user.isAuthenticated ? (
            <>
              <li><Link className="navbutton" to="/favorites">My Account</Link></li>
              <li>
                <Link className="navbutton" to="/" onClick={resetUser}>Log Out</Link>
              </li>
            </>
          ) : (
            <>
              <li><Link className="navbutton" to="/auth/login">Log In</Link></li>
              <li><Link className="navbutton" to="/auth/register">Register</Link></li>
            </>
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
      </UserContextProvider>
    </Router>
  );
}

export default App;
