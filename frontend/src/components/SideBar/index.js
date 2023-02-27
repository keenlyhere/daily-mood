import { NavLink } from "react-router-dom";
import "./SideBar.css";

export default function SideBar({ user }) {
    return (
        <div className="SideBar-container">
            <div className="SideBar-logo-container">
                logo here
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
                <p>pet image here</p>
                <p>pet name here</p>
                <p>pet hp here</p>
                <p>pet friendliness here</p>
            </div>
        </div>
    )
}
