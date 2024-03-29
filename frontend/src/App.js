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
import Test from "./components/UserTasks/Test";
import SideBar from "./components/SideBar";
import Store from "./components/Store";
import SplashPage from "./components/SplashPage";
import Cowlection from "./components/Cowlection";
import Heart from "./components/HeartBar/Heart";
import PetCare from "./components/Store/PetCare";
import Splash from "./components/SplashPage/Splash";
import Footer from "./components/Footer";
import YearPicker from "./components/SignupFormModal/DatePicker/YearPicker";
import MonthPicker from "./components/SignupFormModal/DatePicker/MonthPicker";
import DayPicker from "./components/SignupFormModal/DatePicker/DayPicker";
import Testing from "./testing";
import Monthly from "./components/Monthly";
import SpecificDayEntries from "./components/DayEntries/SpecificDayEntries";
// import LineChart from "./components/Stats/LineChart";
import TestChart from "./components/Stats/TestChart";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    if (isLoaded) {
        let theme = "cows";

        return (
            <div className="App-container">
                <Switch>
                    <Route exact path="/">
                        <div className="Splash-container">
                            <Navigation />
                            <Splash />
                        </div>
                    </Route>
                    <Route exact path="/testing">
                        <div className="Splash-container">
                            <Testing />
                        </div>
                    </Route>
                    <Route exact path="/petcare">
                        <PetCare />
                    </Route>
                    <ProtectedRoute path="/daily" exact={true}>
                        <div className="Page-container">
                            <SideBar user={user} />
                            <Daily />
                        </div>
                    </ProtectedRoute>
                    <ProtectedRoute path="/day/:year-:month-:date" exact={true}>
                        <div className="Page-container">
                            <SideBar user={user} />
                            <SpecificDayEntries />
                        </div>
                    </ProtectedRoute>
                    <ProtectedRoute path="/stats" exact={true}>
                        <div className="Page-container">
                            <SideBar user={user} />
                            <TestChart />
                        </div>
                        {/* <LineChart /> */}
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
                    <ProtectedRoute path="/monthly" exact={true}>
                        <div className="Page-container">
                            <SideBar user={user} />
                            <Monthly />
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
                            <Store user={user} />
                        </div>
                    </ProtectedRoute>
                    <ProtectedRoute path="/cowlection" exact={true}>
                        <div className="Page-container">
                            <SideBar user={user} />
                            <Cowlection user={user} />
                        </div>
                    </ProtectedRoute>
                    <ProtectedRoute path="/monthly" exact={true}>
                        <div className="MainPage-container" id={theme}>
                            Monthly stuff here
                        </div>
                    </ProtectedRoute>
                    <Route path="/todo">
                        <h1>Splash page goes here!</h1>
                        <h2>Goals for Wednesday</h2>
                        <ol>
                            <li>Add footer</li>
                            <li>Work on readme</li>
                            <li>Finish re-styling</li>
                            <li>Work on monthly view calendar</li>
                            <li>Filter by moods???</li>
                            <li>Display stats for moods and habit completion???</li>
                            <li>After class -- Art for store page (banners for gachapon)</li>
                        </ol>
                        <h2>Completed on Wednesday</h2>
                        <ol>
                            <li>Finished routes for DayEntries</li>
                            <li>Connect DayEntries to frontend</li>
                            <li>Finished routes for UserTasks (GET x2, POST, PUT, DELETE)</li>
                        </ol>
                        <h2>Completed on Thursday</h2>
                        <ol>
                            <li>
                                Fixed first feature CRUD - accidentally worked on wrong file and changed variable names
                                T_T
                            </li>
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
                        <h2>Goals for Monday</h2>
                        <ol>
                            <li>Finish connecting Pets to frontend + styling</li>
                            <li>Fix login modal delay (on localhost)</li>
                            <li>fix journal entries save/edit</li>
                            <li>journal entries text clears properly</li>
                            <li>journal entries now has a max char count</li>
                            <li>can no longer create blank entry in habit block (disabled button)</li>
                            <li>newly created user can create blocks</li>
                        </ol>
                        <h2>Goals for Tuesday</h2>
                        <ol>
                            <li>Connect backgrounds to frontend + styling</li>
                            <li>Allow user to purchase one-time use for pet toys + food</li>
                            <li>Art for gachapon dispenser and animated</li>
                            <li>Create logo, favicon</li>
                            <li>CSS overhaul on splash, sidebar</li>
                        </ol>
                    </Route>
                    <Route>404: page not found</Route>
                </Switch>
            </div>
        );
    } else {
        return (
            <div className="loading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                Moo-ving data into place, please wait...
            </div>
        );
    }
}

export default App;
