import React, { useEffect, useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "./Navigation.css";

// import logo from "../../assets/dejamoo_logo_full.png";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

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
                            Daily Moo'd
                            {/* <img src={logo} className="Navigation-logo" alt="Deja-Moo logo" /> */}
                        </div>
                    </NavLink>
                </li>

                { sessionUser ? (
                    <div className="Navigation-list-right">
                        <li className="profile-dropdown-links">
                            <span className="Navigation-user">Hey {sessionUser.firstName}</span>
                        </li>
                        <li className="profile-dropdown-links">
                            <button onClick={() => history.push("/daily")} className="profile-dropdown-logout">Daily</button>
                        </li>
                        <li className="profile-dropdown-links">
                            <button onClick={() => history.push("/tasks")} className="profile-dropdown-logout">Tasks</button>
                        </li>
                        <li className="profile-dropdown-links">
                            <button onClick={logout} className="profile-dropdown-logout">Log Out</button>
                        </li>
                    </div>
                ) : (
                    <div className="Navigation-list-right">
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
