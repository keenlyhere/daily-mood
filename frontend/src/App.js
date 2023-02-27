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
import SideBar from "./components/SideBar";
import Store from "./components/Store";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return null;

  if (isLoaded) {
    let theme = "cows";

    return (
      <div className="App-container">
        <Switch>
          <Route exact path="/">
          <Navigation />
            <h1>Splash page goes here!</h1>
            <h2>Goals for Monday</h2>
            <ol>
              <li>Finish connecting Pets + Backgrounds to frontend + styling</li>
              <li>Revamp overall style:</li>
              <li>Change main colors</li>
              <li>Create logo</li>
              <li>Create favicon</li>
            </ol>
            <h2>Completed on Wednesday</h2>
            <ol>
              <li>Finished routes for DayEntries</li>
              <li>Connect DayEntries to frontend</li>
              <li>Finished routes for UserTasks (GET x2, POST, PUT, DELETE)</li>
            </ol>
            <h2>Completed on Thursday</h2>
            <ol>
              <li>Fixed first feature CRUD - accidentally worked on wrong file and changed variable names T_T</li>
              <li>Connected UserTasks GET & DELETE to frontend + styling</li>
            </ol>
            <h2>Completed on Friday</h2>
            <ol>
              <li>Finish connecting UserTasks to frontend + styling (CREATE, EDIT, DELETE)</li>
            </ol>
            <h2>Completed on Saturday</h2>
            <ol>
              <li>Worked on art for pets</li>
            </ol>
            <h2>Completed on Sunday</h2>
            <ol>
              <li>Created CRUD routes for Pets</li>
              <li>Created CRUD routes for Backgrounds</li>
              <li>Connected Pets + Backgrounds to frontend + some styling</li>
              <li>Created action, thunks, and reducers for Pets + Backgrounds</li>
              <li>Created sidebar to house links and pet/bg when user is logged in</li>
            </ol>

          </Route>
          <Route exact path="/login">
            <LoginFormModal />
          </Route>
          <Route exact path="/register">
            <SignupFormModal />
          </Route>
          <ProtectedRoute path="/daily" exact={true}>
            <div className="Page-container">
              <SideBar user={user} />
              <Daily />
            </div>
          </ProtectedRoute>
          <ProtectedRoute path="/tasks/future" exact={true}>
            <h1>You cannot record the future.</h1>
          </ProtectedRoute>
          <ProtectedRoute path="/tasks/:date" exact={true}>
            <div className="Page-container">
              <SideBar user={user} />
              <SpecificDayTasks />
            </div>
          </ProtectedRoute>
          <ProtectedRoute path="/tasks" exact={true}>
            <div className="Page-container">
              <SideBar user={user} />
              <UserTasks />
            </div>
          </ProtectedRoute>
          <ProtectedRoute path="/store" exact={true}>
            <div className="Page-container">
              <SideBar user={user} />
              <Store />
            </div>
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
