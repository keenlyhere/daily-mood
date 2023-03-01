import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
// import "./SignupForm.css";
import "./SignUpForm2.css";

export default function SignupFormModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [ email, setEmail ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ birthday, setBirthday ] = useState(new Date());
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ displayPic, setDisplayPic ] = useState(null);
    const [ imageUrl, setImageUrl] = useState(null);
    const [ errors, setErrors ] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            // console.log("displayPicUrl", displayPic)
            return dispatch(sessionActions.signup({ email, firstName, lastName, password, birthday, displayPic }))
                // .then(console.log("req went through"))
                .then(() => history.push("/daily"))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    // console.log("data, errors:", data, data.errors)
                    const signUpErrors = {};
                    if (data && data.errors) {
                        for (let i = 0; i < data.errors.length; i++) {
                            const currError = data.errors[i];
                            // console.log("currError", currError)

                            switch (currError) {
                                case "User with that email already exists":
                                    signUpErrors.emailExists = "User with that email already exists.";
                                    break;
                                case "Email is required.":
                                    signUpErrors.emailRequired = "Email is required.";
                                    break;
                                case "Please provide a valid email.":
                                    signUpErrors.validEmail = "Please provide a valid email.";
                                    break;
                                case "Password is required.":
                                    signUpErrors.passwordRequired = "Password is required.";
                                    break;
                                case "Password must be 6 characters or more.":
                                    signUpErrors.passwordLength = "Password must be 6 characters or more.";
                                    break;
                                case "First Name is required":
                                    signUpErrors.firstName = "First name is required.";
                                    break;
                                case "Last Name is required":
                                    signUpErrors.lastName = "Last name is required.";
                                    break;
                                case "Please enter your birthday":
                                    signUpErrors.birthday = "Birthday is required.";
                                    break;
                                default:
                                    break;
                            }
                        }

                        // console.log(signUpErrors);
                        setErrors(signUpErrors);
                    };
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
                <div className="SignUpForm-group email">
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
                    <div className="Form-error-container">
                        {errors && errors.emailExists && <p className="Form-error">{errors.emailExists}</p>}
                        {errors && errors.emailRequired && <p className="Form-error">{errors.emailRequired}</p>}
                        {errors && errors.validEmail && <p className="Form-error">{errors.validEmail}</p>}
                    </div>
                </div>
                <div className="SignUpForm-group-split">
                    <div className="SignUpForm-group-half firstName">
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
                        <div className="Form-error-container">
                            {errors && errors.firstName && <p className="Form-error">{errors.firstName}</p>}
                        </div>
                    </div>
                    <div className="SignUpForm-group-half lastName">
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
                        <div className="Form-error-container">
                            {errors && errors.lastName && <p className="Form-error">{errors.lastName}</p>}
                        </div>
                    </div>
                </div>
                <div className="SignUpForm-group birthday">
                    <input
                        id="birthday"
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                    {/* datetime / local */}
                    <label htmlFor="birthday">
                        Birthday
                    </label>
                    <div className="Form-error-container">
                        {errors && errors.birthday && <p className="Form-error">{errors.birthday}</p>}
                    </div>
                </div>
                <div className="SignUpForm-group-split">
                    <div className="SignUpForm-group-half password">
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
                    <div className="SignUpForm-group-half confirmPassword">
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
                    <div className="Form-error-container">
                        {errors && errors.passwordLength && <p className="Form-error">{errors.passwordLength}</p>}
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
