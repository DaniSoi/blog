import "./style/style.css";
import { Router, Route, Switch } from 'react-router-dom';
import React from "react";
import PostsPage from "./Components/Feed/PostsPage";
import Feed from "./Components/Feed/Feed";
import { NotFound404 } from "./Components/NotFound404/NotFound404";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./redux/selectors";
import { PrivateRoute } from "./Components/Common/PrivateRoute";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { GuestsRoute } from "./Components/Common/GuestsRoute";
import { history } from "./history";
import Confirm from "./Components/Confirm/Confirm";
import ScrollToTop from "./Components/Common/ScrollToTop";
import AboutMePage from "./Components/Feed/AboutMePage/AboutMePage";
import SinglePostPage from "./Components/Feed/SinglePostPage";

export default function App () {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Router history={history}>
      <ScrollToTop>
        <Switch>
          <GuestsRoute exact path={[ '/', '/login' ]}
                       component={Login}
                       isAuthenticated={isAuthenticated}
                       fallbackPath="/feed"
          />
          <GuestsRoute path="/register"
                       component={Register}
                       isAuthenticated={isAuthenticated}
                       fallbackPath="/feed"
          />
          <GuestsRoute exact path="/confirm/:token"
                       component={Confirm}
                       isAuthenticated={isAuthenticated}
                       fallbackPath="/"
          />
          <PrivateRoute path="/feed"
                        component={Feed}
                        isAuthenticated={isAuthenticated}
                        fallbackPath="/"
          />
          <PrivateRoute exact path="/posts"
                        component={PostsPage}
                        isAuthenticated={isAuthenticated}
                        fallbackPath="/"
          />
          <PrivateRoute path="/posts/:id"
                        component={SinglePostPage}
                        isAuthenticated={isAuthenticated}
                        fallbackPath="/"
          />
          <PrivateRoute path="/about"
                        component={AboutMePage}
                        isAuthenticated={isAuthenticated}
                        fallbackPath="/"
          />
          <Route component={NotFound404}/>
        </Switch>
      </ScrollToTop>
    </Router>
  );
}
