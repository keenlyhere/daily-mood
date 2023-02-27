import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./SideBar.css";
import { useEffect } from "react";
import { loadAllUserItems } from "../../store/petBgReducer";
import { useState } from "react";

export default function SideBar({ user }) {
    const dispatch = useDispatch();
    const userItems = useSelector(state => state.items);
    console.log("userItems", userItems);
    const [ isLoaded, setIsLoaded ] = useState(false);

    useEffect(() => {
        dispatch(loadAllUserItems(user.id)).then(() => setIsLoaded(true))
    }, [dispatch]);

    return isLoaded ? (
        <div className="SideBar-container">
            <div className="SideBar-logo-container">
                <h1>Daily Moo'd Logo</h1>
            </div>
            <div className="SideBar-user-container">
                Welcome, {user.firstName}
            </div>
            <div className="SideBar-moolah-container">
                Moolah: {user.moolah}
            </div>
            <div className="SideBar-links-container">
                <ul className="SideBar-links">
                    <li className="SideBar-link">
                        <NavLink to="/daily">
                            Daily
                        </NavLink>
                    </li>
                    <li className="SideBar-link">
                        <NavLink to="/tasks">
                            Tasks
                        </NavLink>
                    </li>
                    <li className="SideBar-link">
                        Logout
                    </li>
                </ul>
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
                <p>{userItems.activePet.name}</p>
                <p>HP: {userItems.activePet.health}/100</p>
                <p>Friendliness: {userItems.activePet.friendliness}/100</p>
            </div>
        </div>
    ) : (
        "Loading..."
    )
}
