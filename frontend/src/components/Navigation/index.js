import React, { useEffect, useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "./Navigation.css";

import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import logo from "../../assets/dailymoodlogo.png";

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const [ showMenu, setShowMenu ] = useState(false);
    const ulRef = useRef();
    const dispatch = useDispatch();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

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

    // const handleClick = () => {
    //     dispatch(actionDeleteSearch());
    // }

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();

        dispatch(sessionActions.logout());
        history.push("/");
        closeMenu();
    }

    return (
        <nav className="Navigation-container">
            <ul className="Navigation-list">
                <li>
                    <NavLink exact to="/" className="Navigation-links"
                        // onClick={() => handleClick()}
                    >
                        <div className="Navigation-logo-container">
                            <img src={logo} className="Navigation-logo" alt="Daily Moo'd logo" />
                        </div>
                    </NavLink>
                </li>

                { sessionUser ? (
                    <div className="Navigation-list-right">
                        <li className="profile-dropdown-links">
                            <span className="Navigation-user">Hey {sessionUser.firstName}</span>
                        </li>
                        <li className="profile-dropdown-links">
                            <button onClick={() => history.push("/daily")} className="SignUp">Daily</button>
                        </li>
                        <li className="profile-dropdown-links">
                            <button onClick={logout} className="LogIn">Log Out</button>
                        </li>
                    </div>
                ) : (
                    <div className="Navigation-list-right">
                        <li className="profile-dropdown-links">
                            <OpenModalButton
                                buttonText="Log In"
                                onButtonClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                                buttonClass="LogIn"
                            />
                        </li>
                        <li className="profile-dropdown-links">
                            <OpenModalButton
                                buttonText="Sign Up"
                                onButtonClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                                buttonClass="SignUp"
                            />
                        </li>
                    </div>
                )}

                {/* <div className="Navigation-list-right">
                    { sessionUser &&
                        <li className="Navigation-list-modal">
                            <OpenModalButton
                                buttonText="Deja-Moo your home"
                                onButtonClick={closeMenu}
                                modalComponent={<CreateSpotForm />}
                            />
                        </li>
                    }
                    { isLoaded && (
                        <li>
                            <ProfileButton user={sessionUser} />
                        </li>
                    ) }
                </div> */}
            </ul>
        </nav>
    )
}
