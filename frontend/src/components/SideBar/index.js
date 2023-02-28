import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./SideBar.css";
import { useEffect, useState } from "react";
import { loadAllUserItems } from "../../store/petBgReducer";
import * as sessionActions from "../../store/session";

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

    const healthBarWidth = {
        width: `${userItems.activePet.health}%`
    }

    return isLoaded ? (
        <div className="SideBar-container">
            <div className="SideBar-logo-container">
                <h1>Daily Moo'd Logo</h1>
            </div>
            <div className="SideBar-user-container">
                <p className="SideBar-username">
                    Welcome, {user.firstName}
                </p>
                <p className="SideBar-moolah">
                    Moolah: {user.moolah}
                </p>
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
                <div
                    className="SideBar-link clickable"
                    onClick={logout}
                >
                    Logout
                </div>
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
                    <p className="SideBar-pet-stats-name">{userItems.activePet.name}</p>
                    <div className="SideBar-pet-stats-hp">
                        <p className="SideBar-pet-stats-hp-header">
                            HP:
                        </p>
                        <div className="SideBar-pet-stats-hp-bar-container">
                            <div className="SideBar-pet-stats-hp-bar-filled" style={healthBarWidth}>

                            </div>
                            <span className="SideBar-pet-stats-hp-text">
                                {userItems.activePet.health}/100
                            </span>
                        </div>
                    </div>
                    <div className="SideBar-pet-stats-friendliness">
                        Friendliness: {userItems.activePet.friendliness}/100
                    </div>
                </div>
            </div>
        </div>
    ) : (
        "Loading..."
    )
}
