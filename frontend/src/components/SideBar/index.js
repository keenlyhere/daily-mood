import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./SideBar.css";
import { useEffect, useState } from "react";
import { loadAllUserItems } from "../../store/petBgReducer";
import * as sessionActions from "../../store/session";

import logo from "../../assets/dailymoodlogo.png";

export default function SideBar({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const userItems = useSelector(state => state.items);
    // console.log("userItems", userItems);
    const [ isLoaded, setIsLoaded ] = useState(false);

    useEffect(() => {
        dispatch(loadAllUserItems(user.id)).then(() => setIsLoaded(true))
    }, [dispatch]);

    const logout = (e) => {
        e.preventDefault();

        dispatch(sessionActions.logout());
        history.push("/");
    }

    // const healthBarWidth = {
    //     width: `${userItems.activePet.health}%`
    // }

    const healthBarWidth = () => {
        let backgroundColor;

        if (userItems.activePet.health > 80) {
            backgroundColor = "#5AA13E";
        } else if (userItems.activePet.health > 60) {
            backgroundColor = "#FDFD96";
        } else if (userItems.activePet.health > 35) {
            backgroundColor = "#F9AD8E";
        } else {
            backgroundColor = "#FF7276";
        }

        return {
            "width": `${userItems.activePet.health}%`,
            "backgroundColor": backgroundColor
        };
    }

    const friendlinessBarWidth = () => {
        let backgroundColor;

        if (userItems.activePet.friendliness > 80) {
            backgroundColor = "#5AA13E";
        } else if (userItems.activePet.friendliness > 60) {
            backgroundColor = "#FDFD96";
        } else if (userItems.activePet.friendliness > 35) {
            backgroundColor = "#F9AD8E";
        } else {
            backgroundColor = "#FF7276";
        }

        return {
            "width": `${userItems.activePet.friendliness}%`,
            "backgroundColor": backgroundColor
        };
    }

    return isLoaded ? (
        <div className="SideBar-container">
            <div className="SideBar-logo-container">
                <NavLink exact to="/" className="Navigation-links">
                    <div className="Navigation-logo-container">
                        <img src={logo} className="Navigation-logo" alt="Daily Moo'd logo" />
                    </div>
                </NavLink>
            </div>
            <div className="SideBar-logout-container">
                <button
                    className="SideBar-logout clickable"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
            <div className="SideBar-user-container">
                <p className="SideBar-username">
                    Welcome, {user.firstName}
                </p>
                <p className="SideBar-moolah">
                    Moolah: <span className="SideBar-moolah-value">{user.moolah}</span>
                </p>
            </div>

            <div className="SideBar-pet-container">
                <div className="SideBar-pet-image-container">
                    <img
                        src={userItems.activeBg.bgImageUrl}
                        className="SideBar-pet-background"
                        alt="Pet background image"
                    />
                    <img
                        src={userItems.activePet.petImageUrl}
                        className="SideBar-pet"
                        alt="Pet image"
                    />
                </div>
                <div className="SideBar-pet-stats-container">
                    <p className="SideBar-pet-stats-name">
                        {userItems.activePet.name}
                    </p>
                    <div className="SideBar-pet-stats-hp">
                        <p className="SideBar-pet-stats-hp-header">
                            HP:
                        </p>
                        <div className="SideBar-pet-stats-hp-bar-container">
                            <div className="SideBar-pet-stats-hp-bar-filled" style={healthBarWidth()}>

                            </div>
                            <span className="SideBar-pet-stats-hp-text">
                                {userItems.activePet.health}/100
                            </span>
                        </div>
                    </div>
                    <div className="SideBar-pet-stats-hp">
                        <p className="SideBar-pet-stats-hp-header">
                            Friendliness:
                        </p>
                        <div className="SideBar-pet-stats-hp-bar-container">
                            <div className="SideBar-pet-stats-hp-bar-filled" style={friendlinessBarWidth()}>

                            </div>
                            <span className="SideBar-pet-stats-hp-text">
                                {userItems.activePet.friendliness}/100
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="SideBar-links-container">
                <NavLink
                    to="/daily"
                    className="SideBar-link"
                >
                    Daily
                </NavLink>
                <NavLink
                    to="/tasks"
                    className="SideBar-link"
                >
                    Tasks
                </NavLink>
                <NavLink
                    to="/monthly"
                    className="SideBar-link"
                >
                    Monthly
                </NavLink>
                <NavLink
                    to="/store"
                    className="SideBar-link"
                >
                    Store
                </NavLink>
                <NavLink
                    to="/cowlection"
                    className="SideBar-link"
                >
                    Cowlection
                </NavLink>

            </div>

        </div>
    ) : (
        <div className="SideBar-container">
            We're milking the servers for all they're worth to load your mood.
            {/* <div className="SideBar-logo-container skeleton skeleton-logo"></div>
            <div className="SideBar-logout-container skeleton skeleton-button"></div>
            <div className="SideBar-user-container skeleton">
                <div className="SideBar-username skeleton skeleton-text"></div>
                <div className="SideBar-moolah skeleton skeleton-text"></div>
            </div>
            <div className="SideBar-pet-container skeleton">
                <div className="SideBar-pet-image-container skeleton skeleton-pet"></div>
                <div className="SideBar-moolah skeleton skeleton-text"></div>
                <div className="SideBar-moolah skeleton skeleton-text"></div>
            </div>
            <div className="SideBar-links skeleton">
                <div className="SideBar-link skeleton skeleton-link"></div>
                <div className="SideBar-link skeleton skeleton-link"></div>
                <div className="SideBar-link skeleton skeleton-link"></div>
                <div className="SideBar-link skeleton skeleton-link"></div>
                <div className="SideBar-link skeleton skeleton-link"></div>
            </div> */}
        </div>
    )
}
