import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoginFormModal from "./components/LoginFormModal";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SignupFormModal from "./components/SignupFormModal";
import Daily from "./components/DayEntries";
import UserTasks from "./components/UserTasks";
import SpecificDayTasks from "./components/UserTasks/SpecificDayTasks";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return null;
  // console.log("THEME FROM APP.JS --------->", user);

  if (isLoaded) {
    // console.log("USER THEME ---------->", user.theme);
    let theme = "dark";
    // if (user) theme = user.theme

    return (
      <div className="App-container">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <h1>Splash page goes here!</h1>
            <h2>Goals for Thursday</h2>
            <ol>
              <li>Fixed first feature CRUD - accidentally worked on wrong file and changed variable names T_T</li>
              <li>Connect UserTasks to frontend + styling</li>
              <li>Start routes for Pets redemption</li>
              <li>Connect Pets to frontend + styling</li>
            </ol>
            <h2>Goals for Friday (tentative)</h2>
            <ol>
              <li>Finish routes for Pets redemption</li>
              <li>Connect Pets to frontEnd + styling</li>
              <li>Start routes for Background redemption</li>
              <li>Connect Background to frontend + styling</li>
            </ol>
            <h2>Goals for Saturday (tentative)</h2>
            <ol>
              <li>Finish routes for Background redemption</li>
              <li>Connect Background to frontend + styling</li>
              <li>Style nav bar ---- profile dropdown button instead of logout button when user logged in?</li>
              <li>Design splash page</li>
            </ol>
            <h2>Completed on Wednesday</h2>
            <ol>
              <li>Finished routes for DayEntries</li>
              <li>Connect DayEntries to frontend</li>
              <li>Finished routes for UserTasks (GET x2, POST, PUT, DELETE)</li>
            </ol>
          </Route>
          <Route exact path="/login">
            <LoginFormModal />
          </Route>
          <Route exact path="/register">
            <SignupFormModal />
          </Route>
          <ProtectedRoute path="/daily" exact={true}>
            <Daily />
          </ProtectedRoute>
          <ProtectedRoute path="/tasks/future" exact={true}>
            <h1>You cannot record the future.</h1>
          </ProtectedRoute>
          <ProtectedRoute path="/tasks/:date" exact={true}>
            <SpecificDayTasks />
          </ProtectedRoute>
          <ProtectedRoute path="/tasks" exact={true}>
            <UserTasks />
          </ProtectedRoute>
          <ProtectedRoute path="/monthly" exact={true}>
            <div className="MainPage-container" id={theme}>
              Monthly stuff here
            </div>
          </ProtectedRoute>
          <Route>
            404: page not found
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
