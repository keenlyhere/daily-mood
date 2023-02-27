import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
// import "./SignupForm.css";
import "./SignupForm2.css";

export default function SignupFormModal2() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [ email, setEmail ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ birthday, setBirthday ] = useState(new Date());
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ displayPic, setDisplayPic ] = useState(null);
    const [ imageUrl, setImageUrl] = useState(null);
    const [ errors, setErrors ] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            // console.log("displayPicUrl", displayPic)
            return dispatch(sessionActions.signup({ email, firstName, lastName, password, birthday, displayPic }))
                // .then(console.log("req went through"))
                .then(closeModal)
                .catch(async (res) => {
                    // console.log("hit error")
                    const data = await res.json();
                    // console.log("data, errors:", data, data.errors)
                    if (data && data.errors) setErrors(data.errors);
                });
        }
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDisplayPic(file);
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    }

    return (
        <div className="SignUpForm-container">
            <div className="SignUpForm-top">
                <button
                    className="SignUpForm-close"
                    onClick={closeModal}
                >
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="SignUpForm-create">Sign up</h2>
            </div>
            <h1 className="SignUpForm-title">Welcome to Daily Moo'd</h1>
            <div className="SignUpForm-errors-container">
                <ul className="SignUpForm-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            </div>
            <form
                onSubmit={handleSubmit}
                className="SignUpForm-form"
            >
                <div className="SignUpForm-group-profile-pic">
                    <img
                        src={ imageUrl ? imageUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                        alt="default-profile-image"
                        className="SignUpForm-default-profile-image"
                    />
                    <label htmlFor="profile-pic-upload" className="SignUpForm-profile-pic-upload clickable">
                        Add a photo of yourself!
                    </label>
                    <input id="profile-pic-upload" type="file" onChange={updateFile} />
                </div>
            <div className="SignUpForm-main-container">
                <div className="SignUpForm-group-top email">
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="email">
                        Email
                    </label>
                </div>
                <div className="SignUpForm-group-middle firstName">
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <label htmlFor="firstName">
                        First Name
                    </label>
                </div>
                <div className="SignUpForm-group-middle lastName">
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <label htmlFor="lastName">
                        Last Name
                    </label>
                </div>
                <div className="SignUpForm-group-middle">
                    <div className="birthday">
                        <input
                            id="birthday"
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                        <label htmlFor="birthday">
                            Birthday
                        </label>
                    </div>
                </div>
                <div className="SignUpForm-group-middle password">
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="password">
                        Password
                    </label>
                </div>
                <div className="SignUpForm-group-bottom confirmPassword">
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                </div>
            </div>
            <div className="SignUpForm-button-container">
                <button
                    type="submit"
                    className="SignUpForm-submit"
                >Sign Up</button>
            </div>
            </form>
        </div>
    );
};
