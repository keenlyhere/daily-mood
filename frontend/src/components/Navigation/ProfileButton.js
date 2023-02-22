import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux"
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import Profile from "../Profile";
import SignupFormModal from "../SignupFormModal";
import CreateSpotForm from "../Spots/CreateSpot";

export default function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ showMenu, setShowMenu ] = useState(false);
    const ulRef = useRef();

    // console.log("ProfileButton - user:", user);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu])

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();

        dispatch(sessionActions.logout());
        history.push("/");
        closeMenu();
    }

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div className="ProfileButton-dropdown-container">
            <button onClick={openMenu} className="ProfileButton-icons">
                <i className="fa-sharp fa-solid fa-bars hamburger"></i>
                { user ? (
                    <img src={user.profileImageUrl} className="ProfileButton-dropdown-profile-pic" />
                ) :
                    <i className="fa-solid fa-circle-user user"></i>
                }
            </button>
            <ul className={ulClassName} ref={ulRef}>
                { user ? (
                    <div>
                        {/* <li className="profile-dropdown-links">{user.username}</li> */}
                        <li className="profile-dropdown-links">
                            <NavLink
                                exact to={`/user/${user.id}`}
                                className="profile-dropdown-user-profile"
                            >
                                {user.firstName} {user.lastName}
                            </NavLink>
                        </li>
                        <li className="profile-dropdown-links">
                            <NavLink
                                exact to="/my-spots"
                                className="profile-dropdown-my-spots"
                            >
                                Manage Your Spots
                            </NavLink>
                        </li>
                        <li className="profile-dropdown-links">
                            <NavLink
                                exact to="/my-trips"
                                className="profile-dropdown-my-spots"
                            >
                                My Trips
                            </NavLink>
                        </li>
                        {/* <li className="profile-dropdown-links">{user.email}</li> */}
                        <li className="profile-dropdown-links">
                            <button onClick={logout} className="profile-dropdown-logout">Log Out</button>
                        </li>
                        <div className="profile-dropdown-divide"></div>
                        <li className="profile-dropdown-links">
                            <OpenModalButton
                                buttonText="Deja-Moo your home"
                                onButtonClick={closeMenu}
                                modalComponent={<CreateSpotForm />}
                            />
                        </li>
                    </div>
                ) : (
                    <div>
                        <li className="profile-dropdown-links">
                            <OpenModalButton
                                buttonText="Log In"
                                onButtonClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </li>
                        <li className="profile-dropdown-links">
                            <OpenModalButton
                                buttonText="Sign Up"
                                onButtonClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </li>
                    </div>
                )}

                {/* <li className="profile-dropdown-links">{user.username}</li>
                <li className="profile-dropdown-links">{user.firstName} {user.lastName}</li>
                <li className="profile-dropdown-links">{user.email}</li>
                <li className="profile-dropdown-links">
                    <button onClick={logout} className="profile-dropdown-logout">Log Out</button>
                </li> */}
            </ul>
        </div>
    )
}
