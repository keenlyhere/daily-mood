import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import './LoginForm.css';

export default function LoginFormModal({ spotId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [ credential, setCredential ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const { closeModal } = useModal();

    // if (sessionUser) return (
    //     <Redirect to="/" />
    // )

    if (sessionUser) {
        history.push("/daily")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(history.push("/daily"))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                // console.log("data - errors:", data.errors);
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const handleDemo = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential: "demo@user.io", password: "password" }))
            .then(history.push("/daily"))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <div className="LoginFormModal-container">
            <div className="LoginFormModal-top">
                <button
                    className="LoginFormModal-close"
                    onClick={closeModal}
                >
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="LoginFormModal-Login">Log in</h2>
            </div>
            <div className="LoginFormModal-errors-container">
                <ul className="LoginFormModal-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            </div>
            <form
                className="LoginFormModal-form"
                onSubmit={handleSubmit}
            >
                <div className="LoginFormModal-group">
                    <div className="LoginFormModal-group-credential">
                        <input
                            id="credential"
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                        <label htmlFor="credential">Email</label>
                    </div>
                    <div className="LoginFormModal-group-password">
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="Form-error-container">
                        {errors && <p className="Form-error">{errors}</p>}
                    </div>
                </div>
                <div className="LoginFormModal-button-container">
                    <button
                        type="submit"
                        className="LoginFormModal-submit"
                    >
                        Log In
                    </button>
                    <button
                        type="submit"
                        className="LoginFormModal-demo"
                        onClick={handleDemo}
                    >
                        Demo
                    </button>
                </div>
            </form>
        </div>
    );
}
